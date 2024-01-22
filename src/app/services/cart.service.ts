import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartLengthSubject = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLengthSubject.asObservable();

  updateCartLength(length: number) {
    this.cartLengthSubject.next(length);
  }

  constructor(private http: HttpClient, private httpServer: HttpServerService) { }

  public addCart(productId: any) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/api/carts", productId, this.httpServer.httpOptions)
  }

  public getAmountProductsFromCart() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/carts/amount", this.httpServer.httpOptions)
  }

  public getAllProductsFromCart() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/carts", this.httpServer.httpOptions)
  }
}
