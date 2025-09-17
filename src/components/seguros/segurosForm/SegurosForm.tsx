import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

interface SegurosFormProps {
	onClose?: () => void;
}

export default function SegurosForm({ onClose }: SegurosFormProps) {
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
			await buscar(`/produto/${id}`, setProduto, { headers: { Authorization: token } });
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
	}, [id, token]);

	// useEffect(() => {
	// 	if (produto.categoria) {
	// 		setCategoria(produto.categoria);
	// 	}
	// }, [produto]);

	useEffect(() => {
		setProduto({
			...produto,
			categoria: categoria,
		});
	}, [categoria]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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

		if (id !== undefined) {
			try {
				if (id !== undefined) {
					await atualizar(`/produtos`, produto, setProduto, { headers: { Authorization: token } });
				} else {
					await cadastrar(`/produtos`, produto, setProduto, { headers: { Authorization: token } });
				}

				alert("O produto foi atualizado com sucesso!");
				if (onClose) {
					onClose();
				}
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
				if (onClose) {
					onClose();
				}
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Erro ao cadastrar o produto.");
				}
			}
		}
		// setIsLoading(false);
	}

	return (
		<div className="flex items-center justify-center">
			<div className="bg-(--primary-dark)/95 px-8 py-4 rounded-lg shadow-xl w-[90vw] h-[90vh] max-w-3xl">
				<div className="text-center">
					<h1 className="text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar Seguro" : "Contratar Seguro"}</h1>

					<p className="text-gray-200">Preencha os dados do dispositivo eletrônico</p>
				</div>

				{/* --- Seção: Informações do Dispositivo --- */}
				<form onSubmit={gerarNovoProduto}>
					<fieldset className="mb-4">
						<legend className="text-xl font-bold mb-6 text-gray-200 text-center">Informações do Dispositivo</legend>
						<div className="grid grid-cols-2 gap-4">
							<div className="relative" id="input">
								<input
									type="text"
									name="descricao"
									id="descricao"
									placeholder=" Descricao do dispositivo "
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.descricao}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>

								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
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
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.nomeProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
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
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.valorProduto}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
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
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.imei}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
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
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.tempoUso}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="tempoUso">
									Meses de Uso
								</label>
							</div>
						</div>
					</fieldset>

					<fieldset className="mb-8">
						<legend className="text-xl font-semibold mb-4 text-white text-center">Plano de Seguro</legend>
						<div>
							<div className="relative">
								<select
									id="cobertura"
									name="cobertura"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									defaultValue="basico"
									value={produto.cobertura}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}>
									<option value="basico">Básico</option>
									<option value="intermediario">Intermediário</option>
									<option value="premium">Premium</option>
								</select>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="tempoUso">
									Plano de Seguro
								</label>
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
							{categorias.map((categoria) => (
								<option value={categoria.id}>{categoria.nome}</option>
							))}
						</select>
					</div>

					<div className="flex justify-end space-x-4 pt-4 gap-2">
						<button
							type="button"
							onClick={retornar}
							className="px-6 py-3 outline-2 outline-(--secondary-dark) text-(--secondary) hover:text-white rounded-lg font-semibold hover:bg-(--secondary) transition-colors hover:cursor-pointer">
							Cancelar
						</button>
						<button
							type="submit"
							className="px-6 py-3 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-900 transition-colors hover:cursor-pointer hover:outline-2 hover:outline-(--tertiary)">
							{id !== undefined ? "Atualizar" : "Contratar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
