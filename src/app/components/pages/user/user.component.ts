import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  public users: any[] = []
  public trashIcon = faTrash
  public isShowModal = false

  public createForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private userService: UserService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (err) => {
        console.log(err)
      }
    );
  }

  public handleDeleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      (data: any) => {
        this.toast.success({ detail: "Delete user successfully.", duration: 4000 })
        this.users = data
      },
      (err) => {
        this.toast.error({ detail: "Delete user failed.", summary: err.error.message, duration: 4000 })
        console.log(err)
      }
    )
  }

  public closeModal() {
    this.isShowModal = false
  }

  public openModal() {
    this.isShowModal = true
  }

  public handleCreate() {
    const fv = this.createForm.value
    const user: IUserRegister = {
      email: fv.email || "",
      password: fv.password || ""
    }
    this.userService.register(user).subscribe(
      () => {
        this.toast.success({ detail: "Create successfully.", summary: 'Please login.', duration: 4000 })
        this.userService.getAllUsers().subscribe(
          (data: any) => {
            this.users = data;
          },
          (err) => {
            console.log(err)
          }
        );
        this.closeModal()
      },
      (err) => {
        this.toast.error({ detail: "Create failed.", summary: err.error.message, duration: 4000 })
      }
    )
  }

}
