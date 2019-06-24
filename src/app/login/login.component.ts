import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: String;
  public password: String;
  constructor(private loginService: LoginService,private router:Router) { }

  ngOnInit() {
    this.getUserDetails();
  }
  getUserDetails() {
    let url = "http://localhost:3000/api/login"
    this.loginService.getUserDetails(url).subscribe(response => {
      console.log(response)
    })
  }
  login() {
    let template = {
      "userName": this.userName,
      "password": this.password
    }
    let url = "http://localhost:3000/api/login/getUser"
    this.loginService.getLoginDetails(url, template).subscribe(response => {
      console.log("Login response:", response)
      if(response[0].isManager){
        this.router.navigate(['inventory','admin'])
      }
    })
  }
}
