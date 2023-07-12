import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {

  loginObj: any = {
    email : '',
    password: ''
  }

  constructor(private userService : UserService, private router: Router, private cookieService: CookieService) { }

  onLogin(){
    this.userService.onLogin(this.loginObj).subscribe((res:any)=>{
      this.cookieService.set('token', res.token, 7, '/', '', true);
      this.cookieService.set('idUser', res.user.id, 7, '/', '', true);
      this.router.navigate(['/home']);
    })
  }

}
