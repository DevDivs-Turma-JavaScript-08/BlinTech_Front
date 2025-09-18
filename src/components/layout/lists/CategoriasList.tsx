import { NavLink, useNavigate } from "react-router-dom";
import CardCategorias from "../../cards/cardCategorias/CardCategorias";
import { useContext, useEffect, useState } from "react";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext";
import CategoriaForm from "../../forms/CategoriaForm";

export default function CategoriasList() {
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [showForm, setShowForm] = useState(location.pathname !== "/categorias");

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado!");
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		buscarCategorias();
	}, [categorias.length]);

	async function buscarCategorias() {
		try {
			// setIsLoading(true);

			await buscar("/categorias", setCategorias, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	useEffect(() => {
		setShowForm(location.pathname !== "/categorias");
	}, [location.pathname]);

	const handleClose = () => {
		setShowForm(false);
		buscarCategorias();
	};

	const handleDelete = async (id: number) => {
		try {
			await deletar(`/produto/${id}`, {
				headers: { Authorization: token },
			});
			alert("Seguro cancelado com sucesso!");
			setCategorias(categorias.filter((categoria) => categoria.id !== id));
			// buscarProdutos();
		} catch (error: any) {
			console.error("Erro ao excluir produto: ", error);
			alert("Erro ao excluir o produto.");
		}
	};

	return (
		<div className="p-10">
			{/* Botão adicionar categoria (centralizado) */}
			{/* Planos */}
			<h2 className="text-5xl text-white font-bold text-center mb-6"> Nossas Categorias de Seguros </h2>

			<div className="flex justify-center mb-10">
				<NavLink
					to={"/categorias/criar"}
					className="my-6 border-2 border-(--secondary) p-3 text-white font-bold rounded-4xl cursor-pointer hover:bg-(--secondary) transition-all">
					Adicionar Categoria
				</NavLink>
			</div>

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/75">
					<CategoriaForm onClose={handleClose} />
				</div>
			)}

			<div className=" flex justify-center gap-8 flex-wrap">
				{categorias.map((categoria) => (
					<CardCategorias categoria={categoria} onDelete={handleDelete} />
				))}
			</div>
		</div>
	);
}
