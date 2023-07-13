import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import Validation from '../utils/validation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignupComponent {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder){}

  applyForm: FormGroup = new FormGroup({
    prenom: new FormControl(''),
    nom: new FormControl(''),
    email: new FormControl(''),
    pseudo: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.applyForm = this.formBuilder.group(
      {
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pseudo: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.applyForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.applyForm.invalid) {
      return;
    }

    if (this.applyForm.value.prenom !== '' && this.applyForm.value.nom !== '' && this.applyForm.value.email !== '' && this.applyForm.value.pseudo !== '' && this.applyForm.value.password !== '') {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(this.applyForm.value.password ?? '', salt);
      const user: User = {
        prenom: this.applyForm.value.prenom ?? '',
        nom: this.applyForm.value.nom ?? '',
        email: this.applyForm.value.email ?? '',
        pseudo: this.applyForm.value.pseudo ?? '',
        password: encryptedPassword ?? '',
        role: ''
      };

      this.userService.createUser(user).subscribe(
        (res : any) => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home']);
        },
      );
    }
  }

}
