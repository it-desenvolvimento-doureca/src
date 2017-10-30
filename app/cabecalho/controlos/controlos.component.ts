import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-controlos',
  templateUrl: './controlos.component.html',
  styleUrls: ['./controlos.component.css']
})
export class ControlosComponent implements OnInit {
  historico: boolean;
  validar: any;
  modo: string;
  currentpage: string;

  showGreeting;
  criar: boolean;
  voltar: boolean;
  editar: boolean;
  apagar: boolean;
  anterior: boolean;
  seguinte: boolean;
  pesquisar: boolean;
  location: Location;
  duplica: boolean;

  disCriar = true;
  disApagar = true;
  disDuplicar = true;
  disEditar = true;
  disValidar = true;

  @Output() anteriorbt: EventEmitter<any> = new EventEmitter();
  @Output() seguintebt: EventEmitter<any> = new EventEmitter();
  @Output() apagarbt: EventEmitter<any> = new EventEmitter();
  @Output() duplicarbt: EventEmitter<any> = new EventEmitter();
  @Output() atualiza: EventEmitter<any> = new EventEmitter();
  @Output() validarbt: EventEmitter<any> = new EventEmitter();
  @Output() hitoricobt: EventEmitter<any> = new EventEmitter();


  constructor(private route: ActivatedRoute, private router: Router, private globalVar: AppGlobals, location: Location) {
    this.location = location;
  }

  ngOnInit() {

    this.showGreeting = this.globalVar.getmenu_edi();
    this.criar = this.globalVar.getcriar();
    this.anterior = this.globalVar.getanterior();
    this.voltar = this.globalVar.getvoltar();
    this.editar = this.globalVar.geteditar();
    this.apagar = this.globalVar.getapagar();
    this.seguinte = this.globalVar.getseguinte();
    this.voltar = this.globalVar.getvoltar();
    this.pesquisar = this.globalVar.getatualizar();
    this.duplica = this.globalVar.getduplicar();
    this.historico = this.globalVar.gethistorico();

    this.disCriar = this.globalVar.getdisCriar();
    this.disApagar = this.globalVar.getdisApagar();
    this.disDuplicar = this.globalVar.getdisDuplicar();
    this.disEditar = this.globalVar.getdisEditar();
    this.disValidar = this.globalVar.getdisValidar();


    var titlee = this.router.routerState.snapshot.url
    var pag = "";

    if (titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
      var titlearray = titlee.split("/");
      titlee = titlearray[0];
      this.currentpage = titlee;

      if (titlearray[1] != null) {
        if (titlearray[1].match("editar")) {
          this.modo = "edit";
          pag = " - Editar"
        }
        if (titlearray[1].match("novo")) {
          this.modo = "novo";
          pag = " - Novo"
        }
      }
    }
    if (titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
      var titlearray = titlee.split("/");
      titlee = titlearray[0];
      this.currentpage = titlee;
    }

  }

  //atualizar permissões
  setacessos() {
    this.disCriar = this.globalVar.getdisCriar();
    this.disApagar = this.globalVar.getdisApagar();
    this.disDuplicar = this.globalVar.getdisDuplicar();
    this.disEditar = this.globalVar.getdisEditar();
  }

  getAcesso() {
    var acessos = this.router.routerState.snapshot.url

    if (acessos.charAt(0) === '/' && acessos.slice(1) != "dashboard") {
      acessos = acessos.slice(1);
      var acessosarray = acessos.split("/");
      acessos = acessosarray[0];
      this.showGreeting = false;
    } else {
      this.showGreeting = true;
    }
    /*for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === acessos) {

        if (this.globalVar.getleditar()) {
          this.editar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.editar = false;
        }
        if (this.globalVar.getcriar()) {
          this.criar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.criar = false;
        }
        if (this.globalVar.getapagar()) {
          this.apagar = this.listTitles[item].acesso[0].alterar;
        } else {
          this.apagar = false;
        }

      }
    }*/

  }
  novo() {
    this.router.navigate([this.currentpage + '/novo']);

  }

  edita() {
    var page;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        page = params['id'] || 0;
      });
    if (this.globalVar.geteditar()) {
      this.router.navigate([this.currentpage + '/editar'], { queryParams: { id: page } });
    }

  }
  backClicked() {

    if (this.currentpage == "registopara") {
      this.location.back();
    } else if (this.router.routerState.snapshot.url.search("registo/historico") > -1) {
      this.location.back();
    }else{
      this.router.navigate([this.currentpage]);
    }
    

  }


  anterior_func() {
    this.anteriorbt.emit()
  }
  seguinte_func() {
    this.seguintebt.emit()
  }
  apagar_func() {
    this.apagarbt.emit()
  }

  duplicar() {
    this.duplicarbt.emit()
  }

  valida() {
    this.validarbt.emit()
  }

  historico_f() {
    this.hitoricobt.emit()
  }

  editarclick(val) {
    this.editar = val;
  }

  atualizar() {
    this.atualiza.emit()
  }

  validarclick(val) {
    this.validar = val;
  }
}
