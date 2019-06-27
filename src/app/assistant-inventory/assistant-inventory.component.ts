import { Component, OnInit } from '@angular/core';
import { AssistantInventoryService } from './assistant-inventory.service';

@Component({
  selector: 'app-assistant-inventory',
  templateUrl: './assistant-inventory.component.html',
  styleUrls: ['./assistant-inventory.component.css']
})
export class AssistantInventoryComponent implements OnInit {
  public inventory: any
  public show:any
  public inventoryList: any = []
  public updateInventory: any
  public updateFormFlag: any
  constructor(private service: AssistantInventoryService) {
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
    this.inventory.status = "add";
    this.service.addInventory(this.inventory).subscribe(response => {
      console.log("Login response:", response)

    })
  }
  getAllInventories() {
    this.service.getAllInventories().subscribe(response => {
      this.inventoryList = response;
    })
  }
  openUpdateForm(productId) {
    this.updateFormFlag = productId;
    let updateInventory = this.inventoryList.filter(ele => ele.productId == productId);
    this.updateInventory = updateInventory[0]
    console.log(this.updateInventory)
  }
  updateInventoryFunction(productId) {
    this.updateInventory.status="update"
    this.service.updateInventory(this.updateInventory).subscribe(response => {
      console.log("Update response:", response)
    })
  }
  deleteInventoryFunction(productId) {
    let template = {
      "productId": productId,
      "status":"delete"
    }
    this.service.deleteInventory(template).subscribe(response => {
      console.log("delete response:", response)
    })
  }

}
