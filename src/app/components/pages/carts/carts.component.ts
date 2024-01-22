import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InvoiceService } from '../../../services/invoice.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {
  public user: User = new User()
  public items: any[] = []
  public totalPrice: number = 0
  public trashIcon = faTrash


  public invoiceForm = new FormGroup({
    phone: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    address: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
    this.user = this.userService.getUserFromSessionStorage()

    this.cartService.getAllProductsFromCart().subscribe(
      (data: any) => {
        this.items = data
      },
      (err) => {
        console.log(err)
      }
    )
  }

  constructor(private cartService: CartService, private userService: UserService, private invoiceService: InvoiceService, private toast: NgToastService) { }
  public handleBuyItems() {
    const productsBought = this.items.filter(product => product.amount > 0).map(item => ({ name: item.name, price: item.price, amount: item.amount, image: item.image }));
    if (productsBought.length) {
      this.invoiceService.addInvoices({ products: productsBought, phone: this.invoiceForm.value.phone, address: this.invoiceForm.value.address, userId: this.user.id }).subscribe(
        (data) => {
          console.log(data)
          this.toast.success({ detail: "Payment successfully.", summary: "Payment successfully.", duration: 4000 })
        },
        (err) => {
          console.log(err)
        }
      )
    }
    else
      this.toast.error({ detail: "Payment failed.", summary: "Please select the product", duration: 4000 })
  }

  public handlePlus(idItem: number) {
    this.items[idItem].amount += 1
    this.totalPrice += parseInt(this.items[idItem].price)
  }

  public handleAbstracts(idItem: number) {
    if (this.items[idItem].amount) {
      this.items[idItem].amount -= 1
      this.totalPrice -= parseInt(this.items[idItem].price)
    }
  }
}
