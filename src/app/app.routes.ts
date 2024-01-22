import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserComponent } from './components/pages/user/user.component';
import { ProductComponent } from './components/pages/product/product.component';
import { DetailProductComponent } from './components/pages/detail-product/detail-product.component';
import { CartsComponent } from './components/pages/carts/carts.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';

const USER_KEY = 'user'

function isLogin(): boolean {
    const user = sessionStorage.getItem(USER_KEY);
    return user === null;
}

function isAdmin(): boolean {
    const user = sessionStorage.getItem(USER_KEY);
    if (user === null) return false;
    if ((JSON.parse(user) as any)?.isAdmin == true) return true
    else return false
}
export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent, canActivate: [isLogin] },
    { path: "register", component: RegisterComponent, canActivate: [isLogin] },
    { path: "carts", component: CartsComponent },
    { path: "admin/users", component: UserComponent, canActivate: [isAdmin] },
    { path: "admin/products", component: ProductComponent, canActivate: [isAdmin] },
    { path: "admin/invoices", component: InvoiceComponent, canActivate: [isAdmin] },
    { path: "product/:productId", component: DetailProductComponent },
    { path: "**", component: HomeComponent }
];
