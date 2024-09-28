import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }
  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    userName: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('',Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    console.log(this.registerform.value)
    if (this.registerform.valid) {
      this.service.Proceedregister(this.registerform.value).subscribe(result => {
        console.log(this.registerform.value)
        this.toastr.success('Please contact admin for enable access.','Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      console.log(this.registerform.value)
      this.toastr.warning('Please enter valid data.')
    }
  }
}
