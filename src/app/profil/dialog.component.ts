import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl ,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserService } from '../service/user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,ReactiveFormsModule],
})
export class DialogContentComponent {
  nom: string | undefined;
  prenom: string | undefined;
  pseudo: string | undefined;
  updateUserForm!: FormGroup;
  public idUser = this.cookieService.get('idUser');

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>, private userService : UserService, private cookieService: CookieService) {
    this.ngOnInit();
  }

  ngOnInit() {
    this.userService.getUserById(this.idUser).subscribe((data) => {
      this.nom = data.nom;
      this.prenom = data.prenom;
      this.pseudo = data.pseudo;
  
      this.updateUserForm = new FormGroup({
        nom: new FormControl(this.nom),
        prenom: new FormControl(this.prenom),
        pseudo: new FormControl(this.pseudo)
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }


  submitForm(){
    const user : User = {
      nom: this.updateUserForm.value.nom,
      prenom: this.updateUserForm.value.prenom,
      email: undefined,
      pseudo: this.updateUserForm.value.pseudo,
      password: undefined,
      role: undefined
    }

    this.userService.updateUser(this.idUser, user).subscribe(
      (res) => {
        this.dialogRef.close();
      }
    )
  }
}
