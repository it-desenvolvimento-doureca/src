import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';

import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { GridOptions } from 'ag-grid';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  private gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;
  // public dateComponentFramework: DateComponent;
  public HeaderGroupComponent = this.HeaderGroupComponent;


  constructor(private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService) {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: null,
      enableSorting: true,
      enableFilter: true,
      rowGroupPanelShow: 'always'
    };

    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
    //this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }
  }



  analises() {
    this.ABMOVANALISEService.getbyid_banho(5, 0, 30, 55).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

          this.columnDefs.push({ headerName: "Componentes", field: "componente", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true })
          this.columnDefs.push({ headerName: "Utilizadores", field: "utilizador", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true })
          for (var x in response) {
            var data = this.formatDate(response[x][1]);
            this.columnDefs.push({ id: response[x][0], headerName: data, field: "c" + response[x][0], width: 120, enableValue: true, enableRowGroup: true, enablePivot: true })

            //this.cabecalho.push({ id: response[x][0], data: data, hora: (response[x][2]).slice(0, 5), dia: days[new Date(response[x][1]).getDay()] });
          }
          this.componentes(55, 5, true);
        }
        this.columnDefs = this.columnDefs.slice();
      },
      error => { console.log(error); });
  }



  componentes(id, id_banho, graf) {
    this.ABMOVANALISELINHAService.getbyid_analise(id, id_banho).subscribe(
      response => {

        var count = Object.keys(response).length;
        //se existir componentes do banho

        if (count > 0) {
          var id_comp = [];
          var rowData = [];
          for (var x in response) {
            id_comp.push(response[x][1].id_COMPONENTE)

            rowData.push({ id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE,utilizador: response[x][1].utz_CRIA })

            this.rowData = rowData;
            ///this.corpo.push({ cor: cor, id: response[x][1].id_COMPONENTE, componente: response[x][1].nome_COMPONENTE, resultado: calculo, valores: dados })

          }


          for (var n in this.columnDefs) {
            if (this.columnDefs[n].id  != null) {
              this.getresultados(x, this.columnDefs[n].id, this.columnDefs[n].field, id_comp, id_banho);
            }
          }
        }

      },
      error => { console.log(error); });

  }


  getresultados(num, id, col, id_comp, id_banho) {

    this.ABMOVANALISELINHAService.getbyid_analise_comp(id, id_comp, id_banho).subscribe(
      response => {

        for (var x in response) {
          //console.log(response)

          this.rowData.find(item => item.id == response[x][0].id_COMPONENTE)[col] = (response[x][0].calculo != null) ? parseFloat(response[x][0].calculo) : "";

          this.rowData = this.rowData.slice();

        }

      },
      error => { console.log(error); });
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
    for (var i = 0; i < 50; i++) {

      rowData.push({
        athlete: "Nome Teste",
        age: Math.round(Math.random() * 100),
        address: "Morada Teste",
        year: Math.round(Math.random() * 100),
        proficiency: Math.round(Math.random() * 100),
        country: Math.round(Math.random() * 100),
        continent: Math.round(Math.random() * 100),
        sport: Math.round(Math.random() * 100),
        date: new Date(),
      });
    }
    this.analises();
    //this.rowData = rowData;
  }

  private createColumnDefs() {
    var array = [{ headerName: "Athlete", field: "athlete", width: 150, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Age", field: "age", width: 90, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Country", field: "country", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Year", field: "year", width: 90, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Date", field: "date", width: 110, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Sport", field: "sport", width: 110, enableValue: true, enableRowGroup: true, enablePivot: true },]
    this.columnDefs = [];
    /* for (var x in array) {
       this.columnDefs.push({ headerName: array[x].headerName, field: array[x].field, width: array[x].width, enableValue: array[x].enableValue, enableRowGroup: array[x].enableRowGroup, enablePivot: array[x].enablePivot })
     }*/
  }


  private calculateRowCount() {
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

  private onRowClicked($event) {
    //console.log('onRowClicked: ' + $event.node.data.name);
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
