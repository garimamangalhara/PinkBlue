import { Injectable } from '@angular/core';
import { HttpModule, Http } from '../../../node_modules/@angular/http';
import { HttpClient } from '../../../node_modules/@types/selenium-webdriver/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }

  getUserDetails(url): Observable<any> {
    return this.http.get(url).map(Response => Response.text())
  }
  getLoginDetails(url, template): Observable<any> {
    return this.http.post(url, template).map(Response => Response.json())
  }
  signUp(template): Observable<any> {
    let url = "http://localhost:3000/api/login/createUser"
    return this.http.post(url, template).map(Response => Response.json())
  }
}
