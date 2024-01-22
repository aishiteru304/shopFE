import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private httpServer: HttpServerService) { }

  public addInvoices(invoiceData: any) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/api/invoices", invoiceData, this.httpServer.httpOptions)
  }

  public getAllInvoices() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/api/invoices", this.httpServer.httpOptions)
  }
}
