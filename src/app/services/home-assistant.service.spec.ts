import { TestBed } from '@angular/core/testing';

import { HomeAssistantService } from './home-assistant.service';

describe('HomeAssistantService', () => {
  let service: HomeAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
