import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../models/Categoria";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Services";
import CtaCard from "../buttons/CtaCard";
import { Flip, toast, ToastContainer } from "react-toastify";

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
		} catch (error) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			toast.dismiss();
			toast.warning("Você precisa estar logado!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
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

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
				toast.dismiss();
				toast.success("Categoria atualizada com sucesso!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
				if (onClose) onClose();
			} catch (error) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					toast.dismiss();
					toast.error("Erro ao atualizar a categoria.", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: "dark",
						transition: Flip,
					});
				}
			}
		} else {
			try {
				await cadastrar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
				toast.dismiss();
				toast.success("A categoria foi criada com sucesso!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
				if (onClose) onClose();
			} catch (error) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					toast.dismiss();
					toast.error("Erro ao cadastrar a categoria.", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: false,
						progress: undefined,
						theme: "dark",
						transition: Flip,
					});
				}
			}
		}

		console.log(categoria);
		// setIsLoading(false);
		retornar();
	}

	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			retornar();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/40 backdrop-blur-sm" onClick={handleOutsideClick}>
			<div
				className=" w-[80%] md:w-[60%] h-fit max-w-4xl mx-auto bg-(--primary-dark)/80 backdrop-blur-md rounded-2xl p-4 md:p-8 shadow-2xl border border-white/10"
				onClick={(e) => e.stopPropagation()}>
				<div className="text-center mb-2 md:mb-6">
					<h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar a Categoria" : "Cadastrar a Categoria"}</h1>
					<p className="text-violet-100/90 mt-1 md:visible hidden">Preencha os dados da cetegoria</p>
				</div>
				<form onSubmit={gerarNovaCategoria} className="space-y-5">
					<fieldset>
						<legend className="text-white font-semibold text-center mb-4">Informações da Categoria</legend>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="input-group">
								<input name="nome" id="nome" type="text" className="input h-10 w-full" value={categoria.nome} onChange={atualizarEstado} required />
								<label className="user-label">
									Nome da Categoria <span className="text-(--secondary-light)"> *</span>
								</label>
							</div>

							<div className="input-group">
								<input
									name="carencia"
									id="carencia"
									type="number"
									className="input h-10 w-full pr-12 text-left"
									value={categoria.carencia}
									onChange={atualizarEstado}
									min={0}
									required
								/>
								<label className="user-label">
									Carência <span className="text-(--secondary-light)"> *</span>
								</label>

								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none"> Dias </span>
							</div>
						</div>

						<div className="textarea-group">
							<textarea
								name="descricao"
								id="descricao"
								className="textarea h-30 w-full mt-6"
								rows={4}
								value={categoria.descricao}
								onChange={atualizarEstado}
								required
							/>
							<label className="textarea_user-label">
								Descrição <span className="text-(--secondary-light)"> *</span>
							</label>
						</div>

						<div className="flex justify-end gap-4 pt-4">
							<CtaCard
								type="submit"
								text={id !== undefined ? "Atualizar" : "Cadastrar"}
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
					</fieldset>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default CategoriaForm;
