import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/user';
import { HttpServerService } from '../../../services/http-server.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public iconShowPassword = faEye;
  public iconNotShowPassword = faEyeSlash;
  public iconSpin = faSpinner;
  public isShowPassword = false
  public isLoading = false

  public loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  constructor(private toast: NgToastService, private userService: UserService, private router: Router, private httpServer: HttpServerService) { }


  public handleLogin(): void {
    this.isLoading = true
    const fv = this.loginForm.value
    const userRegister: IUserRegister = {
      email: fv.email || "",
      password: fv.password || ""
    }
    this.userService.login(userRegister).subscribe(
      (data) => {
        const user: User = {
          id: (data as User)?.id || "",
          email: (data as User)?.email || "",
          token: (data as User)?.token || "",
          isAdmin: (data as User)?.isAdmin || false
        }
        this.userService.setUserToSessionStorage(user)
        this.toast.success({ detail: "Login successfully.", summary: "Login successfully.", duration: 4000 })
        this.isLoading = false

        setTimeout(() => {
          this.router.navigate(['/']).then(() => window.location.reload());
        }, 1000)
      },
      (err) => {
        this.isLoading = false
        this.toast.error({ detail: "Login failed.", summary: err.error.message, duration: 4000 })
      }
    )
  }


  public setIsShowPassword() {
    this.isShowPassword = !this.isShowPassword
  }
}
