import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage:Storage) {
    this.storage.create();
  }

  ngOnInit(){
    this.atualizaLista();
  }

  variavel_lista = [];
  variavel_valor = [];
  texto: string = "";
  valor: number;
  soma: number = 0.0;
  somaFixed: string = "";
  aux = 0.0;

  async adiciona() {
    if (!(this.texto == "")){
      // && !isNaN(this.valor))
      //this.variavel_lista.push("0", this.texto);

      this.variavel_valor.push(this.valor);
      

      this.variavel_lista.forEach(item => {
        if(parseFloat(item[0]) > this.aux) {
          this.aux = parseFloat(item[0]);
        }
      })
      this.aux = this.aux + 1.0;
      await this.storage.set(this.aux.toString(), [this.texto, Number(this.valor).toFixed(2)]);
      this.atualizaLista();
      this.texto = "";
      this.valor = 0.0;

      this.valor = null;
      
    }

    /*for (var i = 0; i < this.variavel_valor.length; i++) {
      this.soma = this.soma + parseInt(this.variavel_valor[i]);

    }*/

  }

  somar(valor) {
    this.soma +=  valor;
    this.somaFixed = Number(this.soma).toFixed(2);
    
  }

  atualizaLista() {
    this.variavel_lista = [];
    this.soma = 0.0;
    this.storage.forEach((value, key, index) => {
      this.variavel_lista.push([key, value]);
      console.log("olá", +value[1], typeof value[1])
      this.somar(+value[1])
    })
    
  }

  async remove(indice1, indice2 = indice1 - 1) {
    this.soma = this.soma - parseFloat(this.variavel_valor[indice2]);
    //this.variavel_lista.splice(indice, 1)
    console.log(indice1, indice2)
    console.log(this.soma)
    await this.storage.remove(indice1);
    this.atualizaLista();
  }

  //*ngFor = "let elemento_da_lista of minhaLista" no item
  //[(ngModel)]="texto" no input

}