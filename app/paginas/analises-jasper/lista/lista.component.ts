import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable, ConfirmationService } from 'primeng/primeng';

import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { GridOptions } from 'ag-grid';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';
import { RegistoProducao } from 'app/servicos/registoproducao.service';
import { GERVISTASService } from 'app/servicos/ger-vistas.service';
import { GER_VISTAS } from 'app/entidades/GER_VISTAS';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  page_size;
  novo: boolean;
  texto_vista: any;
  displayVista: boolean;
  num_vista: any;
  user: number;
  array = [];
  columdefeito: any[];
  familias: any[] = [];
  public gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;
  public ultimodisable = false;
  selectedCars1: string[] = [];
  paginasize = [{ label: '10', value: '10' }, { label: '100', value: '100' }, { label: '500', value: '500' }, { label: 'Todos', value: 'todos' }]
  config = [];

  // public dateComponentFramework: DateComponent;
  public HeaderGroupComponent = this.HeaderGroupComponent;


  constructor(private renderer: Renderer, private confirmationService: ConfirmationService, private GERVISTASService: GERVISTASService, private RegistoProducao: RegistoProducao, private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService) {

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.RegistoProducao.getAllfam().subscribe(
      response => {
        //console.log(response)
        for (var x in response) {
          this.familias.push({ label: response[x], value: response[x] })
          //this.selectedCars1.push(response[x])
        }

        this.createRowData();
      },
      error => console.log(error));


    this.GERVISTASService.getAll().subscribe(
      response => {
        //console.log(response)
        this.config.push({ label: 'Sel. Vista', value: 0 });
        this.num_vista = 0;

        for (var x in response) {
          this.config.push({ label: response[x].descricao, value: response[x].id })
          this.array.push({
            id: response[x].id, descricao: response[x].descricao,
            colState: JSON.parse(response[x].colstate), sortState: JSON.parse(response[x].sortstate),
            groupState: JSON.parse(response[x].groupstate), filterState: JSON.parse(response[x].filterstate)
          });

        }

        this.createRowData();
      },
      error => console.log(error));

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: null,
      enableSorting: true,
      enableFilter: true,
      animateRows: true,
      paginationPageSize: 10,
      suppressPaginationPanel: true,
      isExternalFilterPresent: isExternalFilterPresent,
      doesExternalFilterPass: doesExternalFilterPass,
      rowGroupPanelShow: 'always',
      localeText: {
        // for filter panel
        page: 'Página',
        more: 'mais',
        to: 'para',
        of: 'de',
        next: 'Seguinte',
        last: 'Último',
        first: 'Primeiro',
        previous: 'Anterior',
        loadingOoo: 'A carregar...',
        // for set filter
        selectAll: 'Seleccionar tudo',
        searchOoo: 'Pesquisar...',
        blanks: 'espaços em branco',
        // for number filter and text filter
        filterOoo: 'Filtrar...',
        applyFilter: 'Aplicar Filtro...',
        // for number filter
        equals: 'É igual a',
        notEqual: 'Não é igual a',
        lessThanOrEqual: 'Menor ou igual',
        greaterThanOrEqual: 'Maior ou igual',
        inRange: 'No alcance',
        lessThan: 'Menor que',
        greaterThan: 'Maior que',
        // for text filter
        contains: 'Contém',
        notContains: 'Não Contém',
        startsWith: 'Começa com',
        endsWith: 'Termina com',
        // the header of the default group column
        group: 'Crupo',
        // tool panel
        columns: 'Colunas',
        rowGroupColumns: 'Pivot Cols',
        rowGroupColumnsEmptyMessage: 'Arraste colunas para agrupar',
        valueColumns: 'Coluna dos Valores',
        pivotMode: 'Pivot-Mode',
        groups: 'Grupos',
        values: 'Valores',
        pivots: 'Pivots',
        valueColumnsEmptyMessage: 'Arraste cols para agregar',
        pivotColumnsEmptyMessage: 'Arraste para aqui para girar.',
        // other
        noRowsToShow: 'Sem linhas',
        // enterprise menu
        pinColumn: 'Fixar Coluna',
        valueAggregation: 'Agregar Valores',
        autosizeThiscolumn: 'Tamanho automático',
        autosizeAllColumns: 'Tamanho automático em todas as colunas',
        groupBy: 'Agrupar por',
        ungroupBy: 'Desagrupar por',
        resetColumns: 'Repor as colunas',
        expandAll: 'Expandir tudo',
        collapseAll: 'Fechar tudo',
        toolPanel: 'Painel de Ferramentas',
        export: 'Exportar',
        csvExport: 'CSV Export',
        excelExport: 'Excel Export',
        // enterprise menu pinning
        pinLeft: 'Fixar Esquerda',
        pinRight: 'Fixar Direita',
        noPin: 'Não Fixar',
        // enterprise menu aggregation and status panel
        sum: 'Soma',
        min: 'Menor',
        max: 'Maior',
        none: 'Nenhum',
        count: 'Contagem',
        average: 'Média',
        avg: 'Média',
        // standard menu
        copy: 'Copiar',
        copyWithHeaders: 'Copiar com Cabeçalhos',
        ctrlC: 'ctrl + C',
        paste: 'Colar',
        ctrlV: 'ctrl + V'
      }


    };

    //this.createColumnDefs();
    this.showGrid = true;
    //this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }
  }

  onPaginationChanged() {
    if (this.gridOptions.api) {
      setText("#lbCurrentPage", this.gridOptions.api.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridOptions.api.paginationGetTotalPages());
      this.setLastButtonDisabled(!this.gridOptions.api.paginationIsLastPageFound());
    }
  }

  setLastButtonDisabled(disabled) {
    this.ultimodisable = disabled;
  }

  analises() {
    this.columnDefs.push({
      headerName: "Tipo", field: "tipo", width: 120, enableValue: true, filter: 'text', enableRowGroup: true, enablePivot: true, cellStyle: function (params) {
        if (params.value == 'COMP') {
          return { backgroundColor: 'red' };
        } else if(params.value == 'PF')  {
          return { backgroundColor: 'green' };
        }
      }
    });
    this.columnDefs.push({ headerName: "OF", field: "num_of", width: 120, enableValue: true, filter: 'text', enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({
      headerName: "Data", field: "data", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true, comparator: dateComparator, filter: 'date', filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    });
    this.columnDefs.push({ headerName: "Utilizadores", field: "utilizador", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "Componentes", field: "componente", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columnDefs.push({ headerName: "Etiqueta", field: "etiqueta", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true });
    this.columdefeito = []
    var count = 0;
    for (var n in this.selectedCars1) {
      count++;
      this.columnfam(count, this.selectedCars1[n]);
    }

  }

  columnfam(count, fam) {
    this.RegistoProducao.getFam([fam]).subscribe(
      res => {
        var column = { headerName: "FAM " + fam, suppressMenu: true, field: "defeito", children: [] };
        for (var x in res) {
          column.children.push({ id: res[x], headerName: res[x], field: res[x], width: 120, enableValue: true, enableRowGroup: true, enablePivot: true })
          this.columdefeito.push(res[x]);
        }
        this.columnDefs.push(column);
        this.columnDefs = this.columnDefs.slice();

        if (count == this.selectedCars1.length) {
          this.componentes(55, 5, true, this.selectedCars1);
        }
      },
      error => console.log(error));
  }



  componentes(id, id_banho, graf, fam) {

    this.RegistoProducao.getAll(fam).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total > 0) {
          //console.log(response)
          for (var y in response) {

            var rowData = [];
            rowData['id'] = response[y][1];
            rowData['tipo'] = (response[y][2] == null) ? "PF" : "COMP";
            rowData['componente'] = response[y][8];
            rowData['utilizador'] = response[y][7];
            rowData['num_of'] = (response[y][0] == null) ? response[y][3] : response[y][0];
            rowData['data'] = new Date(response[y][10]).toLocaleDateString();
            rowData['etiqueta'] = response[y][6];
            var count = 11;
            for (var x in this.columdefeito) {
              rowData[this.columdefeito[x]] = (response[y][count] == null) ? 0 : response[y][count];
              count++;
            }
            this.rowData.push(rowData);
          }


          this.rowData = this.rowData.slice();
        }

      },
      error => { console.log(error); });

  }

  remover() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Eliminar?',
      header: 'Eliminar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.GERVISTASService.delete(this.num_vista).then(result => {
          var index = this.config.findIndex(item => item.value == this.num_vista);
          if (index > -1) {
            this.config.splice(index, 1);
          }
          this.displayVista = false;
          this.num_vista = 0;
        }, error => {
          console.log(error); /*this.simular(this.inputerro);*/
        });
      }
    });
  }

  gravarState() {
    this.novo = false;
    if (this.num_vista != 0) {
      this.saveState();
    }
  }

  editState() {
    this.novo = false;
    this.texto_vista = this.config.find(item => item.value == this.num_vista).label;
    if (this.num_vista != 0) {
      this.displayVista = true;
    }
  }

  newState() {
    this.novo = true;
    this.texto_vista = "";
    this.displayVista = true;
  }

  saveState() {

    if (!this.novo) {

      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Alterar?',
        header: 'Alterar Confirmação',
        icon: 'fa fa-save',
        accept: () => {
          var vistas = new GER_VISTAS;
          vistas.id_UTZ = this.user;
          vistas.id = this.num_vista;
          vistas.colstate = JSON.stringify(this.gridOptions.columnApi.getColumnState());
          vistas.groupstate = JSON.stringify(this.gridOptions.columnApi.getColumnGroupState());
          vistas.sortstate = JSON.stringify(this.gridOptions.api.getSortModel());
          vistas.filterstate = JSON.stringify(this.gridOptions.api.getFilterModel());
          vistas.descricao = this.texto_vista;
          this.GERVISTASService.update(vistas).then(result => {
            var array = this.array.find(item => item.id == this.num_vista);
            this.config.find(item => item.value == this.num_vista).label = this.texto_vista;

            if (array) {
              array.colState = JSON.parse(vistas.colstate);
              array.groupState = JSON.parse(vistas.groupstate);
              array.sortState = JSON.parse(vistas.sortstate);
              array.filterState = JSON.parse(vistas.filterstate);
              array.descricao = vistas.descricao;
            }
            this.displayVista = false;

          }, error => {
            console.log(error); /*this.simular(this.inputerro);*/
          });
        }
      });

    } else {
      this.confirmationService.confirm({
        message: 'Tem a certeza que pretende Gravar?',
        header: 'Gravar Confirmação',
        icon: 'fa fa-save',
        accept: () => {
          //this.displayVista = true;
          this.gravarVista();
        }
      });
    }


  }

  gravarVista() {
    var vistas = new GER_VISTAS;
    vistas.id_UTZ = this.user;
    vistas.colstate = JSON.stringify(this.gridOptions.columnApi.getColumnState());
    vistas.groupstate = JSON.stringify(this.gridOptions.columnApi.getColumnGroupState());
    vistas.sortstate = JSON.stringify(this.gridOptions.api.getSortModel());
    vistas.filterstate = JSON.stringify(this.gridOptions.api.getFilterModel());
    vistas.descricao = this.texto_vista;
    this.GERVISTASService.create(vistas).subscribe(result => {

      this.array.push({
        id: result.id, descricao: result.descricao,
        colState: JSON.parse(result.colstate), sortState: JSON.parse(result.sortstate),
        groupState: JSON.parse(result.groupstate), filterState: JSON.parse(result.filterstate)
      });
      this.config.push({ label: result.descricao, value: result.id })
      this.num_vista = result.id;
      this.displayVista = false;

    }, error => {
      console.log(error); /*this.simular(this.inputerro);*/
    });
  }

  restoreState() {
    var array = this.array.find(item => item.id == this.num_vista);
    if (array) {
      this.gridOptions.columnApi.setColumnState(array.colState);
      this.gridOptions.columnApi.setColumnGroupState(array.groupState);
      this.gridOptions.api.setSortModel(array.sortState);
      this.gridOptions.api.setFilterModel(array.filterState);
    }
  }

  resetState() {
    this.gridOptions.columnApi.resetColumnState();
    this.gridOptions.columnApi.resetColumnGroupState();
    this.gridOptions.api.setSortModel(null);
    this.gridOptions.api.setFilterModel(null);
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  onPageSizeChanged(value) {
    var valor = value.value
    if (valor == 'todos') valor = this.rowData.length;
    this.gridOptions.api.paginationSetPageSize(Number(valor));
  }

  configuracoes(event) {
    this.texto_vista = this.config.find(item => item.value == this.num_vista).label;
    if (this.num_vista != 0) {
      var array = this.array.find(item => item.id == this.num_vista);
      if (array) {
        this.gridOptions.columnApi.setColumnState(array.colState);
        this.gridOptions.columnApi.setColumnGroupState(array.groupState);
        this.gridOptions.api.setSortModel(array.sortState);
        this.gridOptions.api.setFilterModel(array.filterState);
      }
    } else {
      this.resetState();
    }
  }

  onBtFirst() {
    this.gridOptions.api.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridOptions.api.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridOptions.api.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridOptions.api.paginationGoToPreviousPage();
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

  private createRowData() {
    var rowData: any[] = [];
    this.rowData = [];
    this.columnDefs = [];
    this.analises();
  }

  private calculateRowCount() {
    if (this.page_size == 'todos') this.gridOptions.api.paginationSetPageSize(Number(this.rowData.length));

    if (this.gridOptions.api && this.rowData) {
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  private onModelUpdated() {
    //console.log('onModelUpdated');
    this.calculateRowCount();
  }

  public onReady() {
    // console.log('onReady');
    this.calculateRowCount();
  }

  private onCellClicked($event) {
    //console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event) {
    //console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event) {
    // console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event) {
    // console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event) {
    // console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
  }

  private onRowSelected($event) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onSelectionChanged() {
    //console.log('selectionChanged');
  }

  private onBeforeFilterChanged() {
    //console.log('beforeFilterChanged');
  }

  private onAfterFilterChanged() {
    //console.log('afterFilterChanged');
  }

  private onFilterModified() {
    // console.log('onFilterModified');
  }

  private onBeforeSortChanged() {
    // console.log('onBeforeSortChanged');
  }

  private onAfterSortChanged() {
    // console.log('onAfterSortChanged');
  }

  private onVirtualRowRemoved($event) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked(event) {
    //console.log(this.gridOptions.columnApi.getRowGroupColumns());
  }

  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    // console.log('onColumnEvent: ' + $event);
  }

}

/*function skillsCellRenderer(params) {
  var data = params.data;
  var skills = [];
 /* RefData.IT_SKILLS.forEach(function (skill) {
      if (data && data.skills && data.skills[skill]) {
          skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
      
  });
  return} skills.join(' ');
}*/

function countryCellRenderer(params) {
  /*var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;*/
}

function createRandomPhoneNumber() {
  var result = '+';
  for (var i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}

var ageType = 'everyone';

function isExternalFilterPresent() {
  // if ageType is not everyone, then we are filtering
  return ageType != 'everyone';
}

function doesExternalFilterPass(node) {
  switch (ageType) {
    case 'below30': return node.data.age < 30;
    case 'between30and50': return node.data.age >= 30 && node.data.age <= 50;
    case 'above50': return node.data.age > 50;
    case 'dateAfter2008': return asDate(node.data.date) > new Date(2008, 1, 1);
    default: return true;
  }
}

function asDate(dateAsString) {
  var splitFields = dateAsString.split("/");
  return new Date(splitFields[2], splitFields[1], splitFields[0]);
}

function externalFilterChanged(newValue) {
  ageType = newValue;
  this.gridOptions.api.onFilterChanged();
}

function dateComparator(date1, date2) {
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}
// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = (yearNumber * 10000) + (monthNumber * 100) + dayNumber;
  return result;
}

function setText(selector, text) {
  if (document.querySelector(selector) != null) {
    document.querySelector(selector).innerHTML = text;
  }

}




