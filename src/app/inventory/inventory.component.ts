import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  show: any;
  public inventory: any
  public inventoryList: any = []
  public updateInventory: any
  public updateFormFlag: any
  public viewApprovedFlag: boolean = false
  public approveOrRejectList: any = []
  constructor(private service: InventoryService) {
    this.inventory = {
      productId: null,
      productName: null,
      vendor: null,
      mrp: null,
      batchNum: null,
      batchDate: null,
      qty: null,
      status: "Approved"
    }
    this.updateInventory = {
      productId: null,
      productName: null,
      vendor: null,
      mrp: null,
      batchNum: null,
      batchDate: null,
      qty: null,
      status: "Approved"
    }
  }

  ngOnInit() {
  }
  addInventory() {
    this.viewApprovedFlag = false;
    this.service.addInventory(this.inventory).subscribe(response => {
      console.log("Login response:", response)
      this.getAllInventories()
    })
  }
  getAllInventories() {
    this.viewApprovedFlag = false;
    this.updateFormFlag = null;
    this.service.getAllInventories().subscribe(response => {
      this.inventoryList = response;
    })
  }
  openUpdateForm(productId) {
    this.viewApprovedFlag = false;
    this.updateFormFlag = productId;
    let updateInventory = this.inventoryList.filter(ele => ele.productId == productId);
    this.updateInventory = updateInventory[0]
    console.log(this.updateInventory)
  }
  updateInventoryFunction(productId) {
    this.viewApprovedFlag = false;
    this.service.updateInventory(this.updateInventory).subscribe(response => {
      console.log("Update response:", response)
      this.getAllInventories()
    })
  }
  deleteInventoryFunction(id) {
    this.viewApprovedFlag = false;
    let template = {
      "_id": id
    }
    this.service.deleteInventory(template).subscribe(response => {
      console.log("Update response:", response)
      this.getAllInventories()
    })
  }
  viewTobeApprovedList() {
    this.show = null;
    this.viewApprovedFlag = true;
    this.service.getToBeApprovedInventories().subscribe(Response => {
      console.log("To be approved:", Response)
      this.approveOrRejectList = Response
    })
  }
  approve(row) {
    let template = {
      "status": row.status,
      "productId": row.productId,
      "_id": row._id
    }
    this.service.approve(template).subscribe(response => {
      console.log("response of approval or rejection", response)
      this.viewTobeApprovedList()
    })
  }
  reject(row) {
    let template = {
      "status": row.status,
      "productId": row.productId,
      "_id": row._id
    }
    this.service.reject(template).subscribe(response => {
      console.log("response of approval or rejection", response)
      this.viewTobeApprovedList()
    })
  }
}
