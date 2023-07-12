import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor (private router : Router, private cookieService: CookieService){}

  deconnexion(){
    this.cookieService.delete('token')
    this.cookieService.delete('idUser')
    this.router.navigate(['/login']);
  }

}
