import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
	id: number;
	nomeProduto: string;
	descricao: string;
	cobertura: string;
  imei?: string;
  valorProduto: number;
  valorSeguro: number;
  premioMensal: number;
  tempoUso: number;
  dataDeCadastro: string;
	categoria: Categoria | null;
	usuario: Usuario | null;
}
