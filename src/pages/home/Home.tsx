// import CategoriaForm from "../../components/categorias/categoriaForm/CategoriaForm";
// import ProdutosForm from "../../components/produtos/produtosForm/ProdutosForm";

import CardSegurosHome from "../../components/cards/cardSeguros/CardSegurosHome";
import CardBeneficios from "../../components/homeComponents/beneficios/CardBeneficios";
import Duvidas from "../../components/homeComponents/faq/Duvidas";
// import useCarousel from "../../hooks/useCarousel";

function Home() {

  // // Carrousel
  // const carouselOptions = {
  //   slidesPerPage: 4,
  //   Navigation: true,
  //   Dots: true,
  // };

  // const [carouselRef] = useCarousel(carouselOptions);

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
			<section className="h-[600px] flex flex-col justify-center bg-[url(https://i.imgur.com/mU1UVb3.png)] bg-cover bg-center bg-no-repeat gap-30 pl-12">
				<div>
					<h1 className="mt-20 text-5xl font-bold text-shadow-[0_0px_5px_rgb(0_0_0_/_0.9)]">
						SEGURO PARA <br /> SEUS ELETRÔNICOS
					</h1>
					<p className="mt-4"> Tranquilidade e proteção completa para os seus aparelhos favoritos. </p>
				</div>

				<div className="pl-12">
					<button className="cta flex items-center">
						<span className="span"> Proteja já seu aparelho! </span>
						<span className="second">
							<svg width="50px" height="20px" viewBox="0 0 66 43" version="1.1">
								<g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									<path
										className="one"
										d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
										fill="#FFFFFF"></path>
									<path
										className="two"
										d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
										fill="#FFFFFF"></path>
									<path
										className="three"
										d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
										fill="#FFFFFF"></path>
								</g>
							</svg>
						</span>
					</button>

					<p className="mt-4">
						Não espere o <span className="font-bold"> imprevisto</span>. Segurança completa a um clique!
					</p>
				</div>
			</section>

			{/* Beneficios */}
			<section className="bg-[url(https://i.imgur.com/HPqDoFo.png)] h-fit gap-4 flex flex-col items-center p-8">
				<div className="text-center">
					<h2 className="text-6xl font-bold"> Benefícios </h2>
					<p> Quais os benefícios do meu seguro?</p>
				</div>
				<div className="flex justify-center items-center content-center gap-7 px-4 py-4">
					{beneficios.map((beneficio) => (
						<CardBeneficios key={beneficio.id} beneficios={beneficio} />
					))}
				</div>
			</section>

			{/* Categorias */}
			<section className="bg-[url(https://i.imgur.com/jh5VGgQ.png)] bg-repeat-x bg-(--tertiary) flex flex-col items-center px-10 pb-5 pt-20 gap-8">
				<h2 className="text-(--primary-dark) text-4xl font-bold"> Confira nossas categorias de Seguros</h2>
				<div className="flex gap-6">
					<CardSegurosHome />
					<CardSegurosHome />
					<CardSegurosHome />
				</div>

				{/* <div ref={carouselRef} className="f-carouse overflow-clip w-[80vw]">
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
					<div className="f-carousel__slide w-[25%]">
						<CardSegurosHome />
					</div>
				</div> */}
			</section>

			{/* FAQ */}
			<section className="bg-(--primary-ex-dark) bg-[url(https://i.imgur.com/3dP6eJR.png)] bg-repeat-x flex h-fit w-full flex-col justify-center items-center mb-4 pt-20 p-4 gap-8">
				<h2 className="text-5xl text-white font-bold"> Dúvidas Frequentes </h2>
				<div className="w-full flex flex-col gap-2 px-30">
					{faqs.map((faq) => (
						<Duvidas key={faq.id} faqs={faq} />
					))}
				</div>
			</section>
		</main>
	);
}

export default Home;
