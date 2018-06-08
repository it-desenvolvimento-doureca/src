import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  activeTarefas: boolean = true;
  activeTimeline: boolean = false;
  data = {};
  cols = [];
  timeline = [];
  constructor() { }

  ngOnInit() {
    this.cols = [{ id: 1, data: "2018-06-01", estado: "Ativo", progresso: 50, prioridade: "Normal" }];


    this.data = {
      labels: ['Faltam', 'Realizadas'],
      datasets: [
        {
          data: [1, 4],
          backgroundColor: [
            "#FF6384",
            "#068c06b3"
          ],
          hoverBackgroundColor: [
            "red",
            "green"
          ]
        }]
    };

    var campo = [{ data: "2018-01-05", hora: "10:05", utilizador: "Administrador", texto: "Alterou o estado para 1", class: "" },
    { data: "2018-01-05", hora: "10:10", utilizador: "Administrador", texto: "Alterou o estado para 2", class: "" },
    { data: "2018-01-05", hora: "11:00", utilizador: "Ana", texto: "Alterou o estado para 3", class: "" },
    { data: "2018-01-06", hora: "10:10", utilizador: "Tiago", texto: "Alterou o estado para 1", class: "" },
    ];

    var tempdata = [];
    var mes = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    var tempclass = "credits";
    for (var y in campo) {

      let index = this.timeline.findIndex(item => item.data == campo[y].data);
      if (index == -1) {
        tempclass = "credits"
        campo[y].class = tempclass;
        this.timeline.push({ data: campo[y].data, dia: new Date(campo[y].data).getDay(), mes: mes[new Date(campo[y].data).getMonth()], dados: [campo[y]] });
      } else {
        campo[y].class = tempclass;
        this.timeline[index].dados.push(campo[y]);
      }
      if (tempclass == "credits") {
        tempclass = "debits";
      } else {
        tempclass = "credits"
      }
    }
    //debits / credits
    // console.log(this.timeline)

  }

  abrir(event) {

  }

  TarefasShow() {
    this.activeTimeline = false;
    this.activeTarefas = true;
  }

  TimelineShow() {
    this.activeTimeline = true;
    this.activeTarefas = false;
  }


}
