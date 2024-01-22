import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public products: any[] = []
  public trashIcon = faTrash
  public isShowModal = false

  public selectedFile: File | undefined = undefined;

  public createForm = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    name: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  })

  constructor(private productService: ProductService, private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files![0];
  }

  public closeModal() {
    this.isShowModal = false
  }

  public openModal() {
    this.isShowModal = true
  }

  public handleCreate() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      formData.append('name', this.createForm.value.name || "")
      formData.append('description', this.createForm.value.description || "")
      formData.append('category', this.createForm.value.category || "")
      formData.append('price', this.createForm.value.price || "")
    }

    this.productService.addProduct(formData).subscribe(
      (data) => {
        console.log(data)
        this.toast.success({ detail: "Product created successfully.", summary: "Created successfully.", duration: 4000 })
        this.products.push(data)
        this.closeModal()
      },
      (err) => {
        console.log(err)
      }
    )
  }


  public handleDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (data: any) => {
        this.toast.success({ detail: "Delete product successfully.", duration: 4000 })
        this.products = data
      },
      (err) => {
        this.toast.error({ detail: "Delete product failed.", summary: err.error.message, duration: 4000 })
        console.log(err)
      }
    )
  }
}
