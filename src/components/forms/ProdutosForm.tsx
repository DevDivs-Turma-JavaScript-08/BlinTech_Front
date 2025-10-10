import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../models/Categoria";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Services";
import CtaCard from "../buttons/CtaCard";
import InputField from "./inputs/InputField";

interface ProdutosFormProps {
	onClose?: () => void;
}

export default function ProdutosForm({ onClose }: ProdutosFormProps) {
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

	const [produto, setProduto] = useState<Produto>({} as Produto);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const { id } = useParams<{ id: string }>();

	async function buscarProdutoPorId(id: string) {
		try {
			await buscar(`/produto/${id}`, setProduto, {
				headers: { Authorization: token },
			});
		} catch (error) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	async function buscarCategoriaPorId(id: string) {
		try {
			await buscar(`/categorias/${id}`, setCategoria, {
				headers: { Authorization: token },
			});
		} catch (error) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	async function buscarCategorias() {
		try {
			await buscar("/categorias", setCategorias, {
				headers: { Authorization: token },
			});
		} catch (error) {
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
	}, [token, navigate]);

	useEffect(() => {
		buscarCategorias();

		if (id !== undefined) {
			buscarProdutoPorId(id);
		}
	}, [id, buscarProdutoPorId]);

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

		if (id !== undefined) {
			try {
				await atualizar(`/produto`, produto, setProduto, {
					headers: {
						Authorization: token,
					},
				});
				alert("Seguro atualizado com sucesso!");
				if (onClose) onClose();
			} catch (error) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Desculpe, não foi possível atualizar o seguro.");
				}
			}
		} else {
			try {
				await cadastrar(`/produto`, produto, setProduto, {
					headers: {
						Authorization: token,
					},
				});
				alert("Seguro contratado com sucesso!");
				if (onClose) onClose();
			} catch (error) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Desculpe, não foi possível contratar o seguro.");
				}
			}
		}

		// setIsLoading(false);
		retornar();
		console.log(produto);
	}

	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			retornar();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/40 backdrop-blur-sm" onClick={handleOutsideClick}>
			<div
				className="bg-(--primary-dark)/95 px-8 py-4 rounded-lg backdrop-blur-md shadow-xl w-[90vw] h-[90vh] max-w-3xl"
				onClick={(e) => e.stopPropagation()}>
				<div className="text-center">
					<h1 className="text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar Seguro" : "Contratar Seguro"}</h1>

					<p className="text-gray-200">Preencha os dados do dispositivo eletrônico</p>
				</div>

				{/* --- Seção: Informações do Dispositivo --- */}
				<form onSubmit={gerarNovoProduto}>
					<fieldset className="mb-4">
						<legend className="text-xl font-bold mb-6 text-gray-200 text-center">Informações do Dispositivo</legend>
						<div className="grid grid-cols-2 gap-4">
							<InputField
								name="descricao"
								type="text"
								placeholder="Descricao do dispositivo"
								label="Descricao do dispositivo"
								value={produto.descricao}
								onChange={atualizarEstado}
								required
							/>

							<InputField
								name="nomeProduto"
								type="text"
								placeholder="Nome do Produto Ex: Galaxy A55 - Samsung"
								label="Nome do Produto"
								value={produto.nomeProduto}
								onChange={atualizarEstado}
								required
							/>

							<InputField
								name="valorProduto"
								type="number"
								placeholder="Digite o valor de compra"
								label="Valor do Produto"
								value={produto.valorProduto}
								onChange={atualizarEstado}
								required
							/>

							<InputField
								name="imei"
								type="text"
								placeholder="Digite o número do IMEI"
								label="IMEI"
								value={produto.imei || " "}
								onChange={atualizarEstado}
							/>

							<InputField
								name="tempoUso"
								type="number"
								placeholder="Digite o tempo de uso em meses"
								label="Meses de Uso"
								value={produto.tempoUso}
								onChange={atualizarEstado}
								required
							/>
						</div>
					</fieldset>

					<fieldset className="mb-8">
						<legend className="text-xl font-semibold mb-4 text-white text-center">Informações do Seguro</legend>
						<div className="flex flex-col gap-6">
							<div className="relative">
								<select
									id="cobertura"
									name="cobertura"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={produto.cobertura}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}>
									<option selected value="basico">
										Básico
									</option>
									<option value="intermediario">Intermediário</option>
									<option value="premium">Premium</option>
								</select>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="cobertura">
									Plano de Seguro
								</label>
							</div>

							<div className="relative">
								<select
									id="categoria"
									name="categoria"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={categoria.id}
									onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
									{categorias.map((categoria) => (
										<option key={categoria.id} value={categoria.id} selected={categoria.id === 1}>
											{categoria.nome}
										</option>
									))}
								</select>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="categoria">
									Categoria do Produto
								</label>
							</div>
						</div>
					</fieldset>

					<div className="flex justify-end gap-4">
						<CtaCard
							type="submit"
							text={id !== undefined ? "Atualizar" : "Contratar"}
							textColor="(--tertiary-light)"
							textHover="(--tertiary-ex-light)"
							bgColor="(--primary)"
							bgHover="(--primary-dark)"
							border="(--tertiary)"
						/>

						<CtaCard
							type="button"
							text="Voltar"
							textColor="(--secondary)"
							textHover="white"
							bgHover="(--primary-dark)"
							onClick={retornar}
							border="(--secondary)"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
