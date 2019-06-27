import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AssistantInventoryService {

  constructor(private http: Http) { }
  addInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/approvalInventory/createInventory"
    return this.http.post(url, template).map(Response => Response.json())
  }
  getAllInventories(): Observable<any> {
    let url = "http://localhost:3000/api/inventory"
    return this.http.get(url).map(Response => Response.json())
  }
  updateInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/approvalInventory/updateInventory"
    return this.http.post(url, template).map(Response => Response.json())
  }
  deleteInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/approvalInventory/deleteInventory"
    return this.http.post(url, template).map(Response => Response.text())
  }
}
