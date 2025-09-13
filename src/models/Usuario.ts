import type Produto from "./Produto";

export default interface Usuario {
	id: number;
	nome: string;
	email: string;
	senha: string;
	cpf: string;
  tipoDeUsuario: string;
  foto: string;
	produtos?: Produto[] | null;
}
