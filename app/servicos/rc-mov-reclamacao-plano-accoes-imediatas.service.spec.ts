import { TestBed, inject } from '@angular/core/testing';

import { RCMOVRECLAMACAOPLANOACCOESIMEDIATASService } from './rc-mov-reclamacao-plano-accoes-imediatas.service';

describe('RCMOVRECLAMACAOPLANOACCOESIMEDIATASService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RCMOVRECLAMACAOPLANOACCOESIMEDIATASService]
    });
  });

  it('should be created', inject([RCMOVRECLAMACAOPLANOACCOESIMEDIATASService], (service: RCMOVRECLAMACAOPLANOACCOESIMEDIATASService) => {
    expect(service).toBeTruthy();
  }));
});
