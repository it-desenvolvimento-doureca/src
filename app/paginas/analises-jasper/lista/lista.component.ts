import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';

import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router } from '@angular/router';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { GridOptions } from 'ag-grid';


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


  constructor() {
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

  private createRowData() {
    var rowData: any[] = [];

    for (var i = 0; i < 50; i++) {

      rowData.push({
        /*athlete: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
        age: RefData.DOBs[i % RefData.DOBs.length],
        address: RefData.addresses[i % RefData.addresses.length],*/
        year: Math.round(Math.random() * 100),
        proficiency: Math.round(Math.random() * 100),
        country: Math.round(Math.random() * 100),
        continent: Math.round(Math.random() * 100),
        sport: Math.round(Math.random() * 100),
        date: new Date(),
      });
    }

    this.rowData = rowData;
  }

  private createColumnDefs() {
    var array = [{ headerName: "Athlete", field: "athlete", width: 150, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Age", field: "age", width: 90, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Country", field: "country", width: 120, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Year", field: "year", width: 90, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Date", field: "date", width: 110, enableValue: true, enableRowGroup: true, enablePivot: true },
    { headerName: "Sport", field: "sport", width: 110, enableValue: true, enableRowGroup: true, enablePivot: true },]
    this.columnDefs = [];
    for (var x in array) {
      this.columnDefs.push({ headerName: array[x].headerName, field: array[x].field, width: array[x].width, enableValue: array[x].enableValue, enableRowGroup: array[x].enableRowGroup, enablePivot: array[x].enablePivot })
    }
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
