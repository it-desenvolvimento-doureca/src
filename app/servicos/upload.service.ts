import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { webUrl } from 'assets/config/webUrl';
import 'rxjs/Rx';
import { EMAIL } from "app/entidades/EMAIL";

@Injectable()
export class UploadService {
  private headers = new Headers({ 'Content-Type': 'multipart/form-data' });

  constructor(private http: Http) { }

 
  fileChange(file) {

    var nome = file.name.split(".");

    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(webUrl.host + '/rest/sirb/upload/' + nome[0] + '/' + nome[1], file, options)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }



  getImpressora() {
    const url = webUrl.host + '/rest/sirb/getImpressoras';
    return this.http
      .get(url)
      .map(this.extractData)
      .catch((error: any) => Observable.throw('Server error'));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
 