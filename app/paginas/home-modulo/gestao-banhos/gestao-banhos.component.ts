import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { ABDICBANHOService } from 'app/servicos/ab-dic-banho.service';
import { ABDICBANHOCOMPONENTEService } from 'app/servicos/ab-dic-banho-componente.service';
import { ABDICBANHOADITIVOService } from 'app/servicos/ab-dic-banho-aditivo.service';
import { ABMOVMANUTENCAOLINHAService } from 'app/servicos/ab-mov-manutencao-linha.service';

@Component({
  selector: 'app-gestao-banhos',
  templateUrl: './gestao-banhos.component.html',
  styleUrls: ['./gestao-banhos.component.css']
})
export class GestaoBanhosComponent implements OnInit {
  data_fim: any;
  data_ini;
  corpo_manu: any;
  width: number;
  cabecalho_manutencao: any = [];
  banhos: any[];
  cor_linha: any;
  linhas: any[];
  options;
  datasetsgraf = [];
  labelgraf = [];
  labelgraf_manu = [];
  datasetsgraf_manu = [];
  data1 = {};
  data_manu = {};
  id: any = 63;
  total_rows = 0;
  codigo_analise: number;
  data_analise: string;
  linha;
  banho: string;
  tina: string;
  num_items = 14;
  inicio = 0;
  rows_show = 0;
  location: Location;

  corpo: any = [];
  cabecalho: any = [];

  constructor(private router: Router, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABDICBANHOADITIVOService: ABDICBANHOADITIVOService, private ABDICBANHOCOMPONENTEService: ABDICBANHOCOMPONENTEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, location: Location, private route: ActivatedRoute, private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService, private globalVar: AppGlobals) { this.location = location; }


  ngOnInit() {
    this.width = 100 / (this.num_items + 1);
    this.data_fim = new Date();
    this.data_ini = new Date(new Date().getFullYear(), 0, 1);

    /*if(!acessohistorico){
      this.location.back();
    }
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || 0;
      });
    if (id != 0) {
      this.carregadados();
    } else {
      this.location.back();
    }*/
    this.preenche_banhos_combo(0);

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: { id: null } });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) {
          this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        }
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));


    this.carregadados();
  }

  carregadados() {
    this.corpo = [];
    this.corpo_manu = [];
    this.cabecalho = [];
    this.cabecalho_manutencao = [];
    this.labelgraf = [];
    this.labelgraf_manu = [];
    this.datasetsgraf = [];
    this.datasetsgraf_manu = [];
    this.data1 = [];
    this.data_manu = [];




    this.linha = 1;
    this.tina = "teste";
    this.banho = "banho";
    //this.labelgraf.push(this.data_analise);

    this.analises(5, this.inicio, this.num_items);


  }

  preenche_banhos(event) {
    if (event.value.id != null) {
      this.cor_linha = event.value.cor;
      this.preenche_banhos_combo(event.value.id);
    }
  }

  atualizar() {
    this.carregadados();
  }

  analises(id_banho, inicio, fim) {

    var date2 = new Date(this.data_ini).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");;
    var date = new Date(this.data_fim).toLocaleDateString().replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");

    if (isNaN(new Date(this.data_ini).getDate()) || date2 == '1970-01-01') date2 = null;
    if (isNaN(new Date(this.data_fim).getDate()) || date == '1970-01-01') date = null;

    var data = [{ date1: (date) ? date : null, date2: (date2) ? date2 : null }]
    this.ABMOVANALISEService.getbyid_banho_comp(id_banho, inicio, fim, data).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          this.total_rows = response[0][6];

          this.rows_show = (this.inicio + this.num_items <= this.total_rows) ? this.inicio + this.num_items : this.total_rows;
          for (var x in response) {

            if (response[x][0] != null) {
              var data = this.formatDate(response[x][2]);
              this.labelgraf.push(data);
              this.cabecalho.push({ id: response[x][0], data: data, hora: (response[x][3]).slice(0, 5), dia: days[new Date(response[x][2]).getDay()] });
            } else {
              this.cabecalho.push({ dia: "---" });
            }

            if (response[x][1] != null) {
              var data = this.formatDate(response[x][4]);
              this.labelgraf_manu.push(data);
              this.cabecalho_manutencao.push({ id: response[x][1], id_manu: response[x][7], data: data, hora: new Date(response[x][4]).toLocaleTimeString(), dia: days[new Date(response[x][4]).getDay()] });
            } else {
              this.cabecalho_manutencao.push({ dia: "---" });
            }
          }
          this.componentes(id_banho, true);
          this.aditivos(id_banho, true);
        } else {
          this.componentes(id_banho, false);
          this.aditivos(id_banho, false);
        }
      },
      error => { console.log(error); });
  }

  componentes(id_banho, graf) {
    this.ABDICBANHOCOMPONENTEService.getbyid_banho(id_banho).subscribe(
      response => {

        var count = Object.keys(response).length;
        //se existir componentes do banho

        if (count > 0) {
          var id_comp = [];
          this.datasetsgraf.push({
            label: "Todos", data: [], fill: false, borderColor: [
              '#black'
            ],
            borderWidth: 2
          });
          for (var x in response) {
            id_comp.push(response[x][1].id_COMPONENTE)

            var calculo = (response[x][0].calculo != null) ? response[x][0].calculo.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '') : "";
            var calculo3 = (response[x][0].calculo != null) ? response[x][0].calculo.toFixed(3) : null;
            var dados = [];
            var dados2 = [];
            dados2.push(calculo3);
            for (var y in this.cabecalho) {
              dados.push({ valor: "", cor: "" });
              dados2.push(null);
            }
            var cor = this.verificalimites(response[x][0].calculo, response[x][2], response[x][3], response[x][4], response[x][5]);
            this.corpo.push({ cor: cor, id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE, resultado: calculo, valores: dados })
            this.datasetsgraf.push({ id: response[x][1].id_COMPONENTE, label: response[x][1].nome_COMPONENTE, data: dados2, fill: false, borderColor: this.getRandomColor(x), borderWidth: 2 });
          }

          for (var y in this.cabecalho) {
            this.getresultados(this.cabecalho[y].id, id_comp, id_banho, y);
          }
          if (!graf) this.carregagraficos();
        }

      },
      error => { console.log(error); });

  }

  aditivos(id_banho, graf) {

    this.ABDICBANHOADITIVOService.getbyID_banho(id_banho).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir aditivos do banho

        if (count > 0) {
          var id_aditiv = [];
          this.datasetsgraf_manu.push({
            label: "Todos", data: [], fill: false, borderColor: [
              '#black'
            ],
            borderWidth: 2
          });
          for (var x in response) {
            id_aditiv.push(response[x][1].id_COMPONENTE)

            var calculo = (response[x][0].valor1 != null) ? (response[x][0].valor1 != null) ? parseFloat(response[x][0].valor1).toFixed(2) : null : "";
            var dados = [];
            var dados2 = [];
            dados2.push(calculo);
            for (var y in this.cabecalho_manutencao) {
              dados.push({ valor: "" });
              dados2.push(null);
            }
            this.corpo_manu.push({ id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE + ' (' + response[x][2] + ')', resultado: calculo, valores: dados })
            this.datasetsgraf_manu.push({ id: response[x][1].id_COMPONENTE, label: response[x][1].nome_COMPONENTE + ' (' + response[x][2] + ')', data: dados2, fill: false, borderColor: this.getRandomColor(x), borderWidth: 2 });
          }

          for (var y in this.cabecalho_manutencao) {
            this.getresultados_manu(this.cabecalho_manutencao[y].id, id_aditiv, id_banho, y);
          }
          if (!graf) this.carregagraficos_manu();
        }

      },
      error => { console.log(error); });

  }

  getresultados(id, id_comp, id_banho, count) {

    if (id) {
      this.ABMOVANALISELINHAService.getbyid_analise_comp(id, id_comp, id_banho).subscribe(
        response => {

          for (var x in response) {
            var index_comp = null;
            var index_analise = null;
            var index_datasetsgraf = null;
            index_comp = this.corpo.find(item => item.id == response[x][0].id_COMPONENTE);
            index_analise = this.cabecalho.findIndex(item => item.id == response[x][0].id_ANALISE);
            index_datasetsgraf = this.datasetsgraf.find(item => item.id == response[x][0].id_COMPONENTE)
            //console.log(response)
            if (index_comp != null && index_analise != null) {
              index_comp.valores[index_analise].valor = (response[x][0].calculo != null) ? response[x][0].calculo.toLocaleString(undefined, { minimumFractionDigits: 3 }).replace(/\s/g, '') : "";
              index_comp.valores[index_analise].cor = this.verificalimites(response[x][0].calculo, response[x][1], response[x][2], response[x][3], response[x][4]);
              var calculo3 = (response[x][0].calculo != null) ? response[x][0].calculo.toFixed(3) : null;

              index_datasetsgraf.data[index_analise + 1] = calculo3
            }

          }

          if ((parseInt(count) + 1) == this.cabecalho.length) this.carregagraficos();

        },
        error => { console.log(error); });
    } else {
      if ((parseInt(count) + 1) == this.cabecalho.length) this.carregagraficos();
    }
  }

  getresultados_manu(id, id_aditiv, id_banho, count) {
    if (id) {
      this.ABMOVMANUTENCAOLINHAService.getbyID_comp(id, id_aditiv).subscribe(
        response => {
          for (var x in response) {
            var index_comp = null;
            var index_manutencao = null;
            var index_datasetsgraf = null;
            index_comp = this.corpo_manu.find(item => item.id == response[x].id_ADITIVO);
            index_manutencao = this.cabecalho_manutencao.findIndex(item => item.id == response[x].id_MANUTENCAO_CAB);
            index_datasetsgraf = this.datasetsgraf_manu.find(item => item.id == response[x].id_ADITIVO)
            //console.log(response)
            if (index_comp != null && index_manutencao != null) {
              index_comp.valores[index_manutencao].valor = (response[x].valor1 != null) ? parseFloat(response[x].valor1).toFixed(2) : null;
              var calculo3 = (response[x].valor1 != null) ? parseFloat(response[x].valor1).toFixed(2) : null;

              index_datasetsgraf.data[index_manutencao + 1] = calculo3
            }

          }
          if ((parseInt(count) + 1) == this.cabecalho_manutencao.length) this.carregagraficos_manu();

        },
        error => { console.log(error); });
    } else {
      if ((parseInt(count) + 1) == this.cabecalho_manutencao.length) this.carregagraficos_manu();
    }
  }

  anterior() {
    this.inicio = this.inicio - this.num_items;
    if (this.inicio < 0) {
      this.inicio = 0;
    } else if (this.inicio >= 0) {
      this.carregadados();
    }
  }

  seguinte() {
    var temp = this.inicio + this.num_items;
    if (temp <= this.total_rows) {
      this.inicio = this.inicio + this.num_items;
      this.carregadados();
    }
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


  //Conforme em cada Linha de cada componente seja registado o Resultado e saia do campo, este deve passar a uma cor
  verificalimites(valor, limite_AMARELO_INF, limite_AMARELO_SUP, limite_VERDE_INF, limite_VERDE_SUP) {
    //console.log(limite_AMARELO_INF + '/' + limite_AMARELO_SUP + '/' + limite_VERDE_INF + '/' + limite_VERDE_SUP)

    if (valor != null) {
      valor = valor.toLocaleString().replace(",", ".");
    }
    if (valor == null || valor == "" || (limite_AMARELO_INF == null && limite_AMARELO_SUP == null && limite_VERDE_INF == null && limite_VERDE_SUP == null)) {
      return "none";
    }
    //Verde (se o valor está entre os valores definidos para o limite inferior e superior definido); 
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      return "verde";
    }
    else if (valor >= limite_VERDE_INF && valor <= limite_VERDE_SUP) {
      return "verde";
    } else if ((valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP) && (limite_AMARELO_INF == null || limite_AMARELO_SUP == null)) {
      return "none";
    }
    //Amarelo (se o valor estiver entre o intervalo dos limites inferiores e superiores mas fora dos limites verdes
    else if (valor >= limite_AMARELO_INF && valor <= limite_AMARELO_SUP && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      return "amarelo";
    }

    //Vermelho (se estiver fora dos intervalos Verde e Amarelo)
    else if ((valor <= limite_AMARELO_INF || valor >= limite_AMARELO_SUP) && (valor <= limite_VERDE_INF || valor >= limite_VERDE_SUP)) {
      return "vermelho";
    } else {
      return "none";
    }
  }

  carregagraficos() {
    this.data1 = {
      labels: this.labelgraf,
      datasets: this.datasetsgraf
    };

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }, legend: {
        labels: {
          fontColor: "black"
        }
      },
    }
  }


  carregagraficos_manu() {
    this.data_manu = {
      labels: this.labelgraf_manu,
      datasets: this.datasetsgraf_manu
    };

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }, legend: {
        labels: {
          fontColor: "black"
        }
      },
    }
  }

  //criar cores 
  getRandomColor(i) {
    var colors = ["blue", "green", "red", "yellow", "orange", "violet", "indigo", "olive", "pink", "#B22222", "#4682B4", "#708090", "#A0522D", "#800080", "#6B8E23", "#66CDAA", "#ADFF2F"];
    var n = i % colors.length
    return colors[n];
  }

  //preenche combobox banhos
  preenche_banhos_combo(linha) {
    this.banhos = [];
    //preenche combobox banhos
    ///if (this.linha != null) linha = this.linha;
    this.ABDICBANHOService.getAllLINHAbylinha(linha).subscribe(
      response => {
        this.banhos.push({ label: 'Seleccione Banho', value: "" });
        for (var x in response) {
          this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, id_tina: response[x][2].id_TINA, nome_tina: response[x][2].cod_TINA, capacidade: response[x][2].capacidade } });
        }
        this.banhos = this.banhos.slice();
      },
      error => console.log(error));
  }

  IrPara(pagina, id) {
    if (pagina == "analise") {
      this.router.navigate(['registo/view'], { queryParams: { id: id } });
    } else {
      this.router.navigate(['manutencao/view'], { queryParams: { id: id } });
    }
  }
}
