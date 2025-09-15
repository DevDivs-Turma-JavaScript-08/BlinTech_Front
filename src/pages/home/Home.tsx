// import CategoriaForm from "../../components/categorias/categoriaForm/CategoriaForm";
// import ProdutosForm from "../../components/produtos/produtosForm/ProdutosForm";

import CardBeneficios from "../../components/homeComponents/beneficios/CardBeneficios";
import Duvidas from "../../components/homeComponents/faq/Duvidas";

function Home() {
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
		<div className="flex flex-col w-full">
			<div className="bg-gray-400 h-[70px]"> Navbar </div>

			{/* Hero */}
			<section className="bg-amber-200 h-[500px] flex items-end">
				<div className="ml-30 mb-30">
					<button className="rounded-2xl bg-gray-300 w-fit h-fit px-6 py-2 ">
						<h2>Faça sua cotação!</h2>
					</button>
					<p>Benefícios de fazer uma cotação urgente</p>
				</div>
			</section>

			{/* Beneficios */}
			<section className="bg-amber-500 h-fit gap-10 flex flex-col items-center p-8">
				<div className="text-center">
					<h2 className=""> Benefícios </h2>
					<p> Quais os benefícios do meu seguro?</p>
				</div>
				<div className="flex justify-center bg-amber-200 items-center content-center gap-7 px-6 py-4">
					{beneficios.map((beneficio) => (
						<CardBeneficios key={beneficio.id} beneficios={beneficio} />
					))}
				</div>
			</section>

			{/* Categorias */}
			<section className="bg-amber-700 flex flex-col items-center px-10 py-5 gap-3">
				<h2> Confira nossas categorias de Seguros</h2>
				<div className="bg-gray-400 h-[400px] w-full flex justify-center items-center">Lista de Seguros</div>
			</section>

			{/* FAQ */}
			<section id="ask" className="bg-gray-100 flex h-fit w-full flex-col justify-center items-center my-4 p-4 gap-8">
				<h2 className="text-3xl font-bold"> Dúvidas Frequentes </h2>
				<div className="w-full flex flex-col gap-2 px-30">
					{faqs.map((faq) => (
						<Duvidas key={faq.id} faqs={faq} />
					))}
				</div>
			</section>
		</div>
	);
}

export default Home;
