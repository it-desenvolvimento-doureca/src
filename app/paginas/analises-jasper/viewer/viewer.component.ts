import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GERANALISESService } from 'app/servicos/ger-analises.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  aumentado: any = false;
  noativo: any;
  nodes: any;
  pass: any;
  user: any;
  link: string;
  user_jasper: string;
  pass_jasper: string;
  fileURL = null;

  public list = [];
  constructor(private elementRef: ElementRef, private GERANALISESService: GERANALISESService, private location: Location, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {

    //j_username=jasperadmin&j_password=DourecA&
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.pass = JSON.parse(localStorage.getItem('userapp'))["pass"];
    //console.log(atob(this.pass));
    this.user_jasper = 'jasperadmin'; //this.user;
    this.pass_jasper = 'DourecA&'; //tob(this.pass);
    this.link = "http://192.168.40.101/jasperserver/flow.html?singlesingon=y&_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o&reportUnit=%2FAnalises_de_Gest%C3%A3o%2FProdu%C3%A7%C3%A3o%2FListagem_de_Guias_de_Remessa&standAlone=true";

    ///this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.link + "&j_username=" + this.user_jasper + "&j_password=" + this.pass_jasper);


    this.tree_nodes();
  }

  backClicked() {
    this.router.navigate(['analises']);
  }


  //criar array arvore analises
  tree_nodes() {
    var array = [{ id: 0, parent: null, name: 'Análises', link: null, ativo: true, disable: false }];
    this.nodes = [];
    this.GERANALISESService.getAll().subscribe(result => {
      for (var x in result) {
        var disable = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "nodet" + result[x].id);
        array.push({ id: result[x].id, parent: result[x].id_PAI, name: result[x].descricao, link: result[x].link, ativo: result[x].ativo, disable: disable })
      }

      for (var x in array) {
        if (array[x].parent == null) {
          this.nodes.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo, disable: array[x].disable});

          this.getFilhos(array, array[x].id, this.nodes.find(item => item.id == array[x].id));
        }
      }

      this.list = this.nodes;
    }, error => { console.log(error); });
  }

  //ver filhos arvore
  getFilhos(array, id_pai, arr) {
    for (var x in array) {
      if (array[x].parent == id_pai) {

        arr.children.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo, disable: array[x].disable });
        this.getFilhos(array, array[x].id, arr.children.find(item => item.id == array[x].id));
      }
    }
  }

  alterarelatorio(link, id) {
    if (link != null) {
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(link + "&j_username=" + this.user_jasper + "&j_password=" + this.pass_jasper);
      this.noativo = id;
    }

  }

  aumentardiv() {
    if (this.aumentado) {
      return "fullscreen";
    } else {
      return "";
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.aumentado = false;
    }
  }

}
