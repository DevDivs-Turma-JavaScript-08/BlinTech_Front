import { useContext, useEffect } from "react";
import CardEscolha from "../../components/cards/cardMotivos/CardMotivos";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CardBeneficiosSeguros from "../../components/cards/cardServicos/CardBeneficiosSeguros";
import CtaServicos from "../../components/buttons/CtaServiços";
import { ToastContainer } from "react-toastify";

export default function PaginaServicos() {
	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	useEffect(() => {
		if (usuario.token !== "") {
			// console.log(usuario);
		}
	}, [usuario.token]);

	return (
		<main className="flex flex-col w-full min-h-screen gap-3 text-white">
			{/* orcamento */}
			<section className="w-full">
				<div className="bg-[url(https://i.imgur.com/G4pfZ69.png)] bg-repeat-x bg-contain p-4 md:p-7 h-[350px] flex items-center justify-center flex-col gap-5 text-white text-center">
					<h1 className="text-5xl md:text-6xl font-bold">Proteja seus eletronicos com seguranca</h1>

					<p className="text-[19px]">Diversos tipos de cobertura, escolha aquele que entre no seu bolso</p>

					<div className="flex gap-5 text-black md:mt-9">
						<Link to={token !== "" ? `/produtos` : `/login`}>
							<CtaServicos />
						</Link>
					</div>
				</div>
			</section>

			{/* seccao produtos */}
			<section className="text-center py-10">
				<h1 className="text-3xl font-semibold">Nossos Produtos</h1>
				<p className="">Escolha o plano ideal para seus dispositivos</p>
				<div>
					<CardBeneficiosSeguros />
				</div>
			</section>

			{/* por que nos escolher? */}
			<section className="text-center text-3xl pb-10">
				<h1 className="font-semibold">Por que escolher a BlinTech?</h1>
				<CardEscolha />
			</section>
			<ToastContainer />
		</main>
	);
}
