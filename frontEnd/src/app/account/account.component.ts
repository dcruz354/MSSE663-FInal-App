import { PasswordValidation } from './../_helpers/validators';
import { AuthService } from './../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  updateUserForm : FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;


  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/account';
  }

  get f() { return this.updateUserForm.controls;}

  udpateUser() {
    this.authService.update(this.f.firstName.value, this.f.lastName.value, this.f.passwor.value)
    .pipe(first())
    .subscribe(
      data => {
        window.alert('Successfully updated user!');
        window.location.reload();
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
