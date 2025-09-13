import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

function CategoriaForm() {
	const navigate = useNavigate();

	const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		navigate("/home");
	}

	async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);
		console.log(categoria);

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, { headers: { Authorization: token } });
				alert("A categoria foi atualizada com sucesso!");
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
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					alert("Erro ao cadastrar a categoria.");
				}
			}
		}

		setIsLoading(false);
		retornar();
	}

	return (
		<div>
			CategoriaForm
			<form onSubmit={gerarNovaCategoria}>
				<div>
					<label htmlFor="nome"> Nome da Categoria </label>
					<input
						type="text"
						name="nome"
						placeholder="Nome da Categoria"
						value={categoria.nome}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<div>
					<label htmlFor="descricao"> Descrição do Seguro </label>
					<textarea
						name="descricao"
						placeholder="Descreva o seguro"
						value={categoria.descricao}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
					/>
				</div>
				<div>
					<label htmlFor="carencia"> Período de Carência (em dias) </label>
					<input
						type="number"
						name="carencia"
						placeholder="Período de carência"
						value={categoria.carencia}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<button type="submit"> Cadastrar </button>
			</form>
		</div>
	);
}

export default CategoriaForm;
