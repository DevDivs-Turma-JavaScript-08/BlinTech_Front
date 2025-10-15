import { useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Services";
import CardMeuSeguro from "../../cards/cardProduto/CardProduto";
import SegurosForm from "../../forms/ProdutosForm";
import CtaCriar from "../../buttons/CtaCriar";
import { Flip, toast, ToastContainer } from "react-toastify";

function ProdutosList() {
	const navigate = useNavigate();
	const location = useLocation();
	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const [seguros, setSeguros] = useState<Produto[]>([]);
	const [showForm, setShowForm] = useState(location.pathname !== "/produtos");
	const [currentProductId] = useState<number | undefined>(undefined);

	const usuarioSeguros = seguros.filter((seguro) => seguro.usuario.id === usuario.id);

	const buscarProdutos = useCallback(async () => {
		try {
			await buscar("/produto", setSeguros, {
				headers: { Authorization: token },
			});
		} catch (error) {
			// console.error("Erro na busca: ", error);
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}, [token, setSeguros, handleLogout]);

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

	useEffect(() => {
		if (token !== "" && usuario.id !== 0) {
			buscarProdutos();
		}
	}, [token, usuario.id, usuario.tipoDeUsuario, buscarProdutos]);

	useEffect(() => {
		setShowForm(location.pathname !== "/produtos");
	}, [location.pathname]);

	// const handleEdit = (id: number) => {
	// setCurrentProductId(id);
	// setShowForm(true);
	// };

	const handleDelete = async (id: number) => {
		try {
			await deletar(`/produto/${id}`, {
				headers: { Authorization: token },
			});
			toast.dismiss();
			toast.success("Seguro cancelado com sucesso!", {
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
			buscarProdutos();
		} catch (error) {
			// console.error("Erro ao excluir produto: ", error);
			toast.dismiss();
			toast.error("Erro ao cancelar seguro.", {
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

	const handleClose = () => {
		setShowForm(false);
		buscarProdutos();
	};

	let component: ReactNode;
	if (usuario.tipoDeUsuario === "segurador") {
		component = (
			<div className="flex justify-center gap-8 w-full flex-wrap max-w-7xl">
				{seguros.map((seguro) => (
					<CardMeuSeguro key={seguro.id} seguro={seguro} onDelete={handleDelete} />
				))}
			</div>
		);
	} else {
		component = (
			<div className="flex justify-center gap-8 w-full flex-wrap max-w-7xl">
				{usuarioSeguros.map((seguro) => (
					<CardMeuSeguro key={seguro.id} seguro={seguro} onDelete={handleDelete} />
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-start p-8 text-white min-h-[90vh]">
			<h1 className="text-5xl text-white font-bold text-center mb-6">
				{usuario.tipoDeUsuario === "segurador" ? "Todos os Seguros" : "Meus Seguros"}
			</h1>

			<div className="flex items-center justify-center pb-6">
				<div className="relative group">
					<NavLink to={"/produtos/contratar"} className="relative inline-block p-px font-semibold leading-6 text-white hover:text-(--tertiary) bg-(--tertiary-dark) cursor-pointer rounded-xl shadow-(--tertiary) transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
						<span className="absolute inset-0 rounded-xl bg-gradient-to-r from-(--tertiary-light) via-(--tertiary-ex-light) to-(--tertiary) p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

						<span className="relative z-10 block px-6 py-3 rounded-xl bg-(--primary-ex-dark)">
							<div className="relative z-10 flex items-center space-x-2">
								<span className="transition-all duration-500 group-hover:translate-x-1"> Contratar Seguro </span>
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
					<SegurosForm key={currentProductId} onClose={handleClose} />
				</div>
			)}

			{seguros.length === 0 || usuarioSeguros.length === 0 ? (
				<div className="text-center p-8 border border-blin-tertiary rounded-lg">
					<p className="text-xl">
						{usuario.tipoDeUsuario === "segurado" ? `Você ainda não possui nenhum seguro contratado.` : `Não há seguros cadastrados na plataforma.`}
					</p>
					<Link to="/servicos">
						<button className="mt-4 px-6 py-2 bg-blin-tertiary rounded-lg hover:bg-blin-tertiary-light transition-all">Ver Planos de Seguro</button>
					</Link>
				</div>
			) : (
				component
			)}
      <ToastContainer />
		</div>
	);
}

export default ProdutosList;
