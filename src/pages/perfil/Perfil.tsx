import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar, deletar } from "../../services/Services";
import type Produto from "../../models/Produto";
import CardProduto from "../../components/cards/cardProduto/CardProduto";
import ModalPerfil from "../../components/forms/ModalPerfil";
import { useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

function formatarCpf(cpf: string): string {
	if (!cpf) return "";
	return cpf
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export default function Perfil() {
	const navigate = useNavigate();
	const [seguros, setSeguros] = useState<Produto[]>([]);
	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	async function buscarProdutos() {
		await buscar("/produto", setSeguros, {
			headers: { Authorization: token },
		});
	}

	useEffect(() => {
		buscarProdutos();
	}, []);

	const usuarioSeguros = seguros.filter((seguro) => seguro.usuario.id === usuario.id);

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
	}, [usuario.token]);

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
			setSeguros(seguros.filter((seguro) => seguro.id !== id));
		} catch (error) {
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

	const tipoUsuario = usuario.tipoDeUsuario.charAt(0).toUpperCase() + usuario.tipoDeUsuario.slice(1);
	const cpfFormatado = formatarCpf(usuario.cpf);

	return (
		<main className="flex flex-col w-full bg-(--primary-ex-dark) text-white items-center pb-20 min-h-screen">
			{/* Seção de Perfil */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="flex flex-col items-center mt-5 md:mt-10 gap-10 w-full max-w-6xl">
				<h1 className="text-5xl font-bold text-center drop-shadow-md">Perfil do Usuário</h1>

				<div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-[90%] md:w-[900px] border border-white/10">
					<motion.img
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="rounded-full w-40 h-40 object-cover border-4 border-(--tertiary)/50 shadow-lg"
						src={usuario.foto || "https://i.imgur.com/Qj1qM3I.png"}
						alt="foto do usuário"
					/>

					<div className="flex flex-col gap-3 text-white w-full md:w-[60%]">
						<h3 className="text-3xl font-semibold">
							{usuario.nome} <span className="text-[1rem] text-(--tertiary)">{tipoUsuario}</span>
						</h3>
						<p className="text-lg">
							<span className="font-semibold">CPF:</span> {cpfFormatado}
						</p>
						<p className="text-lg">
							<span className="font-semibold">Email:</span> {usuario.email}
						</p>

						<div className="mt-4">
							<ModalPerfil />
						</div>
					</div>
				</div>
			</motion.section>

			{/* Seção de Seguros */}
			<section className="mt-10 md:mt-15 flex flex-col items-center w-full max-w-7xl gap-8">
				<h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Meus Seguros</h2>

				<AnimatePresence>
					{usuarioSeguros.length > 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="flex justify-center flex-wrap gap-8 w-full px-4">
							{usuarioSeguros.map((seguro) => (
								<motion.div
									key={seguro.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}>
									<CardProduto seguro={seguro} onDelete={handleDelete} />
								</motion.div>
							))}
						</motion.div>
					) : (
						<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-lg text-gray-300 italic">
							Você ainda não possui seguros cadastrados.
						</motion.p>
					)}
				</AnimatePresence>
			</section>
		</main>
	);
}
