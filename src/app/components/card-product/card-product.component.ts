import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { take } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent implements OnInit {
  @Input() product!: Product;
  public user: User = new User()

  ngOnInit(): void {
    this.user = this.userService.getUserFromSessionStorage()

  }
  constructor(private userService: UserService, private cartService: CartService, private toast: NgToastService) { }

  public handleAddToCart(productId: string) {
    this.cartService.addCart({ productId }).subscribe(
      (data) => {
        this.toast.success({ detail: "Add to cart successfully.", summary: "Add to cart successfully.", duration: 2000 })

        this.cartService.cartLength$
          .pipe(take(1))  // Lấy giá trị hiện tại
          .subscribe(currentLength => {
            const newLength = currentLength + 1;
            this.cartService.updateCartLength(newLength);
          });
      },
      (err) => {
        console.log(err)
        this.toast.error({
          detail: "Add to cart failed.", summary: err.error.message, duration: 2000
        })
      }
    )
  }
}
