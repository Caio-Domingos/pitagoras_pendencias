import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as XLSX from 'xlsx';
import * as _ from 'lodash';

import { InputFile } from 'ngx-input-file';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspecificacoesDoArquivo } from '../../classes/especificacoesDoArquivo';
import { Arquivo } from '../../classes/arquivo';
import { HttpClient } from '@angular/common/http';

type AOA = any[][];

const API_URL = 'localhost/pitagoras_pendencias/backend';

@Component({
  selector: 'pen-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  // Tabela extraida do arquivoe suas especificaoes
  tabela: any[][];
  especificacoesDoArquivo: EspecificacoesDoArquivo;
  nomeDoArquivo = '';

  // Objeto dos pendentes
  pendentes: Arquivo[] = [];

  // TODO Decidir o que fazer com isso
  visualizarPendentes = false;

  // Forms group do stepper
  tipoDeArquivo = new FormGroup({
    tipo: new FormControl('', Validators.required)
  });
  arquivo = new FormGroup({
    data: new FormControl(new Array<InputFile>(), [Validators.required])
  });

  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  /**
   * Com a troca de valor do input do passo 1, seleciona as informações da tabela correspondente
   */
  selecionarTipo() {
    const tipo = _.toNumber(this.tipoDeArquivo.controls.tipo.value);
    if (tipo >= 0) {
      // 0 AMI 1 AMP 2 Aulas pub. 3 Vunculacao
      this.especificacoesDoArquivo = new EspecificacoesDoArquivo(tipo);
    }
  }

  /**
   * Arquivo compilado para uma matriz
   * @param evt Aqruivo xlsx
   */
  onFileChange(evt: any): Promise<AOA> {
    return new Promise(result => {
      // const target: DataTransfer = <DataTransfer>(evt[0]);
      if (evt.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      this.nomeDoArquivo = evt[0].file.name;
      const reader: FileReader = new FileReader();
      const item = (reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname: string = wb.SheetNames[this.especificacoesDoArquivo.aba];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.tabela = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
        result(this.tabela);
      });
      reader.readAsBinaryString(evt[0].file);
    });
  }

  /**
   * Pega o arquivo compilado do arquivo xslx e transforma num objeto padrão
   */
  createObject(e: any): Promise<any[]> {
    return new Promise(resolve => {
      this.onFileChange(e).then(ret => {
        const propriedades = ret[0];
        const matrizFiltrada = ret.filter(
          all => all[0] === 'PITAGORAS - CONTAGEM'
        );
        const objectFinal: Arquivo[] = [];

        matrizFiltrada.forEach(campos => {
          const object: Arquivo = new Arquivo(
            campos,
            propriedades,
            this.especificacoesDoArquivo
          );
          objectFinal.push(object);
        });

        resolve(objectFinal);
      });
    });
  }

  /**
   * Filtra o objeto para ter somente os pendentes
   */
  private filtrarPendentes(pendentes: Arquivo[]) {
    const x = pendentes.filter(object => object.status);
    return x;
  }

  /**
   * Funcao que chama o spinner e cria o objeto a partir do arquivo selecionado e o tipo informado
   */
  confirm() {
    this.spinner.show();
    const file = this.arquivo.controls.data.value;

    this.createObject(file).then(e => {
      this.pendentes = this.filtrarPendentes(e);
      this.spinner.hide();
    });
  }

  send() {
    this.http
      .post(API_URL + 'setar-pendencias', this.pendentes)
      .subscribe(
        e => console.log('on http', e),
        err => console.error('erro', err)
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerPendentesComponent, {
      width: '70vw',
      data: this.pendentes
    });
  }
}

@Component({
  selector: 'pen-ver-pendentes-dialog',
  templateUrl: 'ver-pendentes/ver-pendentes.component.html',
  styleUrls: ['ver-pendentes/ver-pendentes.component.scss']
})
export class VerPendentesComponent {
  constructor(
    public dialogRef: MatDialogRef<VerPendentesComponent>,
    @Inject(MAT_DIALOG_DATA) public tabela: Arquivo[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
