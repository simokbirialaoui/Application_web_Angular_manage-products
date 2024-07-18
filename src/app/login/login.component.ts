import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formlogin!:FormGroup;
  errorMessage :undefined;
  constructor(private fb :FormBuilder,
    private router : Router,private authService:AuthService){

  }
  ngOnInit(): void {
      this.formlogin=this.fb.group({
        username:this.fb.control(""),
        password:this.fb.control("")
      })
  }

  handleLogin() {
    let username=this.formlogin.value.username;
    let password=this.formlogin.value.password;
this.authService.login(username,password)
.then(
  resp=>{
    this.router.navigateByUrl("/admin")
  }
)
.catch(error=>{
  this.errorMessage=error;
}
)}

}
