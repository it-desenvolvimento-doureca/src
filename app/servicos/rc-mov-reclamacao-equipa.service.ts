import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { RC_MOV_RECLAMACAO_EQUIPA } from '../entidades/RC_MOV_RECLAMACAO_EQUIPA';

@Injectable()
export class RCMOVRECLAMACAOEQUIPAService {
  handleError: any;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  create(data: RC_MOV_RECLAMACAO_EQUIPA) {
    return this.http
      .post(webUrl.host + '/rest/sirb/createRC_MOV_RECLAMACAO_EQUIPA', JSON.stringify(data), { headers: this.headers })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getbyidreclamacao(id): Observable<RC_MOV_RECLAMACAO_EQUIPA[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_EQUIPAbyid_reclamacao/' + id;
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  getAll(): Observable<RC_MOV_RECLAMACAO_EQUIPA[]> {
    const url = webUrl.host + '/rest/sirb/getRC_MOV_RECLAMACAO_EQUIPA';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  delete(id) {
    return this.http
      .delete(webUrl.host + '/rest/sirb/deleteRC_MOV_RECLAMACAO_EQUIPA/' + id + '')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  update(data: RC_MOV_RECLAMACAO_EQUIPA) {
    return this.http
      .put(webUrl.host + '/rest/sirb/updateRC_MOV_RECLAMACAO_EQUIPA', JSON.stringify(data), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}