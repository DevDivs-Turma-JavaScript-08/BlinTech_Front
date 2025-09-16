// export default interface Produto {
//   id: number;
//   nomeProduto: string;
//   descricao: string;
//   cobertura: string;
//   imei?: string;
//   valorProduto: number;
//   valorSeguro: number;
//   premioMensal: number;
//   tempoUso: number;
//   dataDeCadastro: string;
//   categoria: Categoria | null;
//   usuario: Usuario | null;
// }

import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

const navigate = useNavigate();

const [isLoading, setIsLoading] = useState<boolean>(false);

const [categorias, setCategorias] = useState<Categoria[]>([]);

const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: "", descricao: "", carencia: 0 });

const [produto, setProduto] = useState<Produto>({} as Produto);

const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario.token;

const { id } = useParams<{ id: string }>();

async function buscarCategoriaPorId(id: string) {
	try {
		await buscar(`/categorias/${id}`, setCategoria, { headers: { Authorization: token } });
	} catch (error: any) {
		if (error.toString().includes("401")) {
			handleLogout();
		}
	}
}

async function buscarProdutoPorId(id: string) {
	try {
		await buscar(`/produtos/${id}`, setProduto, { headers: { Authorization: token } });
	} catch (error: any) {
		if (error.toString().includes("401")) {
			handleLogout();
		}
	}
}

async function buscarCategorias() {
	try {
		await buscar(`/categorias`, setCategorias, { headers: { Authorization: token } });
	} catch (error: any) {
		if (error.toString().includes("401")) {
			handleLogout();
		}
	}
}

useEffect(() => {
	if (token === "") {
		alert("Você precisa estar logado!");
		navigate("/");
	}
}, [token]);

useEffect(() => {
	buscarCategorias();

	if (id !== undefined) {
		buscarProdutoPorId(id);
	}
}, [id]);

useEffect(() => {
	setProduto({
		...produto,
		categoria: categoria,
	});
}, [categoria]);

function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
	setProduto({
		...produto,
		[e.target.name]: e.target.value,
		categoria: categoria,
		usuario: usuario,
	});
}

function retornar() {
	navigate("/");
}

async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
	e.preventDefault();
	setIsLoading(true);
	console.log(produto);

	if (id !== undefined) {
		try {
			await atualizar(`/produto`, produto, setProduto, { headers: { Authorization: token } });
			alert("O produto foi atualizado com sucesso!");
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			} else {
				alert("Erro ao atualizar o produto.");
			}
		}
	} else {
		try {
			await cadastrar(`/produto`, produto, setProduto, { headers: { Authorization: token } });
			alert("O produto foi criado com sucesso!");
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			} else {
				alert("Erro ao cadastrar o produto.");
			}
		}
	}

	setIsLoading(false);
	retornar();
}

export default function SegurosForm() {
	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-200">
			<div className="bg-violet-700 p-8 rounded-lg shadow-xl w-[80%] max-w-3xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2 text-white">Cadastrar Eletrônico</h1>

					<p className="text-gray-200">Preencha os dados do dispositivo eletrônico</p>
				</div>
				<form onSubmit={gerarNovoProduto}>
					{/* --- Seção: Informações do Dispositivo --- */}
					<fieldset className="mb-8">
						<legend className="text-xl font-bold mb-6 text-gray-200 text-center">Informações do Dispositivo</legend>
						<div className="grid grid-cols-2 gap-6">
							<div>
								<label htmlFor="descricao" className="block text-sm font-medium text-gray-400 mb-1">
									descricao do dispositivo *
								</label>

								<input
									type="text"
									placeholder="Ex: Celular, Notebook, Tablet..."
									name="descricao"
									value={produto.descricao}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
									className="w-full  text-black bg-white border  rounded-lg p-3  "
								/>
							</div>
							<div>
								<label htmlFor="nomeProduto" className="block text-sm font-medium text-gray-400 mb-1">
									Nome do produto*
								</label>
								<input
									type="text"
									name="nomeProduto"
									value={produto.nomeProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
									placeholder="Ex: Galaxy A55 - Samsung"
									className="w-full bg-white text-black border  rounded-lg p-3 "
								/>
							</div>
							<div>
								<label htmlFor="valorProduto" className="block text-sm font-medium text-gray-400 mb-1">
									Valor do Produto *
								</label>
								<input
									type="number"
									name="valorProduto"
									value={produto.valorProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
									placeholder="Digite o valor de compra"
									className="w-full bg-white text-black rounded-lg p-3 "
								/>
							</div>
							<div>
								<label htmlFor="imei" className="block text-sm font-medium text-gray-400 mb-1">
									IMEI *
								</label>
								<input
									type="text"
									name="imei"
									placeholder="Digite o IMEI"
									value={produto.imei}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
									id="numeroIMEI"
									className="w-full bg-white text-black rounded-lg p-3"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-400 mb-1">Tempo de uso *</label>
								<input
									id="tempoUso"
									placeholder="Digite o tempo de uso em meses"
									type="number"
									name="tempoUso"
									value={produto.tempoUso}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
									className="w-full bg-white text-black  rounded-lg p-3"
								/>
							</div>
						</div>
					</fieldset>

					<fieldset className="mb-8">
						<legend className="text-xl font-semibold mb-4 text-white">Plano de Seguro</legend>
						<div>
							<label htmlFor="cobertura" className="block text-sm font-medium text-gray-400 mb-1">
								Selecione o Plano de Seguro *
							</label>
							<div className="relative">
								<select
									id="cobertura"
									name="cobertura"
									value={produto.cobertura}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}
									className="w-full bg-white text-black border  rounded-lg p-3 pr-10 appearance-none">
									<option value="" disabled>
										Selecione um Plano
									</option>
									<option value="plano1">Básico</option>
									<option value="plano2">Intermediário</option>
									<option value="plano3">Plus</option>
								</select>
							</div>
						</div>
					</fieldset>

					{/* --- Seção: Informações ---
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4 text-gray-200">Informações do seguro</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-400 mb-1">Valor do Seguro *</label>
							<input
								disabled
								type="number"
								id="valorSegurado"
								placeholder="preencha as informacoes acima"
								className="w-full bg-white text-black border border-gray-600 rounded-lg p-3"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-400 mb-1">Data de cadastro *</label>
							<div className="relative">
								<input type="date" id="dataCadastro" disabled placeholder="dd/mm/aaaa" className="w-full bg-white text-black rounded-lg p-3 pr-10 " />
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-400 mb-1">Premio Mensal *</label>
							<input
								disabled
								type="number"
								id="valorSegurado"
								placeholder="preencha as informacoes acima"
								className="w-full bg-white text-black border  rounded-lg p-3"
							/>
						</div>
					</div>
				</div> */}

					<div className="flex flex-col gap-1 text-white font-bold">
						<p>Categoria do Produto</p>
						<select
							name="categoria"
							id="categoria"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
							onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
							<option value="" selected disabled>
								Selecione uma Categoria
							</option>

							{categorias.map((categoria) => (
								<option value={categoria.id}>{categoria.nome}</option>
							))}
						</select>
					</div>

					<div className="flex justify-end space-x-4 pt-4 gap-2">
						<button
							type="button"
							className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-red-600 transition-colors hover:cursor-pointer">
							Cancelar
						</button>
						<button
							type="submit"
							className="px-6 py-3 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-900 transition-colors hover:cursor-pointer">
							Cadastrar Eletrônico
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
