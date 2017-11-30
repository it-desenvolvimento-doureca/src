import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';

import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { GridOptions } from 'ag-grid';
import { ABMOVANALISEService } from 'app/servicos/ab-mov-analise.service';
import { ABMOVANALISELINHAService } from 'app/servicos/ab-mov-analise-linha.service';
import { RegistoProducao } from 'app/servicos/registoproducao.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  columdefeito: any[];
  familias: any[] = [];
  private gridOptions: GridOptions;
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;
  selectedCars1: string[] = [];
  // public dateComponentFramework: DateComponent;
  public HeaderGroupComponent = this.HeaderGroupComponent;


  constructor(private RegistoProducao: RegistoProducao, private ABMOVANALISEService: ABMOVANALISEService, private ABMOVANALISELINHAService: ABMOVANALISELINHAService) {

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



    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = {
      columnDefs: this.columnDefs,
      rowData: null,
      enableSorting: true,
      enableFilter: true,
      animateRows: true,
      isExternalFilterPresent: isExternalFilterPresent,
      doesExternalFilterPass: doesExternalFilterPass,
      rowGroupPanelShow: 'always'
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

  analises() {
    this.columnDefs.push({
      headerName: "Tipo", field: "tipo", width: 120, enableValue: true, filter: 'text', enableRowGroup: true, enablePivot: true, cellStyle: function (params) {
        if (params.value == 'COMP') {
          //mark police cells as red
          return { backgroundColor: 'red' };
        } else {
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
        var column = { headerName: "FAM " + fam,suppressMenu: true, field: "defeito", children: [] };
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