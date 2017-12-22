import { Injectable } from '@angular/core';
import { webUrl } from 'assets/config/webUrl';
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Http, Headers, ResponseContentType } from '@angular/http';;

@Injectable()
export class RelatoriosService {

  constructor(private http: Http) { }

  downloadPDF(format, filename,id,relatorio): any {
    const url = webUrl.host + '/rest/sirb/get/' + format+'/'+filename+'/'+id+'/'+relatorio;
    return this.http.get(url, { responseType: ResponseContentType.Blob }).map(
      (res) => {
        if (format == "pdf") {
          return new Blob([res.blob()], { type: 'application/pdf' });
        } else if (format == "xlsx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        }else if (format == "docx") {
          return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        }

      });
  }

  teste():any {
    const url = 'http://localhost:5050/teste/teste.php';
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
