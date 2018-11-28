import * as uid from 'uid';
import { EspecificacoesDoArquivo } from './especificacoesDoArquivo';

export class Arquivo {
  id: string;
  professor: string;
  curso: string;
  disciplina: string;
  encontro?: string;
  status: boolean;
  tipo: number;

  constructor(
    private campos: any[],
    private propriedades: any[],
    private especificacoes: EspecificacoesDoArquivo
  ) {
    this.id = uid(10);
    this.professor = this.setValueStrings('campoProfessor');
    this.curso = this.setCurso('campoCurso');
    this.disciplina = this.setValueStrings('campoDisciplina');
    this.encontro = this.setEncontro('campoEncontro');
    this.status = this.setStatus('campoStatus');
    this.tipo = especificacoes.tipo;
  }

  private setValueStrings(nomeCampo: string): string {
    return this.campos[this.propriedades.findIndex(x => x === this.especificacoes[nomeCampo])];
  }
  private setCurso(nomeCampo: string): string {
    return this.especificacoes.tipo === 0
      ? this.campos[this.propriedades.findIndex(x => x === this.especificacoes.campoCurso)]
          .substr(23)
          .split('Disciplina')[0]
      : this.campos[this.propriedades.findIndex(x => x === this.especificacoes.campoCurso)];
  }
  private setEncontro(nomeCampo: string): string {
    return this.especificacoes.tipo >= 2
      ? this.campos[this.propriedades.findIndex(x => x === this.especificacoes.campoEncontro)]
      : null;
  }
  private setStatus(nomeCampo: string): boolean {
    return this.campos[
      this.propriedades.findIndex(x => x === this.especificacoes.campoStatus)
    ] === this.especificacoes.stringStatus
      ? true
      : false;
  }
}
