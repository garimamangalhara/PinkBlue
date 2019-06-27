import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { AssistantInventoryComponent } from './assistant-inventory/assistant-inventory.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inventory/:post',
    component: InventoryComponent
  },
  {
    path: 'assistantInventory/:post',
    component: AssistantInventoryComponent
  },
  {
    path: '*',
    redirectTo: 'login',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
