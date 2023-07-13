import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogContentComponent } from './dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class ProfilComponent implements OnInit {
  nom: string | undefined;
  prenom: string | undefined;
  email: string | undefined;
  pseudo: string | undefined;
  role: string | undefined;
  public idUser = this.cookieService.get('idUser');

  constructor(private cookieService: CookieService, private userService : UserService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.userService.getUserById(this.idUser).subscribe((data) => {
      this.nom = data.nom;
      this.prenom = data.prenom;
      this.email = data.email;
      this.pseudo = data.pseudo;
      this.role = data.role;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

}