import { useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Services";
import CardMeuSeguro from "./CardMeuSeguro";
import type Usuario from "../../models/Usuario";

function MeusSeguros() {
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const [seguros, setSeguros] = useState<Produto[]>([]);
  const [usuarioLogado] = useState<Usuario>({} as Usuario);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado!");
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		buscarProdutos();
	}, [seguros.length]);

	async function buscarProdutos() {
		try {
			// setIsLoading(true);

			await buscar("/produtos", setSeguros, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		} finally {
			// setIsLoading(false);
		}
	}

  // let component: ReactNode;

  // if (usuario.tipoDeUsuario === "Segurado") {
	// 	component = (
			
	// 	);
	// } else {
  //   component = (
	// 		<div className="flex flex-col items-center justify-center p-8 bg-blin-primary-ex-dark text-white min-h-[90vh]">
	// 			<h1 className="text-4xl font-bold mb-8">Meus Seguros</h1>

	// 			{usuarioLogado.produtos?.length === 0 ? (
	// 				<div className="text-center p-8 border border-blin-tertiary rounded-lg">
	// 					<p className="text-xl">Você ainda não possui nenhum seguro contratado.</p>
	// 					<Link to="/seguros">
	// 						<button className="mt-4 px-6 py-2 bg-blin-tertiary rounded-lg hover:bg-blin-tertiary-light transition-all">Ver Planos de Seguro</button>
	// 					</Link>
	// 				</div>
	// 			) : (
	// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
	// 					{usuarioLogado.produtos?.map((produtos) => (
	// 						<CardMeuSeguro key={produtos.id} seguro={produtos} />
	// 					))}
	// 				</div>
	// 			)}
	// 		</div>
	// 	);
	// }

	return (
		<>
			<div className="flex flex-col items-center justify-center p-8 bg-blin-primary-ex-dark text-white min-h-[90vh]">
				<h1 className="text-4xl font-bold mb-8">Meus Seguros</h1>

				{usuarioLogado.produtos?.length === 0 ? (
					<div className="text-center p-8 border border-blin-tertiary rounded-lg">
						<p className="text-xl">Você ainda não possui nenhum seguro contratado.</p>
						<Link to="/">
							<button className="mt-4 px-6 py-2 bg-blin-tertiary rounded-lg hover:bg-blin-tertiary-light transition-all">Ver Planos de Seguro</button>
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
						{usuarioLogado.produtos?.map((seguro) => (
							<CardMeuSeguro key={seguro.id} seguro={seguro} />
						))}
					</div>
				)}
			</div>
		</>
	);
}

export default MeusSeguros;
