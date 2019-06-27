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
  public signUpUserName: String;
  public signUpPassword: String;
  public loginFlag: boolean = true;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let template = {
      "userName": this.userName,
      "password": this.password
    }
    let url = "http://localhost:3000/api/login/getUser"
    this.loginService.getLoginDetails(url, template).subscribe(response => {
      console.log("Login response:", response)
      if (response) {
        if (response[0].isManager) {
          this.router.navigate(['inventory', 'admin'])
        }
        else if (!response[0].isManager) {
          this.router.navigate(['assistantInventory', 'assistant'])
        }
      }
      else {
        window.alert("Wrong Id password")
      }
    })
  }
  signUp() {
    let template = {
      "userName": this.signUpUserName,
      "password": this.signUpPassword
    }
    this.loginService.signUp(template).subscribe(response => {
      console.log("Login response:", response)
    })
  }
}
