import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { Http } from '../../../node_modules/@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: Http) { }
  addInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/inventory/createInventory"
    return this.http.post(url, template).map(Response => Response.json())
  }
  getAllInventories(): Observable<any> {
    let url = "http://localhost:3000/api/inventory"
    return this.http.get(url).map(Response => Response.json())
  }
  updateInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/inventory/updateInventory"
    return this.http.post(url, template).map(Response => Response.json())
  }
  deleteInventory(template): Observable<any> {
    let url = "http://localhost:3000/api/inventory/deleteInventory"
    return this.http.post(url, template).map(Response => Response.text())
  }
  getToBeApprovedInventories(): Observable<any> {
    let url = "http://localhost:3000/api/approvalInventory"
    return this.http.get(url).map(Response => Response.json())
  }
  approve(template):Observable<any>{
    let url="http://localhost:3000/api/approvalInventory/approve"
    return this.http.post(url, template).map(Response => Response.text())
  }
  reject(template):Observable<any>{
    let url="http://localhost:3000/api/approvalInventory/reject"
    return this.http.post(url, template).map(Response => Response.text())
  }

}
