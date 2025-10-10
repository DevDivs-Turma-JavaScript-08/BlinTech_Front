import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar, deletar } from "../../services/Services";
import type Produto from "../../models/Produto";
import CardProduto from "../../components/cards/cardProduto/CardProduto";
import ModalPerfil from "../../components/forms/ModalPerfil";
import { useNavigate } from "react-router-dom";

export default function Perfil() {

	const navigate = useNavigate();
	const [seguros, setSeguros] = useState<Produto[]>([]);
	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	//isso atualiza o valor de seguros com o getAll do buscar da service
	async function buscarProdutos() {
		await buscar("/produto", setSeguros, {
			headers: { Authorization: token },
		});
	}

	useEffect(() => {
		buscarProdutos();
	}, []);

	const usuarioSeguros = seguros.filter((seguro) => seguro.usuario.id === usuario.id);

	// console.log("teste 2: ", seguros);

	useEffect(() => {
		if (token === "") {
			alert("Você precisa estar logado");
			navigate("/");
		}
	}, [usuario.token]);

	const handleDelete = async (id: number) => {
		try {
			await deletar(`/produto/${id}`, {
				headers: { Authorization: token },
			});
			alert("Seguro cancelado com sucesso!");
			setSeguros(seguros.filter((seguro) => seguro.id !== id));
			// buscarProdutos();
		} catch (error) {
			console.error("Erro ao excluir produto: ", error);
			alert("Erro ao excluir o produto.");
		}
	};

	return (
		<main className="items-center mt-10">
			<div className="flex flex-col items-center">
				<div className="flex gap-8 rounded-3xl p-5 bg-white w-[500px] h-[300px] ">
					<img className="rounded-full h-35 w-35" src={usuario.foto} alt="foto" />
					<div className="flex flex-col gap-2 w-[300px]">
						<h3 className="font-semibold text-2xl">{usuario.nome}</h3>
						<p>CPF: {usuario.cpf}</p>
						<p>Email: {usuario.email}</p>
						<p>nome: {usuario.nome}</p>

						<div>
							<ModalPerfil />
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center mt-7 gap-7">
					<h1 className="text-white text-3xl">seguros efetuados</h1>
					<div className="flex justify-center gap-8 w-full flex-wrap max-w-7xl">
						{usuarioSeguros.map((seguro) => (
							<CardProduto key={seguro.id} seguro={seguro} onDelete={handleDelete} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
