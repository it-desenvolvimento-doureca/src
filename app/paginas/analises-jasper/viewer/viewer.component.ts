import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  pass: any;
  user: any;
  link: string;
  user_jasper: string;
  pass_jasper: string;
  fileURL = null;

  constructor(private location: Location, private sanitizer: DomSanitizer,private router: Router) { }

  ngOnInit() {
    //j_username=jasperadmin&j_password=DourecA&
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.pass = JSON.parse(localStorage.getItem('userapp'))["pass"];
    console.log(atob(this.pass));
    this.user_jasper= "";
    this.pass_jasper= "";
    this.link = "http://192.168.40.101/jasperserver/flow.html?singlesingon=y&_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o&reportUnit=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o%2FListagem_de_Guias_de_Remessa&standAlone=true";

    this.fileURL = this.link+"&j_username="+this.user_jasper+"&j_password="+this.pass_jasper;
  }

  backClicked() {
    this.router.navigate(['analises']);
  }

}
