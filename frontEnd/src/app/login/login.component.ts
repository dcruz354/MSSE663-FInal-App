import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;



  constructor(public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
      if(this.authService.isLoggedIn()) {
        this.router.navigate(["/home"]);
      }
     }



  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/home";
  }

  login(loginForm: FormGroup) {
    this.submitted = true;
    if(loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
    .login(loginForm.get("username")?.value, loginForm.get("password")?.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

}
