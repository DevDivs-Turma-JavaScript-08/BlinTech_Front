import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

interface CategoriasFormProps {
	onClose?: () => void;
}

function CategoriaForm({ onClose }: CategoriasFormProps) {
	const navigate = useNavigate();

	const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const { usuario, handleLogout } = useContext(AuthContext);

	const token = usuario.token;

	const { id } = useParams<{ id: string }>();

	async function buscarPorId(id: string) {
		try {
			await buscar(`/categorias/${id}`, setCategoria, { headers: { Authorization: token } });
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
		if (id !== undefined) {
			buscarPorId(id);
		}
	}, [id]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setCategoria({
			...categoria,
			[e.target.name]: e.target.value,
		});
	}

	function retornar() {
		navigate("/categorias");
	}

	async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// setIsLoading(true);
		console.log(categoria);

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
				alert("A categoria foi atualizada com sucesso!");
				if (onClose) onClose();
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Erro ao atualizar a categoria.");
				}
			}
		} else {
			try {
				await cadastrar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
				alert("A categoria foi criada com sucesso!");
				if (onClose) onClose();
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Erro ao cadastrar a categoria.");
				}
			}
		}

		// setIsLoading(false);
		retornar();
	}

	return (
		<div className="min-h-[70vh] w-full py-10">
			<div className="max-w-4xl mx-auto bg-(--primary-dark)/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10">
				<div className="text-center mb-6">
					<h1 className="text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar a Categoria" : "Cadastrar a Categoria"}</h1>
					<p className="text-violet-100/90 mt-1">Preencha os dados da cetegoria</p>
				</div>
				<form onSubmit={gerarNovaCategoria} className="space-y-5">
					<fieldset>
						<legend className="text-(--secondary) font-semibold text-center mb-4">Informações da Categoria</legend>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="relative" id="input">
								<input
									type="text"
									name="nome"
									placeholder="Nome da Categoria"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={categoria.nome}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="nome">
									Nome da Categoria *
								</label>
							</div>

							<div className="relative" id="input">
								<input
									type="number"
									name="carencia"
									min={0}
									placeholder="Carência (em dias)"
									className="block w-full text-sm h-10 px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
									value={categoria.carencia}
									onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="carencia">
									Dias de Carência *
								</label>
							</div>
						</div>

						<div className="relative" id="input">
							<textarea
								rows={4}
								name="descricao"
								placeholder="Descreva a categoria do seguro"
								className="block w-full mt-4 text-sm px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
								value={categoria.descricao}
								onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
							/>
							<label
								className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
								htmlFor="descricao">
								Descrição da Categoria *
							</label>
						</div>

						<div className="flex justify-end gap-3 pt-2">
							<button
								type="button"
								onClick={retornar}
								className="px-6 py-3 outline-2 outline-(--secondary-dark) text-(--secondary) hover:text-white rounded-lg font-semibold hover:bg-(--secondary) transition-colors hover:cursor-pointer">
								Cancelar
							</button>
							<button
								type="submit"
								className="px-6 py-3 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-900 transition-colors hover:cursor-pointer hover:outline-2 hover:outline-(--tertiary)">
								{id !== undefined ? "Atualizar" : "Criar"}
							</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
}

export default CategoriaForm;
