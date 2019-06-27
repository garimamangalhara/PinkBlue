import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantInventoryComponent } from './assistant-inventory.component';

describe('AssistantInventoryComponent', () => {
  let component: AssistantInventoryComponent;
  let fixture: ComponentFixture<AssistantInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
