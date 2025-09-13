import type Produto from "./Produto";

export default interface Categoria {
	id: number;
  nome: string;
	descricao: string;
  carencia: number;
	produto?: Produto[] | null;
}
