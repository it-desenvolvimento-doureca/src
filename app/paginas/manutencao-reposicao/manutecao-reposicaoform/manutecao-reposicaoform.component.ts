import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { ConfirmationService } from "primeng/primeng";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { AB_MOV_MANUTENCAO } from "app/entidades/AB_MOV_MANUTENCAO";
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { AB_MOV_MANUTENCAO_LINHA } from "app/entidades/AB_MOV_MANUTENCAO_LINHA";
import { AB_MOV_MANUTENCAO_CAB } from "app/entidades/AB_MOV_MANUTENCAO_CAB";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { AD_MOV_REG_PARAM_OPERACAO } from "app/entidades/AD_MOV_REG_PARAM_OPERACAO";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { GERARMAZEMService } from 'app/servicos/ger-armazem.service';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { RelatoriosService } from 'app/servicos/relatorios.service';
import { DomSanitizer } from '@angular/platform-browser';
import { setTimeout } from 'core-js/library/web/timers';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { UploadService } from 'app/servicos/upload.service';

@Component({
  selector: 'app-manutecao-reposicaoform',
  templateUrl: './manutecao-reposicaoform.component.html',
  styleUrls: ['./manutecao-reposicaoform.component.css']
})
export class ManutecaoReposicaoformComponent implements OnInit {

  fileURL;
  filename: string;
  dishistorico = true;
  textotabela: string = null;
  utilizadores: any[];
  hora_planeamento;
  admin: any;
  data_planeamendth: Date;
  datapl: any;
  acessoprep: boolean = false;
  acessoexec: boolean = false;
  executado: boolean;
  query = [];
  disimprimir: any = true;
  id: any;
  manutencao_dados: any;
  gravarlinhas: boolean;
  pos_sele: any;
  pesquisa_analise: any = [];
  intervalo_op: any[];
  num_manutencao: any;
  manutencao = [];
  i: any;
  data_actual: Date;
  id_turno: any;
  turno: any[];
  tipo_manu_id: any;
  tipo_manu: any;
  estado: string;
  responsavel: any;
  tipo_adicao: any[];
  pos: any = 0;
  banhos: any[];
  cor_linha: any;
  linha: any;
  linhas: any[];
  user: any;
  medidas: any[];
  novo: boolean;
  arrayForm = [];
  modoedicao = false;
  planeamento = true;
  data_planeamento;
  planeado = false;
  preparado = false;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;
  @ViewChild('waitingDialog') waitingDialog: ElementRef;
  @ViewChild('waitingDialogclose') waitingDialogclose: ElementRef;
  @ViewChild('inputgduplica') inputgduplica: ElementRef;
  @ViewChild('aviso_gravar') aviso_gravar: ElementRef;
  @ViewChild('aviso_concluir_planeamento') aviso_concluir_planeamento: ElementRef;
  @ViewChild('aviso_concluir_planeamento2') aviso_concluir_planeamento2: ElementRef;
  @ViewChild('aviso_concluir_planeamento3') aviso_concluir_planeamento3: ElementRef;
  @ViewChild('enviadoparaimpressora') enviadoparaimpressora: ElementRef;
  @ViewChild('erroimprimir') erroimprimir: ElementRef;
  @ViewChild('alteraeditar') alteraeditar: ElementRef;
  @ViewChild('alteraeditartrue') alteraeditartrue: ElementRef;
  @ViewChild('imprime') imprime: ElementRef;

  constructor(private UploadService: UploadService, private GERPOSTOSService: GERPOSTOSService, private sanitizer: DomSanitizer, private RelatoriosService: RelatoriosService, private GERUTILIZADORESService: GERUTILIZADORESService, private elementRef: ElementRef, private GERARMAZEMService: GERARMAZEMService, private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVANALISEService: ABMOVANALISEService, private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private ABDICTIPOADICAOService: ABDICTIPOADICAOService, private ABDICBANHOADITIVOService: ABDICBANHOADITIVOService, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService, private ABDICTURNOService: ABDICTURNOService, private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private confirmationService: ConfirmationService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private globalVar: AppGlobals, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private location: Location, private router: Router, private renderer: Renderer, private route: ActivatedRoute) { }

  ngOnInit() {


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/jqbtk.js";
    this.elementRef.nativeElement.appendChild(s);
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(true);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.admin = JSON.parse(localStorage.getItem('userapp'))["admin"];
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005apagar"));
    this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005duplicar"));

    this.disimprimir = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005imprimir");
    this.dishistorico = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005historico");
    // this.pos=3;
    /* this.arrayForm = [{pos: 1, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] },
     {pos: 2, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] }];*/

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });



      //preenche array para navegar nas manutenções 
      if (this.globalVar.getfiltros("manutencaoreposicao_id") && this.globalVar.getfiltros("manutencaoreposicao_id").length > 0) {
        this.manutencao = this.globalVar.getfiltros("manutencaoreposicao_id");
        this.i = this.manutencao.indexOf(+id);
        this.preenchedados(true, this.manutencao[this.i]);
      }
      else {
        if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005planeamento")) {
          this.query.push("Em Planeamento");
        }
        if (!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao") && !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao")) {
          this.query.push("Planeado", "Em Preparação", "Preparado", "Em Execução", "Executado");
        }

        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005execucao")) {
          this.acessoexec = true;
        }
        if (JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node005preparacao")) {
          this.acessoprep = true;
        }

        //preenche array das manutenções por ordem do id.
        this.ABMOVMANUTENCAOService.getAllsrotid(this.query, "R").subscribe(
          response => {
            for (var x in response) {
              this.manutencao.push(response[x][0].id_MANUTENCAO);
            }
            this.i = this.manutencao.indexOf(+id);
            if (this.manutencao[this.i] == null) {

              //preenceh combobox
              this.preenchedados(true, id);
            } else this.preenchedados(true, this.manutencao[this.i]);
          }, error => { console.log(error); });
      }

    }
    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.globalVar.setduplicar(true);
        this.modoedicao = true;
        this.planeamento = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setduplicar(false);
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formArranque';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_actual = new Date();
        this.data_planeamento = this.formatDate(this.data_actual.toDateString());
        this.hora_planeamento = this.data_actual.toLocaleTimeString().slice(0, 5);
        this.responsavel = JSON.parse(localStorage.getItem('userapp'))["nome"];
        this.estado = "Em Preparação";
        this.planeamento = false;
        // this.novalinha();
        this.arrayForm = null;
        //preenceh combobox
        this.preenchedados();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
        this.modoedicao = false;
        this.planeamento = false;
      }
    }



  }

  inicia(id) {
    this.planeado = false;
    this.preparado = false;
    this.planeamento = false;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.manutencao_dados = response[x][0];
            this.num_manutencao = response[x][0].id_MANUTENCAO;
            this.tipo_manu_id = response[x][0].id_TIPO_MANUTENCAO;
            this.data_planeamento = this.formatDate(response[x][0].data_PLANEAMENTO);
            this.hora_planeamento = response[x][0].hora_PLANEAMENTO.slice(0, 5);
            this.data_planeamendth = new Date(new Date(response[x][0].data_PLANEAMENTO).toDateString() + " " + response[x][0].hora_PLANEAMENTO.slice(0, 5));
            this.datapl = response[x][0].data_PLANEAMENTO;
            this.responsavel = response[x][4].nome_UTILIZADOR;
            this.linha = this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
            this.id_turno = response[x][0].id_TURNO;
            this.estado = response[x][0].estado;
            this.cor_linha = response[x][1].cor;
            if (this.estado == "Planeado") {
              this.planeado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            } else if (this.estado == "Preparado") {
              this.preparado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            } else if (this.estado == "Em Planeamento") {
              this.planeamento = true;
              this.globalVar.seteditar(true);
              this.simular(this.alteraeditartrue);
            } else if (this.estado == "Em Preparação") {
              this.planeado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            } else if (this.estado == "Em Execução") {
              this.preparado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            }
            else if (this.estado == "Executado") {
              this.preparado = true;
              this.globalVar.seteditar(false);
              this.simular(this.alteraeditar);
            }
            if (this.admin) {
              this.globalVar.seteditar(true);
              this.simular(this.alteraeditartrue);
            }
          }
          this.preenche_banhos(id);
        }
      },
      error => console.log(error));
  }

  //carrega linhas
  carregarlinhas(id) {
    this.arrayForm = [];
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var data_prev = null;
            var hora_prev = null;
            var data_exec = null;
            var hora_exc = null;
            var id_adicao = null;
            var int_op = this.intervalo_op.find(item => item.value.id == response[x][0].id_TIPO_OPERACAO).value;
            var id_banho = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value;
            var nome_analise = "";
            this.executado = false;
            var preparado = false;
            var disable = false;
            var data_prep = null;
            if (response[x][0].data_PREVISTA != null) {
              data_prev = new Date(new Date(response[x][0].data_PREVISTA).toDateString() + ' ' + response[x][0].hora_PREVISTA.slice(0, 5));
              hora_prev = response[x][0].hora_PREVISTA.slice(0, 5);
            }

            if (response[x][0].id_TIPO_ADICAO != null) id_adicao = this.tipo_adicao.find(item => item.value.id == response[x][0].id_TIPO_ADICAO).value;
            if (response[x][0].id_ANALISE != "" && response[x][0].id_ANALISE != null) nome_analise = response[x][0].id_ANALISE + ' - ' + response[x][1];
            if (response[x][0].id_TIPO_ADICAO != null) if (id_adicao.id195 != "" && id_adicao.id195 != null) disable = true;
            if (response[x][0].data_EXECUCAO != null) {
              var hora = (response[x][0].hora_EXECUCAO != null) ? response[x][0].hora_EXECUCAO.slice(0, 5) : null;
              data_exec = this.formatDate(response[x][0].data_EXECUCAO) + ' ' + hora;
              hora_exc = response[x][0].hora_EXECUCAO.slice(0, 5);
              this.executado = true;
            }

            if (response[x][0].data_PREPARACAO != null) {
              preparado = true;
              data_prep = this.formatDate(response[x][0].data_PREPARACAO) + ' ' + response[x][0].hora_PREPARACAO.slice(0, 5);
            }

            this.pos++;

            var doseadores = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value.doseadores;
            this.arrayForm.push({
              doseador: response[x][0].doseador, doseadores: doseadores, executado: this.executado, preparado: preparado, obs_prep: response[x][0].obs_PREPARACAO,
              id_manu: response[x][0].id_MANUTENCAO, data: data_prev, cod_analise: response[x][0].id_ANALISE, nome_analise: nome_analise, disable_op: disable,
              pos: this.pos, id: response[x][0].id_MANUTENCAO_CAB, id_banho: id_banho, hora_pre: hora_prev, data_pre: data_prev, tipo_adicao: id_adicao,
              interva_ope: int_op, id_195: response[x][3], obs_pla: response[x][0].obs_PLANEAMENTO, obs_exec: response[x][0].obs_EXECUCAO, resp_exe_id: response[x][0].utz_EXECUCAO,
              resp_exe: response[x][4], hora_exc: hora_exc, data_exc: data_exec, resp_prep: response[x][5], data_prep: data_prep,
              id_tina: response[x][0].id_TINA, tina: response[x][6], capacidade: response[x][2], aditivos: [], data_valida: response[x][6]
            });
            this.carregaraditivoslinhas(response[x][0].id_MANUTENCAO_CAB, this.pos);
          }

        } else {
          if (this.modoedicao) this.novalinha();
        }
      },
      error => console.log(error));
  }

  carregaraditivoslinhas(id, pos) {
    this.textotabela = "A PESQUISAR...";
    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var pos2 = 0;
          for (var x in response) {
            var stock = null;
            var value = 0;
            var disabled = true;
            var valor1 = null;

            if (response[x][3] == true) disabled = false;
            if (response[x][0].stock != null) { stock = response[x][0].stock.toFixed(2); stock = stock.replace(".", ","); }

            if (response[x][0].valor_AGUA != null) value = response[x][0].valor_AGUA.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');


            if (response[x][0].valor1 != null) { valor1 = response[x][0].valor1.replace(".", ","); }

            this.arrayForm.find(item => item.pos == pos).aditivos.push(
              {
                disabled: disabled,
                pos: pos2,
                id_LIN: response[x][0].id_MANUTENCAO_LIN, id: response[x][0].id_ADITIVO, nome: response[x][1].nome_COMPONENTE, valor1: valor1, valor2: response[x][0].valor2,
                unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: response[x][0].obs_PLANEAMENTO,
                stock: stock, cod_REF: response[x][0].cod_REF, unidstock: response[x][0].stkunit, valor_agua: value, factor: response[x][1].factor_MULTIPLICACAO_AGUA
              }
            );
            pos2++;
          }
          this.arrayForm.find(item => item.pos == pos).aditivos = this.arrayForm.find(item => item.pos == pos).aditivos.slice();
          this.textotabela = null;
        } else {
          this.textotabela = null;
        }
      },
      error => console.log(error));
  }

  //adicionar novo formulário
  novalinha() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    this.pos++;
    if (this.arrayForm.length < 1) {

      var data = this.formatDate(new Date().toDateString());
      var hora = new Date().toLocaleTimeString().slice(0, 5);
      this.arrayForm.push({
        executado: false, preparado: false, obs_prep: null, doseador: null, doseadores: [],
        id_manu: id, data: new Date(), cod_analise: null, nome_analise: null, disable_op: false,
        pos: this.pos, id: null, id_banho: null, hora_pre: hora, data_pre: data, tipo_adicao: this.tipo_adicao[0].value, data_valida: null,
        interva_ope: this.intervalo_op[0].value, id_195: null, obs_pla: null, obs_exec: null, resp_exe: null, resp_exe_id: null, hora_exc: null, data_exc: null, resp_prep: null, data_prep: null, tina: null, id_tina: null, capacidade: null, aditivos: []
      });
    }
  }

  //preencher nome da tina/capacidade e tabela dos aditivos
  nome_tinas(event, pos) {
    this.arrayForm.find(item => item.pos == pos).tina = event.value.nome_tina;
    this.arrayForm.find(item => item.pos == pos).id_tina = event.value.id_tina;
    this.arrayForm.find(item => item.pos == pos).capacidade = event.value.capacidade;
    this.arrayForm.find(item => item.pos == pos).doseadores = event.value.doseadores;
    this.arrayForm.find(item => item.pos == pos).aditivos = [];
  }

  carregaaditivos(event, id, pos) {
    var array = [];
    this.arrayForm.find(item => item.pos == pos).aditivos = [];
    if (id.id != "" && id.id != null && event.value != "") {
      this.ABDICBANHOADITIVOService.getbyID_banho(id.id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir componente Componente
          if (count > 0) {
            this.textotabela = "A PESQUISAR...";
            var pos2 = 1;
            for (var x in response) {
              var disabled = true;
              if (response[x][0].manutencaoreposicao == true) disabled = false;
              if (response[x][1].cod_REF != null) {
                this.carregaaditivosstock(response, x, pos, pos2, count, array, disabled, event.value);
              } else {
                array.push({ disabled: disabled, pos: pos2, id_LIN: null, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(event.value, response, x), valor2: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidstock: null, cod_REF: response[x][1].cod_REF });
                this.ordernar(array);
                if (pos2 == count) {
                  this.arrayForm.find(item => item.pos == pos).aditivos = array;
                  this.textotabela = null;
                }
              }
              pos2++;
            }
          }
        }, error => console.log(error));
    }
  }

  //devolve valor 1 dependente da dose
  getValor(dose, response, x) {
    if (dose != null && dose != "") {
      var valor = null;
      if (response[x][0]['valor_DOSE' + dose] != null) valor = response[x][0]['valor_DOSE' + dose].toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
      return valor;
    } else {
      return null;
    }
  }

  carregaaditivosstock(response, x, pos, pos2, total2, array, disabled, dose) {
    var query = [];
    var total = null;
    this.GERARMAZEMService.getAll().subscribe(
      res => {

        var count1 = Object.keys(res).length;
        if (count1 > 0) {
          for (var y in res) {
            query.push("'" + res[y].cod_ARMAZEM + "'");
          }
          this.GERARMAZEMService.getStock(response[x][1].cod_REF, query).subscribe(
            res1 => {
              var count = Object.keys(res1).length;
              if (count > 0) {
                total = parseFloat(res1[0].STOQTE).toFixed(2);
                total = total.replace(".", ",");
              }
              array.push({ disabled: disabled, pos: pos2, id_LIN: null, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: res1[0].UNIUTI, cod_REF: response[x][1].cod_REF });
              this.ordernar(array);
              if (pos2 == total2) {
                this.arrayForm.find(item => item.pos == pos).aditivos = array;
                this.textotabela = null;
              }

            },
            error => {
              array.push({ disabled: disabled, pos: pos2, id_LIN: null, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, cod_REF: response[x][1].cod_REF });
              this.ordernar(array);
              if (pos2 == total2) {
                this.arrayForm.find(item => item.pos == pos).aditivos = array;
                this.textotabela = null;
              }
              console.log(error);
            });
        } else {
          array.find(item => item.pos == pos).aditivos.push({ disabled: disabled, pos: pos2, id_LIN: null, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: this.getValor(dose, response, x), valor2: null, factor: response[x][1].factor_MULTIPLICACAO_AGUA, valor_agua: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "", stock: total, unidstock: null, cod_REF: response[x][1].cod_REF });
          this.ordernar(array);
          if (pos2 == total2) {
            this.arrayForm.find(item => item.pos == pos).aditivos = array;
            this.textotabela = null;
          }
        }

      },
      error => console.log(error));
  }

  ordernar(array) {
    array.sort((n1, n2) => {
      if (n1.pos > n2.pos) {
        return 1;
      }

      if (n1.pos < n2.pos) {
        return -1;
      }

      return 0;
    });
  }

  //preenche combobox banhos
  preenche_banhos(id) {
    this.banhos = [];
    if (this.linha["id"] != "") {
      //preenche combobox banhos
      this.ABDICBANHOService.getAllLINHAbylinha_tipo(this.linha["id"], "R").subscribe(
        response => {
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            var doseadores = [{ label: "--", value: "" }]
            if (response[x][0].dose1 != null && response[x][0].dose1 != "") doseadores.push({ label: response[x][0].dose1, value: 1 + '' })
            if (response[x][0].dose2 != null && response[x][0].dose2 != "") doseadores.push({ label: response[x][0].dose2, value: 2 + '' })
            if (response[x][0].dose3 != null && response[x][0].dose3 != "") doseadores.push({ label: response[x][0].dose3, value: 3 + '' })
            if (response[x][0].dose4 != null && response[x][0].dose4 != "") doseadores.push({ label: response[x][0].dose4, value: 4 + '' })
            if (response[x][0].dose5 != null && response[x][0].dose5 != "") doseadores.push({ label: response[x][0].dose5, value: 5 + '' })

            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, id_tina: response[x][2].id_TINA, nome_tina: response[x][2].cod_TINA, capacidade: response[x][2].capacidade, doseadores: doseadores } });
          }
          this.banhos = this.banhos.slice();
          this.carregarlinhas(id);
        },
        error => console.log(error));
    }

  }

  //atulizar valor agua ao alterar Valor 1
  atualizarvaloragua(val, fator, pos_adi, pos_item) {

    var num = val * fator;
    var num2 = num.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '');
    this.arrayForm.find(item => item.pos == pos_item).aditivos.find(item => item.pos == pos_adi).valor_agua = num2;
  }

  //apagar linha
  apagarlinha(pos, id) {
    this.confirmapagarlinha(pos, id);
  }

  //popup apagarlinha
  confirmapagarlinha(pos, id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (id != null && id != "") {
          this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
            response => {
              for (var x in response) {
                var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
                MOV_MANUTENCAO_CAB = response[x][0];
                MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
                MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
                MOV_MANUTENCAO_CAB.inativo = true;
                if (response[x][3] != null) {
                  this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                    resp => {
                      var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                      MOV_REG_PARAM_OPERACAO = resp[0][0];
                      MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                      MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                      MOV_REG_PARAM_OPERACAO.inativo = true;

                      this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                      }, error => {
                        console.log(error); this.simular(this.inputerro);
                      });
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                }
                this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
              var index1 = this.arrayForm.findIndex(item => item.pos === pos);
              this.arrayForm.splice(index1, 1);
              this.arrayForm = this.arrayForm.slice();
              this.simular(this.inputapagar);
            },
            error => console.log(error));
        } else {
          var index = this.arrayForm.findIndex(item => item.pos === pos);
          this.arrayForm.splice(index, 1);
          this.arrayForm = this.arrayForm.slice();
          this.simular(this.inputapagar);
        }

      }
    });
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  gravar() {

    if (!this.planeamento && this.novo) {
      var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
      MOV_MANUTENCAO.id_LINHA = this.linha["id"];
      MOV_MANUTENCAO.estado = this.estado;
      MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
      MOV_MANUTENCAO.inativo = false;
      MOV_MANUTENCAO.id_TURNO = this.id_turno;
      MOV_MANUTENCAO.data_PLANEAMENTO = this.data_planeamento;
      MOV_MANUTENCAO.id_TIPO_MANUTENCAO = this.tipo_manu_id;
      MOV_MANUTENCAO.data_CRIA = new Date();
      MOV_MANUTENCAO.utz_CRIA = this.user;
      MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
      MOV_MANUTENCAO.inativo = false;
      MOV_MANUTENCAO.classif = "R";
      this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
        res => {

          this.simular(this.inputnotifi);
          this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: res.id_MANUTENCAO } });
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });

    } else {
      var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
      MOV_MANUTENCAO = this.manutencao_dados;
      MOV_MANUTENCAO.data_ULT_MODIF = new Date();
      MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
      MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
      MOV_MANUTENCAO.data_PLANEAMENTO = this.data_planeamento;
      MOV_MANUTENCAO.estado = this.estado
      this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
        this.simular(this.inputgravou);
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
    }
  }

  gravarlinha(pos) {
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.gravarlinhas = false;
    var data = new Date(new Date(this.arrayForm.find(item => item.pos == pos).data_pre).toDateString() + " " + this.arrayForm.find(item => item.pos == pos).hora_pre);
    this.data_planeamendth = new Date(new Date(this.data_planeamento).toDateString() + " " + this.hora_planeamento.slice(0, 5));
    if (data > this.data_planeamendth) {
      if (this.arrayForm.find(item => item.pos == pos).id != null) {
        //update
        this.ABMOVMANUTENCAOCABService.getbyID_cab(this.arrayForm.find(item => item.pos == pos).id).subscribe(
          response => {
            for (var x in response) {
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ULT_MODIF = new Date();
              MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
              MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
              MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
              MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
              MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
              MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
              MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
              MOV_MANUTENCAO_CAB.data_PREVISTA = this.arrayForm.find(item => item.pos == pos).data_pre;
              MOV_MANUTENCAO_CAB.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
              MOV_MANUTENCAO_CAB.doseador = this.arrayForm.find(item => item.pos == pos).doseador;
              MOV_MANUTENCAO_CAB.utz_ULT_MODIF = this.user;

              if (this.admin) {
                MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
                MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
                MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
                if (MOV_MANUTENCAO_CAB.hora_EXECUCAO != null) {
                  this.arrayForm.find(item => item.pos == pos).executado = true;
                } else {
                  this.arrayForm.find(item => item.pos == pos).executado = false;
                }
                var tamanho = this.arrayForm.length;
                var count = 0;
                for (var y in this.arrayForm) {
                  if (this.arrayForm[y].executado) count++;
                }
                //this.estado = "Em Execução";
                if (tamanho == count) {
                  this.estado = "Executado";
                }
                var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
                MOV_MANUTENCAO = this.manutencao_dados;
                MOV_MANUTENCAO.estado = this.estado;
                MOV_MANUTENCAO.data_ULT_MODIF = new Date();
                MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
                this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                this.gravarlinhasaditivos(response[x][0].id_MANUTENCAO_CAB, pos)
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
          },
          error => console.log(error));
      } else {
        this.gravarlinhas = true;
        //insere
        MOV_MANUTENCAO_CAB.data_CRIA = new Date();
        MOV_MANUTENCAO_CAB.data_PREVISTA = this.arrayForm.find(item => item.pos == pos).data_pre;
        MOV_MANUTENCAO_CAB.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
        MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
        MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
        MOV_MANUTENCAO_CAB.id_MANUTENCAO = this.arrayForm.find(item => item.pos == pos).id_manu;
        MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
        MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
        MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
        MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
        MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
        MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
        MOV_MANUTENCAO_CAB.doseador = this.arrayForm.find(item => item.pos == pos).doseador;
        MOV_MANUTENCAO_CAB.inativo = false;

        if (this.admin) {
          MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
          MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
          MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
        }
        this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
          res => {
            this.arrayForm.find(item => item.pos == pos).id = res.id_MANUTENCAO_CAB;
            this.gravarlinhasaditivos(res.id_MANUTENCAO_CAB, pos)
          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
      }
    } else {
      this.simular(this.aviso_concluir_planeamento3);
    }
  }

  gravarlinhasaditivos(id, pos) {
    if (this.arrayForm.find(item => item.pos == pos).aditivos.length > 0) {
      for (var x in this.arrayForm.find(item => item.pos == pos).aditivos) {
        if (this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN == null) {
          var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
          MOV_MANUTENCAO_LINHA.id_ADITIVO = this.arrayForm.find(item => item.pos == pos).aditivos[x].id;
          MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id;
          MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
          MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
          MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
          MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;
          var value = 0;
          if (this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua != null) value = parseFloat(String(this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua).replace(",", "."));
          MOV_MANUTENCAO_LINHA.valor_AGUA = value;
          MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).aditivos[x].obs;
          MOV_MANUTENCAO_LINHA.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
          MOV_MANUTENCAO_LINHA.stock = parseFloat(this.arrayForm.find(item => item.pos == pos).aditivos[x].stock);
          MOV_MANUTENCAO_LINHA.cod_REF = this.arrayForm.find(item => item.pos == pos).aditivos[x].cod_REF;
          MOV_MANUTENCAO_LINHA.stkunit = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidstock;

          this.criar(MOV_MANUTENCAO_LINHA, pos, x);
        } else {
          this.atualizalinhasaditivos(this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN, pos, x)
        }
      }

    }
    if (this.gravarlinhas) {
      this.simular(this.inputnotifi);
    } else {
      this.simular(this.inputgravou);
    }

  }

  criar(MOV_MANUTENCAO_LINHA, pos, x) {
    this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
      res => {
        this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN = res.id_MANUTENCAO_LIN;
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  atualizalinhasaditivos(id, pos, x) {

    var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
    this.ABMOVMANUTENCAOLINHAService.getbyID_lin(id).subscribe(
      response => {
        for (var y in response) {
          this.atualizalinhasaditivos2(MOV_MANUTENCAO_LINHA, x, y, pos, response);
        }
      },
      error => console.log(error));
  }

  atualizalinhasaditivos2(MOV_MANUTENCAO_LINHA, x, y, pos, response) {
    MOV_MANUTENCAO_LINHA = response[y];
    MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
    MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
    MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
    MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;
    var value = 0;
    if (this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua != null) value = parseFloat(String(this.arrayForm.find(item => item.pos == pos).aditivos[x].valor_agua).replace(",", "."));
    MOV_MANUTENCAO_LINHA.valor_AGUA = value;
    MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).aditivos[x].obs;
    MOV_MANUTENCAO_LINHA.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).hora_pre;
    this.ABMOVMANUTENCAOLINHAService.update(MOV_MANUTENCAO_LINHA).then(() => {
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.manutencao.length;
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
      this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.manutencao.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['manutencaoreposicao/view'], { queryParams: { id: this.manutencao[this.i] } });
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
    }
  }

  //ao alterar intervalo de operação
  alterarintervalo(event, pos, id) {
    if (id != null) {
      this.confirmationService.confirm({
        message: 'Ao alterar o Intervalo de Operação, o Registo de Operação será eliminado. Continuar?',
        header: 'Apagar Registo - ID: ' + id,
        icon: 'fa fa-trash',
        accept: () => {

          this.ADMOVREGPARAMOPERACAOService.getbyID(id).subscribe(
            response => {
              var count = Object.keys(response).length;
              if (count > 0) {
                var regpara = new AD_MOV_REG_PARAM_OPERACAO;
                regpara = response[0][0];
                regpara.inativo = true;
                this.ADMOVREGPARAMOPERACAOService.update(regpara).then(() => {
                  this.arrayForm.find(item => item.pos == pos).id_195 = null;
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
            }
          )

        }
      });
    }

  }

  //abre popup de análises
  showDialog(event, pos, id) {
    this.preencheanalises(id);
    this.pos_sele = pos;
    let elem = document.getElementById("pesquisa");
    let elm2 = document.getElementById("myModallinhas");
    let coords = elem.getBoundingClientRect();
    elm2.style.top = Math.abs(coords.bottom - event.screenY + 20) + 'px';
    elm2.style.bottom = 'none';
    this.simular(this.dialoglinhas);
  }

  //seleccionar analise da tabela e grava campos
  seleciona(event) {
    this.arrayForm.find(item => item.pos == this.pos_sele).cod_analise = event.data.id
    this.arrayForm.find(item => item.pos == this.pos_sele).nome_analise = event.data.id + ' - ' + event.data.nome;
    this.simular(this.closedialoglinha);
  }

  //ao selecionar tipode adição verifica se tem id195 se sim o int. oper. fica por defeito vermelho
  verifica_adicao(event, pos) {
    this.arrayForm.find(item => item.pos == pos).disable_op = false;
    this.arrayForm.find(item => item.pos == pos).interva_ope = null;
    if (event.value.id195 != "" && event.value.id195 != null) {
      this.arrayForm.find(item => item.pos == pos).interva_ope = this.intervalo_op.find(item => item.value.id195 == true).value;
      this.arrayForm.find(item => item.pos == pos).disable_op = true;
    }
  }

  preencher_id195(id, id195, pos, data_valida) {
    if (id == null) {
      this.simular(this.aviso_gravar);
    } else {
      var estado = "Registado";
      if (data_valida != null) {
        estado = "Validado";
      }
      if (id195 == null) {
        this.gravarlinha(pos);
        this.router.navigate(['registopara/novo'], { queryParams: { manu: id, estado: estado } });
      } else {
        this.router.navigate(['registopara/view'], { queryParams: { id: id195, estado: estado } });
      }

    }

  }

  concluir() {
    //Não deve permitir concluir uma Manutenção sem que exista pelo menos 1 ficha associada.
    if (this.arrayForm[0].id == null) {
      this.simular(this.aviso_concluir_planeamento2);
    } else {
      var encontrou = false;
      var encontrou_data = false;
      var banho;
      for (var x in this.arrayForm) {
        if (this.arrayForm[x].interva_ope != null) {
          if (this.arrayForm[x].interva_ope.id195 && this.arrayForm[x].id_195 == null) {
            encontrou = true;
          }
        }
        var data = new Date(new Date(this.arrayForm[x].data_pre).toDateString() + " " + this.arrayForm[x].hora_pre);
        var data2 = new Date();
        if (this.admin) { data2 = new Date(new Date(this.data_planeamento).toDateString() + " " + this.hora_planeamento.slice(0, 5)); }
        if (data < data2) {
          encontrou_data = true;
          banho = this.arrayForm[x].pos + " - Banho: " + this.banhos.find(item => item.value.id == this.arrayForm[x].id_banho.id).label;
        }
      }
      if (encontrou) {
        this.simular(this.aviso_concluir_planeamento);
      } else if (encontrou_data) {
        this.globalVar.setMensagem(banho);
        this.simular(this.aviso_concluir_planeamento3);
      } else {
        var hora_p = new Date().toLocaleTimeString().slice(0, 5);
        var data_p = new Date();
        if (this.admin) {
          data_p = new Date(this.data_planeamento);
          hora_p = this.hora_planeamento.slice(0, 5);
        }

        var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
        MOV_MANUTENCAO = this.manutencao_dados;
        MOV_MANUTENCAO.data_ULT_MODIF = new Date();
        MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
        MOV_MANUTENCAO.hora_PLANEAMENTO = hora_p;
        MOV_MANUTENCAO.data_PLANEAMENTO = data_p;
        MOV_MANUTENCAO.estado = "Planeado";
        this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
          this.router.navigate(['manutencaoreposicao']);
          this.simular(this.inputgravou);
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });
      }
    }

  }

  duplicar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {
        this.criarmanu(this.num_manutencao);
        this.simular(this.waitingDialog);
      }
    });
  }

  criarmanu(id) {
    this.data_actual = new Date();
    this.estado = "Em Planeamento";

    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO = response[x][0];
            MOV_MANUTENCAO.id_MANUTENCAO = null;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.hora_PLANEAMENTO = this.hora_planeamento;
            MOV_MANUTENCAO.inativo = false;
            MOV_MANUTENCAO.data_PLANEAMENTO = this.data_actual;
            MOV_MANUTENCAO.data_CRIA = new Date();
            MOV_MANUTENCAO.utz_CRIA = this.user;
            MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
            MOV_MANUTENCAO.impresso = false;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_MODIF = null;
            MOV_MANUTENCAO.utz_ULT_MODIF = null;
            MOV_MANUTENCAO.classif = "R";
            this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
              res => {
                this.criarmanu_cab(id, res.id_MANUTENCAO);
              }, error => {
                console.log(error);
              });

          }
        }
      },
      error => console.log(error));
  }

  criarmanu_cab(id, id_manu_nova) {
    this.id = id_manu_nova;
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO_CAB = response[x][0];
            var id = MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB = null;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO = id_manu_nova;
            MOV_MANUTENCAO_CAB.data_CRIA = new Date(new Date().getTime() + (1000 * parseInt(x)))
            MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
            MOV_MANUTENCAO_CAB.data_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.impresso = false;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.utz_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.data_PREVISTA = null;
            MOV_MANUTENCAO_CAB.hora_PREVISTA = null;
            // MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = null;
            // MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = null;
            // MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            //MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = null;
            // MOV_MANUTENCAO_CAB.obs_PREPARACAO = null;
            //MOV_MANUTENCAO_CAB.id_ANALISE = null;
            MOV_MANUTENCAO_CAB.utz_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.data_PREPARACAO = null;
            MOV_MANUTENCAO_CAB.hora_PREPARACAO = null;
            this.criarmanucac(MOV_MANUTENCAO_CAB, id, count, x);

          }
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);
          this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
        } else {
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);
          this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
        }
      });
  }

  criarmanucac(MOV_MANUTENCAO_CAB, id, total, count) {
    this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
      res => {
        this.criarmanu_lin(id, res.id_MANUTENCAO_CAB, total, count);

      }, error => {
        console.log(error);
      });
  }

  criarmanu_lin(id, id_manu_cab_novo, total, count2) {

    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
            MOV_MANUTENCAO_LINHA = response[x][0];
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_LIN = null;
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id_manu_cab_novo;
            MOV_MANUTENCAO_LINHA.valor1 = null;
            MOV_MANUTENCAO_LINHA.valor2 = null;
            MOV_MANUTENCAO_LINHA.obs_PLANEAMENTO;
            this.creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x);
          }
        } else {
          if (parseInt(total) - 1 == count2) {
            this.simular(this.inputgravou);
            this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
            this.simular(this.waitingDialogclose);
          }
        }
      },
      error => {
        console.log(error); this.simular(this.inputerro);
      });

  }


  creattelin(MOV_MANUTENCAO_LINHA, total, count2, count, x) {
    this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
      res => {
        if (parseInt(total) - 1 == count2 && (count - 1) == parseInt(x)) {
          this.simular(this.inputgravou);
          this.router.navigate(['manutencaoreposicao/editar'], { queryParams: { id: this.id } });
          this.simular(this.waitingDialogclose);
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
  }

  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
          response => {
            for (var x in response) {
              var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
              MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
              MOV_MANUTENCAO_CAB.inativo = true;

              if (response[x][3] != null) {
                this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                  resp => {
                    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                    MOV_REG_PARAM_OPERACAO = resp[0][0];
                    MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                    MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                    MOV_REG_PARAM_OPERACAO.inativo = true;

                    this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                  }, error => {
                    console.log(error); this.simular(this.inputerro);
                  });
              }
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {

              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.data_ANULACAO = new Date();
            MOV_MANUTENCAO.utz_ANULACAO = this.user;
            MOV_MANUTENCAO.inativo = true;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.router.navigate(['manutencaoreposicao']);
              this.simular(this.inputapagar);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          },
          error => console.log(error));

      }
    });
  }

  preparar_linha(pos, id, id_manu) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];
          MOV_MANUTENCAO_CAB.data_PREPARACAO = new Date();
          MOV_MANUTENCAO_CAB.utz_PREPARACAO = this.user;
          MOV_MANUTENCAO_CAB.hora_PREPARACAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_PREPARACAO = this.arrayForm.find(item => item.pos == pos).obs_prep;
          this.arrayForm.find(item => item.pos == pos).preparado = true;
          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].preparado) count++;
            }
            if (tamanho == count) {
              this.estado = "Preparado";
              this.preparado = false;
            } else {
              this.estado = "Em Preparação";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.inicia(id_manu);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });

          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  confirmar_linha(pos, id, id_manu) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];

          MOV_MANUTENCAO_CAB.data_PREPARACAO = new Date();
          MOV_MANUTENCAO_CAB.utz_PREPARACAO = this.user;
          MOV_MANUTENCAO_CAB.hora_PREPARACAO = new Date().toLocaleTimeString().slice(0, 5);

          MOV_MANUTENCAO_CAB.data_EXECUCAO = new Date();
          MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.user;
          MOV_MANUTENCAO_CAB.hora_EXECUCAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
          this.arrayForm.find(item => item.pos == pos).executado = true
          if (this.admin && this.arrayForm.find(item => item.pos == pos).data_exc != null) {
            MOV_MANUTENCAO_CAB.data_EXECUCAO = (this.arrayForm.find(item => item.pos == pos).data_exc == null) ? null : new Date(this.arrayForm.find(item => item.pos == pos).data_exc);
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = this.arrayForm.find(item => item.pos == pos).hora_exc;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.arrayForm.find(item => item.pos == pos).resp_exe_id;
            if (MOV_MANUTENCAO_CAB.hora_EXECUCAO != null) {
              this.arrayForm.find(item => item.pos == pos).executado = true;
            } else {
              this.arrayForm.find(item => item.pos == pos).executado = false;
            }
          }
          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].executado) count++;
            }
            if (tamanho == count) {
              this.estado = "Executado";
            } else {
              this.estado = "Em Execução";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              //this.inicia(id_manu);
              this.gravarlinhasaditivos(response[x][0].id_MANUTENCAO_CAB, pos)
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });

          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  imprimir(relatorio, id) {
    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    MOV_MANUTENCAO = this.manutencao_dados;
    MOV_MANUTENCAO.data_ULT_IMPRES = new Date();
    MOV_MANUTENCAO.utz_ULT_IMPRES = this.user;
    if (relatorio == 'manutencao_etiquetas') {
      this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
    } else if (relatorio != "manutencao_individual") {
      this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
        this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
          response => {
            for (var x in response) {
              var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ULT_IMPRES = new Date();
              MOV_MANUTENCAO_CAB.utz_ULT_IMPRES = this.user;
              MOV_MANUTENCAO_CAB.impresso = true;
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
          },
          error => console.log(error));
      }, error => {
        console.log(error); this.simular(this.inputerro);
      });
    } else {
      this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
        response => {
          for (var x in response) {
            var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB = response[x][0];
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = new Date();
            MOV_MANUTENCAO_CAB.utz_ULT_IMPRES = this.user;
            MOV_MANUTENCAO_CAB.impresso = true;
            this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
              this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          }
        },
        error => console.log(error));
    }

  }


  imprimiretiquetas(relatorio, id) {
    this.filename = new Date().toLocaleString().replace(/\D/g, '');
    this.RelatoriosService.downloadPDF("pdf", this.filename, id, relatorio).subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        //this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);

        this.GERPOSTOSService.getByIp(this.getCookie("IP_CLIENT")).subscribe(
          (res) => {
            var count = Object.keys(res).length;
            if (count > 0) {
              this.UploadService.imprimir(this.filename, res[0].impressora).subscribe(
                response => {
                  //console.log(response)
                  //console.log(response._body)
                  this.simular(this.enviadoparaimpressora);
                }, error => {
                  //console.log(error.status);
                  this.simular(this.erroimprimir);
                  console.log(error._body);
                });

            } else {
              var iframe;
              if (!iframe) {
                iframe = document.createElement('iframe');
                document.body.appendChild(iframe);

                iframe.style.display = 'none';
                iframe.onload = function () {
                  setTimeout(function () {
                    iframe.focus();
                    iframe.contentWindow.print();
                  }, 1);
                };
              }
              iframe.src = this.fileURL;
            }
          }, error => console.log(error));
      }
    );
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  //preenche tabela das análises
  preencheanalises(idbanho) {
    this.pesquisa_analise = [];
    var d = new Date(this.datapl);
    d.setDate(d.getDate() - 5);
    this.ABMOVANALISEService.getAllmanu(idbanho, d).subscribe(
      response => {
        for (var x in response) {
          var cor = "";
          if (response[x][0].cor_LIMITES == "vermelho") {
            cor = "rgba(239, 19, 19, 0.58)";
          } else if (response[x][0].cor_LIMITES == "amarelo") {
            cor = "rgba(255, 255, 0, 0.62)";
          } else {
            cor = "none";
          }

          this.pesquisa_analise.push({ cor_banho: cor, id: response[x][0].id_ANALISE, linha: response[x][0].id_LINHA, data: this.formatDate(response[x][0].data_ANALISE), nome: response[x][2].nome_BANHO, tina: response[x][3].cod_TINA, cor: response[x][1].cor });
        }
        this.pesquisa_analise = this.pesquisa_analise.slice();
      },
      error => console.log(error));
  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  //apaga cod analise
  limpar(pos) {
    this.arrayForm.find(item => item.pos == pos).cod_analise = null;
    this.arrayForm.find(item => item.pos == pos).nome_analise = null;
  }

  alteracorlinha(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
    }
  }

  preenchedados(val = false, id = null) {
    //preenche combobox unidades
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {

        this.medidas = [];
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
        this.preenchelinhas(val, id);
      },
      error => console.log(error));
  }

  preenchelinhas(val, id) {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        this.linhas = this.linhas.slice();
        this.preenchetipo_man(val, id);
      },
      error => console.log(error));
  }

  preenchetipo_man(val, id) {
    //preenche combobox Tipo Manutenção
    this.ABDICTIPOMANUTENCAOService.getAll(["R"]).subscribe(
      response => {
        this.tipo_manu = [];
        this.tipo_manu.push({ label: "Sel. Tipo Manutenção", value: "" });
        for (var x in response) {
          this.tipo_manu.push({ label: response[x].nome_TIPO_MANUTENCAO, value: response[x].id_TIPO_MANUTENCAO });
        }
        this.tipo_manu = this.tipo_manu.slice();
        this.preencheTurno(val, id);
      },
      error => console.log(error));
  }


  preencheTurno(val, id) {
    //preenche combobox Turno
    this.ABDICTURNOService.getAll().subscribe(
      response => {
        this.turno = [];
        this.turno.push({ label: "Sel. Turno", value: "" });
        for (var x in response) {
          this.turno.push({ label: response[x].nome_TURNO, value: response[x].id_TURNO });
        }
        this.turno = this.turno.slice();
        this.preencheAdicao(val, id);
      },
      error => console.log(error));
  }
  preencheAdicao(val, id) {
    //preenche combobox Tipo Adição
    this.ABDICTIPOADICAOService.getAll(["R"]).subscribe(
      response => {
        this.tipo_adicao = [];
        //this.tipo_adicao.push({ label: "Sel. Tipo Adição", value: "" });
        for (var x in response) {
          this.tipo_adicao.push({ label: response[x].nome_TIPO_ADICAO, value: { id: response[x].id_TIPO_ADICAO, id195: response[x].id_TIPO_OPERACAO } });
        }
        this.tipo_adicao = this.tipo_adicao.slice();
        this.preencheIntervalo(val, id);
      },
      error => console.log(error));
  }
  preencheIntervalo(val, id) {
    //preenche combobox Intervalo Oper.
    this.ABDICTIPOOPERACAOService.getAll(["R"]).subscribe(
      response => {
        this.intervalo_op = [];
        // this.intervalo_op.push({ label: "Sel. Intervalo Oper.", value: "" });
        for (var x in response) {
          this.intervalo_op.push({ label: response[x].nome_TIPO_OPERACAO, value: { id: response[x].id_TIPO_OPERACAO, id195: response[x].id195 } });
        }
        this.intervalo_op = this.intervalo_op.slice();
        this.preenchettz(val, id);
      },
      error => console.log(error));
  }

  preenchettz(val, id) {
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.utilizadores = [];
        for (var x in response) {
          this.utilizadores.push({ label: response[x].id_UTILIZADOR + ' - ' + response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR });
        }
        this.utilizadores = this.utilizadores.slice();
        if (val) this.inicia(id)
      },
      error => console.log(error));
  }

  historico(id) {
    this.router.navigate(['manutencaoreposicao/historico'], { queryParams: { id: id, classif: 'R' } });
  }
}
