import { AuthService } from './../_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 
    if (this.authService.isLoggedIn()) {
      window.alert('Already Logged in!');
      this.router.navigate(['/home']);
    }
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get field() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(
      this.field.firstName.value,
      this.field.lastName.value,
      this.field.username.value,
      this.field.password.value
    )
      .pipe(first())
      .subscribe(
        data => {
          window.alert('Successfully registered and logged in');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
