import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { IProduct } from '../shared/interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: ''
    })
  };

  constructor(private http: HttpClient, private httpServer: HttpServerService) {
    // Trong constructor, lấy giá trị từ sessionStorage
    const user = sessionStorage.getItem('user');

    // Nếu tồn tại authToken, cập nhật giá trị trong httpOptions
    if (user) {
      const token = JSON.parse(user).token
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  public addProduct(product: any) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/api/products", product, this.httpOptions)
  }

  public getAllProducts() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products", this.httpServer.httpOptions)
  }
  public getNewProducts() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/newproducts", this.httpServer.httpOptions)
  }

  public getAllCategories() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/categories", this.httpServer.httpOptions)
  }

  public getProductsByCategory(category: string) {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/category/" + category, this.httpServer.httpOptions)
  }

  public getProductsBySearch(searchTerm: string) {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/search/" + searchTerm, this.httpServer.httpOptions)
  }

  public getProductBySearchId(productId: string) {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/" + productId, this.httpServer.httpOptions)
  }

  public getProductsRelated(productId: string) {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/products/related/" + productId, this.httpServer.httpOptions)
  }

  public deleteProduct(productId: string) {
    return this.http.delete(this.httpServer.HTPP_SERVER + "/api/products/" + productId, this.httpServer.httpOptions)
  }
}
