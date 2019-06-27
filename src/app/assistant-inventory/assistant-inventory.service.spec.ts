import { TestBed, inject } from '@angular/core/testing';

import { AssistantInventoryService } from './assistant-inventory.service';

describe('AssistantInventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantInventoryService]
    });
  });

  it('should be created', inject([AssistantInventoryService], (service: AssistantInventoryService) => {
    expect(service).toBeTruthy();
  }));
});
