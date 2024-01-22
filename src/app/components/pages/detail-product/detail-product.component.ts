import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { take } from 'rxjs/operators';
import { CardProductComponent } from '../../card-product/card-product.component';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, RouterLink, CardProductComponent],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  public product: any = null
  public user: User = new User()
  public products: any[] = []

  ngOnInit(): void {
    this.user = this.userService.getUserFromSessionStorage()
    const productId: any = this.route.snapshot.paramMap.get('productId');

    this.productService.getProductBySearchId(productId).subscribe(
      (data: any) => {
        this.product = data
      },
      (err) => {
        console.log(err)
      }
    )

    this.productService.getProductsRelated(productId).subscribe(
      (data: any) => {
        this.products = data;
      },
      (err) => {
        console.log(err)
      }
    );

  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private userService: UserService, private cartService: CartService, private toast: NgToastService) { }

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
