import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERPARAMETROSService } from 'app/servicos/ger-parametros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GER_PARAMETROS } from 'app/entidades/GER_PARAMETROS';
import { UploadService } from 'app/servicos/upload.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  impressoras = [];
  postos = [{ label: "POST 1", value: "1" }];
  url_SILVER: string;
  modoedicao: boolean;
  pasta_ficheiro: string;
  parametros: any;
  user: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  constructor(private UploadService: UploadService, private renderer: Renderer, private route: ActivatedRoute, private router: Router, private location: Location, private GERPARAMETROSService: GERPARAMETROSService, private globalVar: AppGlobals) { }

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
    this.inicia();
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
  }

  gravar() {
    var parametros = new GER_PARAMETROS;
    parametros = this.parametros;
    parametros.pasta_FICHEIRO = this.pasta_ficheiro.trim();
    parametros.url_SILVER = this.url_SILVER.trim();
    this.GERPARAMETROSService.update(parametros).then(() => {
      this.simular(this.inputgravou);
      this.location.back();
    },
      error => { console.log(error); this.simular(this.inputerro); });

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

}
