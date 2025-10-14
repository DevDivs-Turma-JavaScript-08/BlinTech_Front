import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../models/Categoria";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Services";
import CtaCard from "../buttons/CtaCard";

import { useForm, type SubmitHandler } from "react-hook-form";

interface ProdutosFormProps {
	onClose?: () => void;
}

type FormFields = {
	nomeProduto: string;
	descricao: string;
	cobertura: string;
	imei?: string;
	valorProduto: number;
	tempoUso: number;
	categoriaId: number;
	possuiImei: boolean;
};

const tiposDeDispositivo: string[] = [
	"Smartphone",
	"Smartwatch",
	"Tablet",
	"Notebook",
	"Computador",
	"Kindle",
	"SmartRing",
	"Outro Dispositivo Eletrônico",
];

export default function ProdutosForm({ onClose }: ProdutosFormProps) {
	const navigate = useNavigate();

	const [categorias, setCategorias] = useState<Categoria[]>([]);
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
	// const [produto, setProduto] = useState<Produto>({} as Produto);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;
	const { id } = useParams<{ id: string }>();

	// --- useForm ---

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<FormFields>({
		mode: "onTouched",
		defaultValues: {
			nomeProduto: "",
			descricao: "",
			valorProduto: 0,
			imei: "",
			tempoUso: 0,
			cobertura: "basico",
			categoriaId: 0,
			possuiImei: false,
		},
	});

	const [showImei, setShowImei] = useState(watch("possuiImei"));

	const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>({} as Categoria);

	async function buscarProdutoPorId(id: string) {
		try {
			let produto: Produto = {} as Produto;

			await buscar(
				`/produto/${id}`,
				(data: Produto) => {
					produto = data;
				},
				{
					headers: { Authorization: token },
				}
			);

			const temImei = !!produto.imei && produto.imei !== "WW-XXXXXX-YYYYYY-Z";

			reset({
				nomeProduto: produto.nomeProduto,
				descricao: produto.descricao,
				valorProduto: produto.valorProduto,
				imei: produto.imei,
				tempoUso: produto.tempoUso,
				cobertura: produto.cobertura,
				categoriaId: produto.categoria.id,
				possuiImei: temImei,
			});

			setCategoriaSelecionada(produto.categoria);
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			} else {
				console.error("Erro ao buscar produto:", error);
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

	if (id) {
		buscarProdutoPorId(id);
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

	useEffect(() => {
		const categoriaId = watch("categoriaId");
		const categoriaObj = categorias.find((c) => c.id === categoriaId);
		if (categoriaObj) {
			setCategoriaSelecionada(categoriaObj);
		} else if (categorias.length > 0 && categoriaId === 0) {
			setValue("categoriaId", categorias[0].id);
			setCategoriaSelecionada(categorias[0]);
		}
	}, [categorias, watch, setValue]);

	function retornar() {
		navigate("/produtos");
	}

	const gerarNovoProduto: SubmitHandler<FormFields> = async (data) => {
		// setIsLoading(true);

		const imeiValue = data.possuiImei ? data.imei : null;

		const produtoComRelacoes: Produto = {
			id: id ? Number(id) : 0,
			nomeProduto: data.nomeProduto,
			descricao: data.descricao,
			valorProduto: data.valorProduto,
			imei: imeiValue || "WW-XXXXXX-YYYYYY-Z",
			tempoUso: data.tempoUso,
			valorSeguro: 0,
			premioMensal: 0,
			dataDeCadastro: new Date().toISOString(),
			cobertura: data.cobertura,
			categoria: categoriaSelecionada,
			usuario: usuario,
		} as Produto;

		try {
			if (id !== undefined) {
				await atualizar(`/produto`, produtoComRelacoes, () => {}, {
					headers: { Authorization: token },
				});
				alert("Seguro atualizado com sucesso!");
			} else {
				await cadastrar(`/produto`, produtoComRelacoes, () => {}, {
					headers: { Authorization: token },
				});
				alert("Seguro contratado com sucesso!");
			}
			if (onClose) onClose();
		} catch (error: any) {
			console.error(error);
			const backendMessage = error.response?.data?.message || error.message || "Erro desconhecido ao processar o seguro.";

			alert(backendMessage);
		}

		// setIsLoading(false);
		retornar();
	};

	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			retornar();
		}
	};

	const formatarImeiHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let valor = e.target.value.replace(/[^a-zA-Z0-9]/g, "");

		if (valor.length > 15) valor = valor.substring(0, 15);

		let formattedValue = valor;

		if (formattedValue.length > 12) {
			formattedValue =
				formattedValue.substring(0, 2) +
				"-" +
				formattedValue.substring(2, 8) +
				"-" +
				formattedValue.substring(8, 14) +
				"-" +
				formattedValue.substring(14, 15);
		} else if (formattedValue.length > 8) {
			formattedValue = formattedValue.substring(0, 2) + "-" + formattedValue.substring(2, 8) + "-" + formattedValue.substring(8);
		} else if (formattedValue.length > 2) {
			formattedValue = formattedValue.substring(0, 2) + "-" + formattedValue.substring(2);
		}

		setValue("imei", formattedValue, { shouldValidate: true, shouldDirty: true });
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/40 backdrop-blur-sm" onClick={handleOutsideClick}>
			<div
				className="bg-(--primary-dark)/95 px-8 py-4 rounded-lg backdrop-blur-md shadow-xl w-[90vw] h-[90vh] overflow-y-auto md:h-fit max-w-3xl"
				onClick={(e) => e.stopPropagation()}>
				<div className="text-center">
					<h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar Seguro" : "Contratar Seguro"}</h1>

					<p className="text-gray-200 hidden md:visible">Preencha os dados do dispositivo eletrônico</p>
				</div>

				{/* --- Seção: Informações do Dispositivo --- */}
				<form onSubmit={handleSubmit(gerarNovoProduto)} autoComplete="on">
					<fieldset className="mb-4">
						<legend className="text-md md:text-xl font-bold mb-6 text-gray-200 text-center">Informações do Dispositivo</legend>
						<div className="flex flex-col md:grid md:grid-cols-2 gap-4">
							{/* Tipo de Dispositivo */}
							<div>
								<div className="relative">
									<select
										id="descricao"
										className="block w-full text-sm h-10 px-4 focus:text-white selection:text-white appearance-none focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--tertiary-ex-dark) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--tertiary-light) focus:outline-0 transition-all ease-in bg-(--primary-dark)"
										{...register("descricao", {
											required: "O Tipo de Dispositivo é obrigatório",
											validate: (value) => value !== "" || "Selecione um tipo de dispositivo válido",
										})}>
										<option value="" disabled>
											Selecione o Tipo
										</option>
										{tiposDeDispositivo.map((tipo) => (
											<option key={tipo} value={tipo}>
												{tipo}
											</option>
										))}
									</select>
									<label
										className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
										htmlFor="descricao">
										Tipo de Dispositivo <span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>}
							</div>

							{/* Modelo */}
							<div>
								<div className="input-group">
									<input
										id="nomeProduto"
										type="text"
										className="input h-10 w-full"
										{...register("nomeProduto", { required: "O Modelo é obrigatório" })}
									/>
									<label className="user-label">
										Modelo <span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.nomeProduto && <p className="text-red-500 text-sm mt-1">{errors.nomeProduto.message}</p>}
							</div>

							{/* Valor */}
							<div>
								<div className="input-group">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none"> R$ </span>
									<input
										id="valorProduto"
										type="number"
										className="input h-10 w-full"
										style={{ paddingLeft: "30px" }}
										{...register("valorProduto", {
											required: "O Valor é obrigatório",
											valueAsNumber: true,
											min: { value: 0, message: "O valor deve ser positivo" },
										})}
									/>
									<label className="user-label">
										Valor Pago <span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.valorProduto && <p className="text-red-500 text-sm mt-1">{errors.valorProduto.message}</p>}
							</div>

							{/* Tempo de Uso */}
							<div>
								<div className="input-group">
									<input
										id="tempoUso"
										type="number"
										className="input h-10 w-full"
										{...register("tempoUso", {
											required: "O Tempo de Uso é obrigatório",
											valueAsNumber: true,
											min: { value: 0, message: "O tempo de uso deve ser zero ou positivo" },
										})}
									/>
									<label className="user-label">
										Tempo de Uso <span className="text-(--secondary-light)"> *</span>
									</label>
									<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none"> Meses </span>
								</div>
							</div>

							{/* IMEI Checkbox */}
							<div className="flex flex-col col-span-2 justify-center">
								<div className="flex items-center justify-center space-x-2 my-2">
									<label htmlFor="possuiImei" className="checkbox_container flex gap-2 items-center">
										<input
											id="possuiImei"
											type="checkbox"
											className="h-5 w-5 rounded checkbox"
											{...register("possuiImei")}
											onChange={(e) => {
												setShowImei(e.target.checked);
												if (!e.target.checked) {
													setValue("imei", "", { shouldValidate: true, shouldDirty: true });
												}
											}}
										/>
										<svg viewBox="0 0 64 64" height="2em" width="2em">
											<path
												d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
												pathLength="575.0541381835938"
												className="path"></path>
										</svg>
										Possui IMEI
									</label>
								</div>

								<div className={`transition-all duration-300 h-fit ease-in-out ${showImei ? "h-24 opacity-100 visible" : "h-0 opacity-0 hidden"}`}>
									<div className="input-group">
										<input
											id="imei"
											name="imei"
											type="text"
											className="input h-10 w-full"
											maxLength={18}
											{...register("imei", {
												pattern: {
													value: /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{1}$/,
													message: "O formato deve ser: WW-XXXXXX-YYYYYY-Z",
												},
											})}
											onChange={formatarImeiHandler}
										/>
										<label className="user-label">
											IMEI <span className="text-(--secondary-light)"> *</span>
										</label>
									</div>
									{errors.imei && <p className="text-red-500 text-sm mt-1">{errors.imei.message}</p>}
								</div>
							</div>
						</div>
					</fieldset>

					<fieldset className="mb-4">
						<legend className="text-md md:text-xl font-semibold mb-4 text-white text-center">Informações do Seguro</legend>
						<div className="flex flex-col gap-6">
							{/* Cobertura */}
							<div className="relative">
								<select
									id="cobertura"
									name="cobertura"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--tertiary-ex-dark) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--tertiary-light) focus:outline-0 transition-all ease-in bg-(--primary-dark)"
									{...register("cobertura", { required: "O Plano de Seguro é obrigatório" })}>
									<option selected value="basico">
										Básico
									</option>
									<option value="intermediario"> Intermediário </option>
									<option value="premium"> Premium </option>
								</select>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="cobertura">
									Plano de Seguro
								</label>
								{errors.cobertura && <p className="text-red-500 text-sm mt-1">{errors.cobertura.message}</p>}
							</div>

							{/* Categoria */}
							<div className="relative">
								<select
									id="categoria"
									name="categoria"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--tertiary-ex-dark) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--tertiary-light) focus:outline-0 transition-all ease-in bg-(--primary-dark)"
									{...register("categoriaId", {
										required: "A Categoria é obrigatória",
										valueAsNumber: true,
										min: { value: 1, message: "Selecione uma categoria válida" },
									})}>
									<option value={0} disabled>
										Selecione uma Categoria
									</option>
									{categorias.map((categoria) => (
										<option key={categoria.id} value={categoria.id}>
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
