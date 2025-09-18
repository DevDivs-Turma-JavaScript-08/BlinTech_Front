import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Services";
import CardMeuSeguro from "../../cards/cardProduto/CardProduto";
import SegurosForm from "../../forms/ProdutosForm";

function ProdutosList() {
	const navigate = useNavigate();
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const [seguros, setSeguros] = useState<Produto[]>([]);
	const [showForm, setShowForm] = useState(location.pathname !== "/produtos");
	const [currentProductId] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado!");
			navigate("/");
		}
	}, [token, navigate]);

	async function buscarProdutos() {
		try {
			if (usuario.tipoDeUsuario === "Segurado") {
				await buscar("/produto", setSeguros, {
					headers: { Authorization: token },
				});
			}

			if (usuario.tipoDeUsuario === "Segurador") {
				await buscar(`/usuario/${usuario.id}`, setSeguros, {
					headers: { Authorization: token },
				});
			}
		} catch (error: any) {
			console.error("Erro na busca: ", error);
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	useEffect(() => {
		if (token !== "" && usuario.id !== 0) {
			buscarProdutos();
		}
	}, [token, usuario.id, usuario.tipoDeUsuario]);

	useEffect(() => {
		setShowForm(location.pathname !== "/produtos");
	}, [location.pathname]);

	// const handleEdit = (id: number) => {
	// 	setCurrentProductId(id);
	// 	setShowForm(true);
	// };

	const handleDelete = async (id: number) => {
		try {
			await deletar(`/produto/${id}`, {
				headers: { Authorization: token },
			});
			alert("Seguro cancelado com sucesso!");
			setSeguros(seguros.filter((seguro) => seguro.id !== id));
			// buscarProdutos();
		} catch (error: any) {
			console.error("Erro ao excluir produto: ", error);
			alert("Erro ao excluir o produto.");
		}
	};

	const handleClose = () => {
		setShowForm(false);
		buscarProdutos();
	};

	return (
		<div className="flex flex-col items-center justify-center p-8 text-white min-h-[90vh]">
			<h1 className="text-5xl text-white font-bold text-center mb-6">
				{usuario.tipoDeUsuario === "Segurador" ? "Todos os Seguros" : "Meus Seguros"}
			</h1>
			<NavLink to="/produtos/contratar">
				<button className="my-6 border-2 border-(--tertiary) p-3 text-white font-bold rounded-4xl cursor-pointer hover:bg-(--tertiary) transition-all">
					Contrate um novo Seguro
				</button>
			</NavLink>

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/75">
					<SegurosForm key={currentProductId} onClose={handleClose} />
				</div>
			)}

			{seguros.length === 0 ? (
				<div className="text-center p-8 border border-blin-tertiary rounded-lg">
					<p className="text-xl">
						{usuario.tipoDeUsuario === "Segurado" ? "Você ainda não possui nenhum seguro contratado." : "Não há seguros cadastrados na plataforma."}
					</p>
					<Link to="/seguros">
						<button className="mt-4 px-6 py-2 bg-blin-tertiary rounded-lg hover:bg-blin-tertiary-light transition-all">Ver Planos de Seguro</button>
					</Link>
				</div>
			) : (
				<div className="flex justify-center gap-8 w-full flex-wrap max-w-7xl">
					{seguros.map((seguro) => (
						<CardMeuSeguro key={seguro.id} seguro={seguro} onDelete={handleDelete} />
					))}
				</div>
			)}
		</div>
	);
}

export default ProdutosList;
