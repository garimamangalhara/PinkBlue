import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { Http } from '../../../node_modules/@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public show: any = ""
  constructor(private http: Http) { }
  addInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/inventory/createInventory"
    return this.http.post(url, template).map(Response => Response.json())
  }
  getAllInventories(): Observable<any> {
    let url = "http://localhost:3000/api/inventory"
    return this.http.get(url).map(Response => Response.json())
  }
}
