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

	const tipoUsuario = usuario.tipoDeUsuario.charAt(0).toUpperCase() + usuario.tipoDeUsuario.slice(1);

	return (
		<main className="flex flex-col w-full bg-(--primary-ex-dark) text-white items-center pb-20 min-h-screen">
      
			{/* Seção de Perfil */}
			<section className="flex flex-col items-center mt-5 md:mt-10 gap-10 w-full max-w-6xl">
				<h1 className="text-5xl font-bold text-center drop-shadow-md">Perfil do Usuário</h1>

				<div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-[90%] md:w-[900px] border border-white/10">
					<img
						className="rounded-full w-40 h-40 object-cover border-4 border-(--tertiary)/50 shadow-lg"
						src={usuario.foto || "https://i.imgur.com/Qj1qM3I.png"}
						alt="foto do usuário"
					/>

					<div className="flex flex-col gap-3 text-white w-full md:w-[60%]">
						<h3 className="text-3xl font-semibold">
							{usuario.nome} <span className="text-[1rem] text-(--tertiary)">{tipoUsuario}</span>{" "}
						</h3>
						<p className="text-lg">
							<span className="font-semibold">CPF:</span> {usuario.cpf}
						</p>
						<p className="text-lg">
							<span className="font-semibold">Email:</span> {usuario.email}
						</p>

						<div className="mt-4">
							<ModalPerfil />
						</div>
					</div>
				</div>
			</section>

			{/* Seção de Seguros */}
			<section className="mt-20 flex flex-col items-center w-full max-w-7xl gap-8">
				<h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Meus Seguros</h2>

				{usuarioSeguros.length > 0 ? (
					<div className="flex justify-center flex-wrap gap-8 w-full px-4">
						{usuarioSeguros.map((seguro) => (
							<CardProduto key={seguro.id} seguro={seguro} onDelete={handleDelete} />
						))}
					</div>
				) : (
					<p className="text-lg text-gray-300 italic">Você ainda não possui seguros cadastrados.</p>
				)}
			</section>
		</main>
	);
}
