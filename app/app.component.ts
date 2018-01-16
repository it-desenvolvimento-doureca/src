import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    nome: any;
    linha = 0;
    linhas: any[];
    location: Location;
    versao = "versão 1.0.1";
    modulo = "Gestão de Banhos Químicos";
    mensagem = "";

    @ViewChild('closedialog') closedialog: ElementRef;
    constructor(private GERPERFILLINService: GERPERFILLINService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, location: Location, private router: Router) {
        this.location = location;
        //preenche combobox linhas
        this.ABDICLINHAService.getAll().subscribe(
            response => {
                this.linhas = [];
                this.linhas.push({ label: "Sel. Linha", value: 0 });
                for (var x in response) {
                    this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
                }
                this.linha = 0;
                this.linhas = this.linhas.slice();
            },
            error => console.log(error));
        if (localStorage.getItem('userapp') && JSON.parse(localStorage.getItem('userapp')) != null) {

            /* if (true) {
                 var elem = (<HTMLInputElement>document.getElementById('node1'));
                 if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
             }*/

            //carregar acessos
            this.GERPERFILLINService.getbyID_node(JSON.parse(localStorage.getItem('userapp'))["id"], "null").subscribe(
                response2 => {
                    var count = Object.keys(response2).length;
                    var array = [];
                    if (count > 0) {
                        for (var x in response2) {
                            array.push({ node: response2[x].id_CAMPO });
                            if (JSON.parse(localStorage.getItem('userapp')) != null) {
                                if (!(!JSON.parse(localStorage.getItem('userapp'))["admin"] && response2[x].id_CAMPO == "node1")) {
                                    var elem = (<HTMLInputElement>document.getElementById(response2[x].id_CAMPO));
                                    if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
                                }
                            }

                        }
                    }
                    localStorage.setItem('acessos', JSON.stringify(array));
                }, error => { console.log(error); });
        }
    }

    isnome() {
        if (localStorage.getItem("userapp")) {
            return JSON.parse(localStorage.getItem('userapp'))["nome"];
        } else {
            return "";
        }
    }

    public teste() {
        return this.globalVar.getMensagem();
    }
    public isMaps(path) {

        var titlee = this.router.routerState.snapshot.url;
        titlee = titlee.slice(1);
        var urlarray = titlee.split("/");
        
        titlee = urlarray[0];
        if (titlee.match('login')) {
            this.linha = 0;
        }
        if (titlee.match(path)) {
            return false;
        }
        else {
            return true;
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    confirmar() {
        this.globalVar.setlinha(this.linha);
        this.simular(this.closedialog);
    }

    //simular click para mostrar mensagem
    simular(element) {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
            element.nativeElement, 'dispatchEvent', [event]);
    }
}
