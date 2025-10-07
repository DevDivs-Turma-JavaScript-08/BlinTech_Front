import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../models/Categoria";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Services";
import CtaCard from "../buttons/CtaCard";
import InputField from "./inputs/InputField";
import TextAreaField from "./inputs/TextAreaField";

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
			} catch (error) {
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
			} catch (error) {
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

	const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			retornar();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/40 backdrop-blur-sm" onClick={handleOutsideClick}>
			<div
				className="max-w-4xl mx-auto bg-(--primary-dark)/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10"
				onClick={(e) => e.stopPropagation()}>
				<div className="text-center mb-6">
					<h1 className="text-5xl font-bold mb-2 text-white">{id !== undefined ? "Atualizar a Categoria" : "Cadastrar a Categoria"}</h1>
					<p className="text-violet-100/90 mt-1">Preencha os dados da cetegoria</p>
				</div>
				<form onSubmit={gerarNovaCategoria} className="space-y-5">
					<fieldset>
						<legend className="text-white font-semibold text-center mb-4">Informações da Categoria</legend>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<InputField
								name="nome"
								type="text"
								placeholder="Nome da Categoria"
								label="Nome da Categoria"
								value={categoria.nome}
								onChange={atualizarEstado}
								required
							/>

							<InputField
								name="carencia"
								type="number"
								placeholder="Dias de Carência"
								label="Carência (dias)"
								value={categoria.carencia}
								onChange={atualizarEstado}
								required
							/>
						</div>

						<TextAreaField
							name="descricao"
							placeholder="Descreva a categoria do seguro"
							rows={4}
							value={categoria.descricao}
							onChange={atualizarEstado}
							label="Descrição da Categoria"
							required
						/>

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
		</div>
	);
}

export default CategoriaForm;
