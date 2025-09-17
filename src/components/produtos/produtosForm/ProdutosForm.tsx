import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

function ProdutosForm() {
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
		navigate("/");
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
		<div className="bg-amber-500">
			<form onSubmit={gerarNovoProduto}>
				<fieldset>
					<legend> Formulário de Produto </legend>
					<div>
						<label htmlFor="nomeProduto"> Nome do Produto </label>

						<input
							type="text"
							name="nomeProduto"
							placeholder="Nome do Produto"
							value={produto.nomeProduto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>

					<div>
						<label htmlFor="descricao"> Descricao do produto </label>

						<textarea
							name="descricao"
							placeholder="descricao"
							value={produto.descricao}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
						/>
					</div>

					<div>
						<label htmlFor=""> Tipo de Cobertura </label>
						<select
							id="cobertura"
							name="cobertura"
							className=""
							value={produto.cobertura}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}>
							<option value="basico"> Básico </option>
							<option value="intermediario"> Intermediario </option>
							<option value="premium"> Premium </option>
						</select>
					</div>

					<div>
						<label htmlFor="imei"> IMEI do Produto </label>

						<input
							type="text"
							name="imei"
							placeholder="IMEI"
							value={produto.imei}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>

					<div>
						<label htmlFor="valorProduto"> Valor do Produto </label>
						R$
						<input
							type="number"
							name="valorProduto"
							placeholder="0.000"
							value={produto.valorProduto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
						,00
					</div>

					<div>
						<label htmlFor="tempoUso"> Tempo de Uso (em meses) </label>
						<input
							type="number"
							name="tempoUso"
							placeholder="Meses"
							value={produto.tempoUso}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>

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

					<button type="submit"> Cadastrar </button>
				</fieldset>
			</form>
		</div>
	);
}

export default ProdutosForm;
