import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontTrelloBis';

  showNavbar: boolean;

  constructor(private router: Router) {
    this.showNavbar = true;

    // Écoute les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Vérifie la route actuelle et masque la navbar si nécessaire
        this.showNavbar = !['/login', '/'].includes(event.url);
      }
    });
  }
}
