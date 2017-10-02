import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-eventoslista',
  templateUrl: './eventoslista.component.html',
  styleUrls: ['./eventoslista.component.css']
})
export class EventoslistaComponent implements OnInit {
  cols: any[];
  @ViewChild(DataTable) dataTableComponent: DataTable;

  constructor(private globalVar: AppGlobals, private router: Router) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(true);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013apagar"));

    this.preenche_tabela();
  }

  preenche_tabela() {
    this.cols = [{ id: 1, nome: "TESTE", num: "0022",momento:"Ao Gravar",estado:"Ativo" }];
    /*this.GERFORNECEDORService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ id: response[x].id_FORNECEDOR, nome: response[x].nome_FORNECEDOR, num: response[x].num_FORNECEDOR });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));*/
  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['eventos/view'], { queryParams: { id: event.data.id } });
  }

  //limpar filtro
  reset() {
    for (var x in this.dataTableComponent.filters) {
      this.dataTableComponent.filters[x].value = "";
    };
    this.dataTableComponent.filter("", "", "");
  }

  atualizar() {
    this.preenche_tabela();
  }
}
