import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERPARAMETROSService } from 'app/servicos/ger-parametros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GER_PARAMETROS } from 'app/entidades/GER_PARAMETROS';
import { UploadService } from 'app/servicos/upload.service';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { GER_POSTOS } from 'app/entidades/GER_POSTOS';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  temp_ip: any = "192.168.01.01";
  pos: any = 0;
  impressoras = [];
  postos = [];
  url_SILVER: string;
  modoedicao: boolean;
  pasta_ficheiro: string;
  parametros: any;
  user: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private confirmationService: ConfirmationService, private GERPOSTOSService: GERPOSTOSService, private UploadService: UploadService, private renderer: Renderer, private route: ActivatedRoute, private router: Router, private location: Location, private GERPARAMETROSService: GERPARAMETROSService, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.impressoras = [
      { label: 'Seleccionar Impressora', value: null },
    ];
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    // this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisEditar(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.modoedicao = true;
        this.globalVar.setvoltar(true);
      }
    }
    this.temp_ip = (this.getCookie("IP_CLIENT") != null) ? this.getCookie("IP_CLIENT") : this.temp_ip;
    this.inicia();
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  inicia() {

    this.UploadService.getImpressora().subscribe(
      response => {
        for (var x in response) {
          this.impressoras.push({ label: response[x], value: response[x] });
        }
      },
      error => console.log(error));

    this.GERPARAMETROSService.getAll().subscribe(
      response => {
        this.parametros = response[0];
        for (var x in response) {
          this.pasta_ficheiro = response[x].pasta_FICHEIRO;
          this.url_SILVER = response[x].url_SILVER;
        }
      },
      error => console.log(error));
    this.tabelaPostos();
  }

  //atualizar tabela postos
  tabelaPostos() {
    this.GERPOSTOSService.getAll().subscribe(
      response => {
        this.postos = [];
        for (var x in response) {
          this.postos.push({ id_POSTO: response[x].id_POSTO, descricao: response[x].descricao, ip_POSTO: response[x].ip_POSTO, impressora: response[x].impressora });
        }
        this.postos = this.postos.slice();
      },
      error => console.log(error));
  }

  gravar() {

    var parametros = new GER_PARAMETROS;
    parametros = this.parametros;
    parametros.pasta_FICHEIRO = this.pasta_ficheiro.trim();
    parametros.url_SILVER = this.url_SILVER.trim();
    this.GERPARAMETROSService.update(parametros).then(() => {
      for (var x in this.postos) {
        if (this.postos[x].id_POSTO.toString().substring(0, 1) == "P") {
          this.cria_posto(this.postos[x]);
        } else {
          this.atualiza_posto(this.postos[x]);
        }
      }
      this.simular(this.inputgravou);
      this.location.back();
    },
      error => { console.log(error); this.simular(this.inputerro); });
  }
  atualiza_posto(data) {
    if (data.descricao != null && data.descricao != "") {
      var posto = new GER_POSTOS;
      posto = data;
      this.GERPOSTOSService.update(posto).then(() => {
        this.postos = this.postos.slice();
      });

    }

  }

  cria_posto(data) {
    if (data.descricao != null && data.descricao != "") {
      data.id_POSTO = null;
      this.GERPOSTOSService.update(data).then(() => {
        this.postos = this.postos.slice();
      },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //adicionar linha aos postos
  adicionar_linha() {
    this.pos++;
    this.postos.push({ id_POSTO: "P" + this.pos, descricao: "", ip_POSTO: "", impressora: null });
    this.postos = this.postos.slice();
  }


  eliminar(posto: GER_POSTOS) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (posto.id_POSTO.toString().substring(0, 1) != "P") {
          this.GERPOSTOSService.delete(posto.id_POSTO).then(() => {
            this.tabelaPostos();
          },
            error => { console.log(error); this.simular(this.inputerro); });
        } else {
          let index = -1;
          for (let i = 0; i < this.postos.length; i++) {
            if (this.postos[i].id_POSTO == posto.id_POSTO) {
              index = i;
              break;
            }
          }
          this.postos.splice(index, 1);
          this.postos = this.postos.slice();
        }
      }
    });
  }
}
