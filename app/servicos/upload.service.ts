import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { EMAIL } from "app/entidades/EMAIL";

@Injectable()
export class UploadService {
  private headers = new Headers({ 'Content-Type': 'multipart/form-data' });
  private headers2 = new Headers({ 'Content-Type': 'application/json' });


  constructor(private http: Http) { }


  fileChange(file) {

    var nome = file.name.split(".");

    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(webUrl.host + '/rest/sirb/upload/' + nome[0] + '/' + nome[1], file, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  importarFicheiroRAK(file) {
  
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(webUrl.host + '/rest/sirb/uploadRAKS/', file, options)
      .map(this.extractData1)
      .catch((error: any) => Observable.throw('Server error'));
  }


  getImpressora() {
    const url = webUrl.host + '/rest/sirb/getImpressoras';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  imprimir(ficheiro, impressora) {
    const url = webUrl.host + '/rest/sirb/imprimir/' + ficheiro + '/' + impressora;
    return this.http
      .get(url)
      .map(this.extractData1)
      .catch(this.handleError);
  }



  verficaEventos(data) {
    return this.http
      .post(webUrl.host + '/rest/sirb/verficaEventos', JSON.stringify(data), { headers: this.headers2 })
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private extractData1(res: Response) {
    return res;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
