import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  cols: any[];
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Todos", value: "" }, { label: "Ativo", value: true }, { label: "Inativo", value: false }];

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
    this.globalVar.sethistorico(false);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013apagar"));

    this.preenche_tabela();
  }

  preenche_tabela() {
    this.cols = [];

    this.cols.push({ id: 1, monome: "Listagem de Guias de Remessa" });

  }
  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['analises/view'], { queryParams: { id: event.data.id } });
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

  //filtro coluna linha
  filtrar(value, coluna) {

    this.dataTableComponent.filter(value.toString(), coluna, 'contains');

    /*this.globalVar.setfiltros("eventos", this.dataTableComponent.filters);
    var ids = [];
    for (var x in this.dataTableComponent.dataToRender) {
      ids.push(this.dataTableComponent.dataToRender[x].id);
    }
    this.globalVar.setfiltros("eventoss_id", ids);*/
  }

}
