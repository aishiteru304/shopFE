import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit {
  public invoices: any[] = []

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe(
      (data: any) => {
        this.invoices = data.reverse();
        console.log(this.invoices)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  constructor(private invoiceService: InvoiceService) { }


}
