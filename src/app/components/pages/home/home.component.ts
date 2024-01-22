import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../../card-product/card-product.component';
import { FormsModule } from '@angular/forms';

import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule, CardProductComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  public user: User = new User()
  public iconKnife = faUtensils
  public categories: any[] = []
  public products: any[] = []
  public newproducts: any[] = []
  public searchString: string = ""

  public activeCategory: string | null = null;

  ngOnInit(): void {
    register()

    this.user = this.userService.getUserFromSessionStorage()

    this.productService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (err) => {
        console.log(err)
      }
    );

    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.newproducts = data.slice(-3)
      },
      (err) => {
        console.log(err)
      }
    );


  }
  constructor(private userService: UserService, private productService: ProductService, private toast: NgToastService) { }

  public setActiveCategory(category: string) {
    this.activeCategory = category;
    this.productService.getProductsByCategory(category).subscribe(
      (data: any) => {
        this.products = data;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  public handleSearch() {
    if (this.searchString) {
      this.productService.getProductsBySearch(this.searchString).subscribe(
        (data: any) => {
          if (data.length > 0)
            this.products = data;
          else this.toast.success({ detail: "Search successfully", summary: "No products.", duration: 4000 })
          this.activeCategory = ""
        },
        (err) => {
          console.log(err)
        }
      );
    }
  }

}
