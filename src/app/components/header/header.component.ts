import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  public iconCart = faCartShopping
  public user: User = new User()
  lengthCart: number = 0;

  ngOnInit(): void {
    this.user = this.userService.getUserFromSessionStorage()

    if (this.user.email) {
      this.cartService.getAmountProductsFromCart().subscribe(
        (data: any) => {
          this.lengthCart = data.amount
        },
        (err) => {
          console.log(err)
        }
      )

      this.cartService.cartLength$.subscribe((length) => {
        if (length)
          this.lengthCart += 1;
      });
    }



  }

  constructor(private userService: UserService, private toast: NgToastService, private cartService: CartService) { }

  public handleLogout() {
    this.toast.success({ detail: "Logout successfully.", summary: "Logout successfully.", duration: 4000 })
    setTimeout(() => {
      this.userService.logout()
    }, 1000)
  }
}
