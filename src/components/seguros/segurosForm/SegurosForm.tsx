import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

export default function SegurosForm() {
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState<boolean>(false);

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
			await buscar(`/produtos/${id}`, setCategoria, { headers: { Authorization: token } });
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
		navigate("/produtos");
	}

	async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// setIsLoading(true);
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

		// setIsLoading(false);
		retornar();
	}

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-200">
			<div className="bg-violet-700 p-8 rounded-lg shadow-xl w-[80%] max-w-3xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2 text-white">Cadastrar Eletrônico</h1>

					<p className="text-gray-200">Preencha os dados do dispositivo eletrônico</p>
				</div>

				{/* --- Seção: Informações do Dispositivo --- */}
				<form onSubmit={gerarNovoProduto}>
					<fieldset className="mb-8">
						<legend className="text-xl font-bold mb-6 text-gray-200 text-center">Informações do Dispositivo</legend>
						<div className="grid grid-cols-2 gap-6">
							<div className="relative" id="input">
								<input
									type="text"
									name="descricao"
									id="descricao"
									placeholder=" Descricao do dispositivo "
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={produto.descricao}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>

								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="descricao">
									Descricao do dispositivo *
								</label>
							</div>

							<div className="relative" id="input">
								<input
									type="text"
									id="nomeProduto"
									name="nomeProduto"
									placeholder="Nome do Produto Ex: Galaxy A55 - Samsung"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={produto.nomeProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="nomeProduto">
									Nome do Produto *
								</label>
							</div>

							<div className="relative" id="input">
								<input
									type="number"
									name="valorProduto"
									id="valorProduto"
									placeholder="Digite o valor de compra"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={produto.valorProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="valorProduto">
									Valor do Produto
								</label>
							</div>

							<div className="relative" id="input">
								<input
									type="text"
									name="imei"
									id="imei"
									placeholder="Digite o número do IMEI"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={produto.imei}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="imei">
									IMEI
								</label>
							</div>

							<div className="relative" id="input">
								<input
									type="number"
									name="tempoUso"
									id="tempoUso"
									placeholder="Digite o tempo de uso em meses"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={produto.tempoUso}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="tempoUso">
									Meses de Uso
								</label>
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
									className="w-full bg-white text-black border  rounded-lg p-3 pr-10 appearance-none"
									value={produto.cobertura}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}>
									<option value="" disabled>
										Selecione um Plano
									</option>
									<option value="basico">Básico</option>
									<option value="intermediario">Intermediário</option>
									<option value="premium">Premium</option>
								</select>
							</div>
						</div>
					</fieldset>

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

					{/* --- Seção: Informações --- */}
					{/* <div className="mb-8">
						<h2 className="text-xl font-semibold mb-4 text-gray-200">Informações do seguro</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="relative" id="input">
								<label className="block text-sm font-medium text-gray-400 mb-1">Valor do Seguro *</label>
								<input
									disabled
									type="number"
									id="valorSegurado"
									placeholder="preencha as informacoes acima"
									className="w-full bg-white text-black border border-gray-600 rounded-lg p-3"
								/>
							</div>
							<div className="relative" id="input">
								<label className="block text-sm font-medium text-gray-400 mb-1">Data de cadastro *</label>
								<div className="relative">
									<input
										type="date"
										id="dataCadastro"
										disabled
										placeholder="dd/mm/aaaa"
										className="w-full bg-white text-black rounded-lg p-3 pr-10 "
									/>
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
