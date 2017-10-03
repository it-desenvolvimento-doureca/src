import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { EMAIL } from 'app/entidades/EMAIL';
import { Location } from '@angular/common';
import { EmailService } from 'app/servicos/email.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { GEREVENTOSCONFService } from 'app/servicos/ger-eventos-conf.service';
import { GER_EVENTOS_CONF } from 'app/entidades/GER_EVENTOS_CONF';

@Component({
  selector: 'app-gestaoeventos',
  templateUrl: './gestaoeventos.component.html',
  styleUrls: ['./gestaoeventos.component.css']
})
export class GestaoeventosComponent implements OnInit {
  momento: string;
  pagina: string;
  modulo: string;
  id: any;
  evento: any;
  observacoes: string;
  estado: boolean;
  modoedicao: boolean;
  user: any;
  email_mensagem: string;
  email_assunto: string;
  cols: any[];
  email_para;
  results;
  bt_disable;
  inclui_anexo;
  text: string = "";;
  draggedCar: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  campos = [{ label: "Nome Banho", id: "nomebanho" }, { label: "Número Banho", id: "numerobanho" }, { label: "Observação", id: "observacao" }];

  constructor(private renderer: Renderer, private GEREVENTOSCONFService: GEREVENTOSCONFService, private route: ActivatedRoute, private router: Router, private location: Location, private globalVar: AppGlobals, private EmailService: EmailService, private GERUTILIZADORESService: GERUTILIZADORESService) { }

  ngOnInit() {

    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    // this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisEditar(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
          this.id = id;
        });
    }
    if (urlarray[1].match("editar")) {
      this.modoedicao = true;
    }
    if (id == 0) {
      this.router.navigate(['eventos']);
    }
    this.getutilizadores();
    this.inicia(this.id);
  }


  inicia(id) {
    this.GEREVENTOSCONFService.getbyID(id).subscribe(
      response => {
        this.evento = response[0][0];
        for (var x in response) {
          this.email_assunto = response[x][0].email_ASSUNTO;
          this.email_mensagem = response[x][0].email_MENSAGEM;
          this.email_para = response[x][0].email_PARA.split(",");
          this.inclui_anexo = response[x][0].email_ANEXO;
          this.estado = response[x][0].estado;
          this.observacoes = response[x][0].obs;
          this.modulo = response[x][1].nome_MODULO;
          this.pagina = response[x][0].pagina;
          this.momento = response[x][0].momento;
        }
      },
      error => console.log(error));
  }

  dragEnd(event) {
    this.draggedCar = null;
  }

  dragStart(event, val) {
    this.draggedCar = val;
  }

  drop(event) {
    if (this.modoedicao) {
      var droparea = (<HTMLInputElement><any>document.getElementsByClassName('ql-editor')[0]);
      //droparea.focus();
      var sel, range;
      sel = window.getSelection();
      var class_find = ((sel.baseNode.parentNode != null) ? sel.baseNode.parentNode.offsetParent.className.search("editor_texto") : -1);
      if (class_find > 0 && sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        //range.deleteContents();
        var frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode("{" + this.draggedCar + "}"));
        range.insertNode(frag);
      } else {
        droparea.appendChild(document.createTextNode("{" + this.draggedCar + "}"))
      }
    }
  }

  search(event) {
    var input = (<HTMLInputElement><any>document.getElementById('autocompleteinput'));
    this.results = this.pesquisaemail(event.query);
    if (event.query.indexOf(";") >= 0) {
      var email = (event.query.substr(0, event.query.indexOf(";")));
      if (this.email_para.indexOf(email) < 0 && email.trim().length > 0 && this.validateEmail(email)) {
        this.email_para.push(email);
        input.value = "";
      }
      if (email.trim().length < 0) {
        input.value = "";
      }
    }
  }

  //verifica se é email
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //verifica se existe algum email
  pesquisaemail(text) {
    var result = [];
    for (var x in this.cols) {
      if (this.cols[x].email.includes(text)) {
        result.push(this.cols[x].email);
      }
    }
    return result;
  }


  getutilizadores() {
    this.cols = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.cols.push({ email: response[x].email });
        }
        this.cols = this.cols.slice();
      },
      error => console.log(error));
  }

  gravar() {
    var eventos = new GER_EVENTOS_CONF;
    eventos = this.evento;
    eventos.data_ULT_MODIF = new Date();
    eventos.email_ANEXO = this.inclui_anexo;
    eventos.email_ASSUNTO = this.email_assunto;
    eventos.email_MENSAGEM = this.email_mensagem;
    eventos.email_PARA = this.email_para.toString();
    eventos.estado = this.estado;
    eventos.obs = this.observacoes;
    this.GEREVENTOSCONFService.update(eventos).then(() => {
      this.simular(this.inputgravou);
      this.router.navigate(['eventos/view'], { queryParams: { id: this.id } });
    },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  enviar() {
    if (this.email_mensagem != "" && this.email_mensagem != null && this.campos.length > 0) {
      for (var x in this.campos) {
        this.email_mensagem = this.email_mensagem.split("{" + this.campos[x].id + "}").join(this.campos[x].label + "*")
      }
    }

    var email = new EMAIL();
    //email.para = this.email_para.toString();
    email.para = "tiago.pereira@datamind.pt";
    email.assunto = this.email_assunto;
    email.mensagem = this.email_mensagem;



    //email.mensagem = this.email_mensagem.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");    
    //email.nome_FICHEIRO = this.filename;
    /* this.bt_disable = true;*/
    //this.EmailService.enviarEmail(email).subscribe(
    //  res => {
    /* this.bt_disable = false;
     this.simular(this.inputenvio);
     this.simular(this.closedialog);*/
    //  }, error => {
    /*this.simular(this.inputerro);
    this.bt_disable = false;*/
    //   });
    console.log(email)
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
