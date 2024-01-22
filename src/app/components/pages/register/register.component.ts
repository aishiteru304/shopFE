import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public iconShowPassword = faEye;
  public iconNotShowPassword = faEyeSlash;
  public iconSpin = faSpinner;
  public isShowPassword = false
  public isShowConfirmPassword = false
  public isLoading = false

  public registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  })

  constructor(private userService: UserService, private toast: NgToastService, private router: Router) { }

  public handleRegister(): void {
    this.isLoading = true
    const fv = this.registerForm.value
    if (fv.confirmPassword === fv.password) {
      const user: IUserRegister = {
        email: fv.email || "",
        password: fv.password || ""
      }
      this.userService.register(user).subscribe(
        () => {
          this.toast.success({ detail: "Register successfully.", summary: 'Please login.', duration: 4000 })
          this.isLoading = false
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000)
        },
        (err) => {
          this.toast.error({ detail: "Register failed.", summary: err.error.message, duration: 4000 })
          this.isLoading = false;
        }
      )
    }
    else {
      this.toast.error({ detail: "Register failed.", summary: 'Password and confirm password not matched.', duration: 4000 })
      this.isLoading = false
    }

  }

  public setIsShowPassword() {
    this.isShowPassword = !this.isShowPassword
  }

  public setIsShowConfirmPassword() {
    this.isShowConfirmPassword = !this.isShowConfirmPassword
  }
}
