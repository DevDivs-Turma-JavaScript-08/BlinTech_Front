import { useContext, useEffect } from "react";
import CardEscolha from "../../components/cards/cardMotivos/CardMotivos";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CardBeneficiosSeguros from "../../components/cards/cardServicos/CardBeneficiosSeguros";
import CtaServicos from "../../components/buttons/CtaServiços";
import { motion, AnimatePresence } from "framer-motion";

export default function PaginaServicos() {
	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	useEffect(() => {
		if (usuario.token !== "") {
			// console.log(usuario);
		}
	}, [usuario.token]);

	return (
		<AnimatePresence mode="wait">
			<motion.main
				className="flex flex-col w-full min-h-screen gap-3 text-white"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				{/* Hero / orçamento */}
				<motion.section
					className="w-full"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<div className="bg-[url(https://i.imgur.com/G4pfZ69.png)] bg-repeat-x bg-contain p-4 md:p-7 h-[350px] flex items-center justify-center flex-col gap-5 text-white text-center">
						<h1 className="text-5xl md:text-6xl font-bold">Proteja seus eletronicos com seguranca</h1>

						<p className="text-[19px]">Diversos tipos de cobertura, escolha aquele que entre no seu bolso</p>

						<div className="flex gap-5 text-black md:mt-9">
							<Link to={token !== "" ? `/produtos` : `/login`}>
								<CtaServicos />
							</Link>
						</div>
					</div>
				</motion.section>

				{/* Sessão produtos */}
				<motion.section
					className="text-center py-10"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<h1 className="text-3xl font-semibold">Nossos Produtos</h1>
					<p className="">Escolha o plano ideal para seus dispositivos</p>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}>
						<CardBeneficiosSeguros />
					</motion.div>
				</motion.section>

				{/* por que nos escolher? */}
				<motion.section
					className="text-center text-3xl pb-10"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<h1 className="font-semibold">Por que escolher a BlinTech?</h1>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}>
						<CardEscolha />
					</motion.div>
				</motion.section>
			</motion.main>
		</AnimatePresence>
	);
}
