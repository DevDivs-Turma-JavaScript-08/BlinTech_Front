import { Link } from "react-router-dom";
import CardBeneficios from "../../components/homeComponents/beneficios/CardBeneficios";
import Duvidas from "../../components/homeComponents/faq/Duvidas";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ListaCardSegurosHome from "../../components/cards/cardSegurosHome/ListaCardSegurosHome";
import CtaHome from "../../components/buttons/CtaHome";
import { ToastContainer } from "react-toastify";

function Home() {
	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	// Benefícios
	const beneficios = [
		{
			id: 1,
			icon: "icone",
			title: "Tranquilidade e segurança",
			text: "Em parceria com a CNSeg e ENS, referência em seguros e presente em diveros países, oferecemos todo o cuidado a seus aparelhos: você tem cobertura total e imediata ao sair da loja em caso de Roubo e Furto Qualificado.",
		},
		{
			id: 2,
			icon: "icone", // Substitua por um ícone de economia, como uma moeda ou um cofrinho
			title: "Economia que você não espera",
			text: "Evite gastos inesperados com reparos ou substituição do seu aparelho. Nossa cobertura oferece a tranquilidade de saber que, mesmo em imprevistos, seu bolso estará protegido de grandes despesas.",
		},
		{
			id: 3,
			icon: "icone", // Substitua por um ícone de relógio ou de uma flecha
			title: "Atendimento ágil, sem burocracia",
			text: "Problemas acontecem, e a gente entende a sua pressa. Por isso, nosso atendimento é 100% digital, com acionamento do seguro e suporte em poucos cliques. Resolva tudo de forma rápida e descomplicada, onde você estiver.",
		},
		{
			id: 4,
			icon: "icone", // Substitua por um ícone de um escudo ou cadeado
			title: "Proteção ainda mais completa",
			text: "Roubo e Furto Qualificado são apenas o começo. Nossa cobertura estendida também protege seu aparelho contra danos acidentais, como quebra da tela, danos por líquido e outros imprevistos que podem comprometer o uso do seu eletrônico.",
		},
	];

	// FAQ
	const faqs = [
		{
			id: 1,
			summary: "O que é a BlinTech?",
			details:
				"A BlinTech é uma empresa especializada em seguros para dispositivos eletrônicos, garantindo proteção contra roubos, furtos, quedas, danos elétricos e muito mais.",
		},
		{
			id: 2,
			summary: "Quais dispositivos posso segurar?",
			details: "Você pode segurar smartphones, notebooks, tablets, desktops e outros dispositivos eletrônicos de uso pessoal ou profissional.",
		},
		{
			id: 3,
			summary: "O seguro cobre quedas acidentais?",
			details:
				"Sim! Um dos nossos diferenciais é justamente cobrir acidentes comuns, como quedas, derramamento de líquidos e outros imprevistos do dia a dia.",
		},
		{
			id: 4,
			summary: "Como faço para acionar o seguro?",
			details:
				"Basta entrar em contato com a nossa central de atendimento 24h pelo app ou pelo site. Nosso time orienta você em todo o processo de acionamento.",
		},
		{
			id: 5,
			summary: "Posso contratar online?",
			details:
				"Sim. Todo o processo de contratação é 100% digital, rápido e seguro. Em poucos cliques você já garante a proteção do seu dispositivo.",
		},
		{
			id: 6,
			summary: "Há carência no seguro?",
			details:
				"Sim! Cada seguro conta com um período de carência determinado. Sua apólice é ativada, seu dispositivo já está protegido pela BlinTech.",
		},
	];

	return (
		<main className="flex flex-col w-full bg-(--primary-ex-dark) text-white">
			{/* Hero */}

			<section className="md:h-[600px] h-[450px] w-full flex flex-col justify-center md:bg-[url(https://i.imgur.com/mU1UVb3.png)] bg-[url(https://i.imgur.com/rgMwbtp.png)] bg-cover bg-center bg-no-repeat md:gap-30 gap-15 md:pl-12 pl-4">
				<div>
					<h1 className="md:mt-20 text-5xl font-bold text-shadow-[0_0px_5px_rgb(0_0_0_/_0.9)]">
						SEGURO PARA <br /> SEUS ELETRÔNICOS
					</h1>
					<p className="mt-4"> Tranquilidade e proteção completa para os seus aparelhos favoritos. </p>
				</div>

				<div className="md:pl-12 pl-4 w-full">
					<Link to={token !== "" ? `/produtos` : `/login`} className="w-fit">
						<CtaHome />
					</Link>

					<p className="mt-4">
						Não espere o <span className="font-bold"> imprevisto </span>. Segurança completa a um clique!
					</p>
				</div>
			</section>

			{/* Beneficios */}
			<section className="bg-[url(https://i.imgur.com/HPqDoFo.png)] h-fit md:py-30 gap-4 flex flex-col items-center md:p-8 py-8">
				<div className="text-center">
					<h2 className="text-4xl sm:text-6xl font-bold"> Benefícios </h2>
					<p> Quais os benefícios do meu seguro?</p>
				</div>
				<div className="flex flex-col md:flex-row justify-center items-center gap-7 px-4 py-4 w-full max-w-7xl md:w-full">
					{beneficios.map((beneficio) => (
						<CardBeneficios key={beneficio.id} beneficios={beneficio} />
					))}
				</div>
			</section>

			{/* Categorias */}
			{token !== "" ? <ListaCardSegurosHome /> : <> </>}

			{/* FAQ */}
			<section className="bg-(--primary-ex-dark) bg-[url(https://i.imgur.com/3dP6eJR.png)] bg-repeat-x flex h-fit w-full flex-col justify-center items-center mb-4 p-4 gap-8 py-30">
				<h2 className="text-4xl sm:text-6xl font-bold"> Dúvidas Frequentes </h2>
				<div className="w-full flex flex-col gap-2 md:px-30">
					{faqs.map((faq) => (
						<Duvidas key={faq.id} faqs={faq} />
					))}
				</div>
			</section>
			<ToastContainer />
		</main>
	);
}

export default Home;
