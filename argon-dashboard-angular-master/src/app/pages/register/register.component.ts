import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  error = '';
  errorFound = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) { }


  checkPasswordValidity() {
    return (this.f.password.value === this.f.confirmPassword.value) ;
  }

  ngOnInit() {

    this.spinner.hide();

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.spinner.show();
    this.errorFound = false;
    this.submitted = true;

    this.authenticationService.signup(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          this.spinner.hide();
          this.registerForm.reset(this.f.username.value);
          this.error = error;
          this.errorFound = true;
          this.submitted = false;

        }, () => {
          this.router.navigate(['login']);
        });
  }
}
