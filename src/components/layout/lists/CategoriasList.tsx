import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Services";
import { AuthContext } from "../../../contexts/AuthContext";
import CategoriaForm from "../../forms/CategoriaForm";
import CtaCriar from "../../buttons/CtaCriar";
import CardCategorias from "../../cards/cardCategoria/cardCategorias";
import { Flip, toast, ToastContainer } from "react-toastify";

export default function CategoriasList() {
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const [categorias, setCategorias] = useState<Categoria[]>([]);

	const [showForm, setShowForm] = useState(location.pathname !== "/categorias");

	useEffect(() => {
		if (token === "") {
			toast.warning("Você precisa estar logado!", {
				position: "top-center",
				autoClose: 5000,
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
	}, [token, navigate]);

	async function buscarCategorias() {
		try {
			// setIsLoading(true);

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
		buscarCategorias();
	}, [categorias.length]);

	useEffect(() => {
		setShowForm(location.pathname !== "/categorias");
	}, [location.pathname]);

	const handleClose = () => {
		setShowForm(false);
		buscarCategorias();
	};

	const handleDelete = async (id: number) => {
		try {
			await deletar(`/categorias/${id}`, {
				headers: { Authorization: token },
			});
			toast.dismiss();
			toast.success("Categoria excluida com sucesso!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
			setCategorias(categorias.filter((categoria) => categoria.id !== id));
		} catch (error) {
			// console.error("Erro ao excluir categoria: ", error);
			toast.dismiss();
			toast.error("Erro ao excluir categoria.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		}
	};

	return (
		<div className="p-10">
			{/* Botão adicionar categoria (centralizado) */}
			{/* Planos */}
			<h1 className="text-5xl text-white font-bold text-center mb-6"> Nossas Categorias de Seguros </h1>

			<div className="flex items-center justify-center pb-6">
				<div className="relative group">
					<NavLink
						to={"/categorias/criar"}
						className="relative inline-block p-px font-semibold leading-6 text-white hover:text-(--secondary) bg-(--secondary-dark) cursor-pointer rounded-xl shadow-(--secondary) transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
						<span className="absolute inset-0 rounded-xl bg-gradient-to-r from-(--secondary-light) via-(--secondary-ex-light) to-(--secondary) p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

						<span className="relative z-10 block px-6 py-3 rounded-xl bg-(--primary-ex-dark)">
							<div className="relative z-10 flex items-center space-x-2">
								<span className="transition-all duration-500 group-hover:translate-x-1"> Adicionar Categoria </span>
								<svg
									className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
									data-slot="icon"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										clip-rule="evenodd"
										d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
										fill-rule="evenodd"></path>
								</svg>
							</div>
						</span>
					</NavLink>
				</div>
			</div>

			{showForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-(--primary-ex-dark)/75">
					<CategoriaForm onClose={handleClose} />
				</div>
			)}

			<div className=" flex justify-center gap-8 flex-wrap">
				{categorias.map((categoria, index) => (
					<CardCategorias key={index} categoria={categoria} onDelete={handleDelete} />
				))}
			</div>
			<ToastContainer />
		</div>
	);
}
