import { TipoArquivo } from './enums';

export class EspecificacoesDoArquivo {
  tipo: TipoArquivo;
  aba: number;
  campoStatus: string;
  campoProfessor: string;
  campoInstituicao: string;
  campoDisciplina: string;
  campoCurso: string;
  stringStatus: string;
  possuiEncontro: boolean;
  campoEncontro: string;

  constructor(tipo: number) {
    this.tipo = tipo;
    this.aba = this.selecionarAba(tipo);
    this.campoStatus = this.selecionarStatus(tipo);
    this.campoDisciplina = this.selecionarDisciplina(tipo);
    this.campoCurso = this.selecionarCurso(tipo);
    this.campoInstituicao = this.selecionarInstituicao(tipo);
    this.campoProfessor = this.selecionarProfessor(tipo);
    this.campoEncontro = this.selecionarEncontro(tipo);
    this.stringStatus = this.selecionarStringStatus(tipo);
    this.possuiEncontro = tipo >= 2 ? true : false;
  }

  private selecionarAba(tipo): number {
    return tipo === 0 ? 2 : tipo === 1 ? 2 : tipo === 2 ? 1 : 1;
  }
  private selecionarEncontro(tipo): string {
    return tipo === 2 ? 'encontro' : 'ENCONTRO';
  }
  private selecionarStatus(tipo): string {
    return tipo === 0
      ? 'Status'
      : tipo === 1
      ? 'Status'
      : tipo === 2
      ? 'qtde material pre aula'
      : 'VÍNCULO';
  }
  private selecionarDisciplina(tipo): string {
    return tipo === 0
      ? 'Disciplina'
      : tipo === 1
      ? 'sala ava'
      : tipo === 2
      ? 'disciplina'
      : 'DISCIPLINA';
  }
  private selecionarCurso(tipo): string {
    return tipo === 0
      ? 'Curso'
      : tipo === 1
      ? 'curso'
      : tipo === 2
      ? 'curso'
      : 'CURSO';
  }
  private selecionarStringStatus(tipo): string {
    return tipo === 0
      ? 'Nunca Acessou'
      : tipo === 1
      ? 'Nunca Acessou'
      : tipo === 2
      ? 'Pendente'
      : 'Pendente';
  }
  private selecionarProfessor(tipo): string {
    return tipo === 0
      ? 'Professor'
      : tipo === 1
      ? 'professor'
      : tipo === 2
      ? 'professor'
      : 'PROFESSOR';
  }
  private selecionarInstituicao(tipo): string {
    return tipo === 0
      ? 'IES'
      : tipo === 1
      ? 'instituicao'
      : tipo === 2
      ? 'nome inst'
      : 'NOME_INST';
  }
}
