import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public inventory: any
  public inventoryList: any = []
  public updateInventory: any
  public updateFormFlag: any
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

}
