import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService } from './rc-mov-reclamacao-plano-accoes-preventivas.service';

describe('RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService], (service: RCMOVRECLAMACAOPLANOACCOESPREVENTIVASService) => {
    expect(service).toBeTruthy();
  }));
});
