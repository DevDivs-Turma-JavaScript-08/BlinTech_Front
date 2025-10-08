import { Link } from "react-router-dom";

export default function CardBeneficiosSeguros() {
	const beneficios = [
		{
			id: 1,
			titulo: "Básico",
			descricao:
				"O Plano Básico garante sua tranquilidade desde o momento da compra. Em parceria com a CNSeg, você tem cobertura total e imediata contra Roubo e Furto Qualificado. A proteção essencial para seu novo dispositivo, com a garantia de quem entende de seguro.",
			imagem: "https://i.imgur.com/SpbW7tb.jpeg",
		},
		{
			id: 2,
			titulo: "Intermediário",
			descricao:
				"Com o Plano Intermediário, você une proteção e economia. Além da cobertura, este seguro te dá até 80% de desconto no valor de um novo aparelho em caso de sinistro, com um limite de R$1.800. Conte com a segurança e a expertise que nos credencia junto à ENS, protegendo seu dispositivo e seu bolso.",
			imagem: "https://i.imgur.com/SpbW7tb.jpeg",
		},
		{
			id: 3,
			titulo: "Premium",
			descricao:
				"O Plano Premium oferece a experiência de proteção definitiva. Em caso de imprevistos, nosso suporte especializado via site ou central te atende rapidamente. Em até 5 dias úteis, você recebe um novo produto, garantindo que sua rotina não pare por nada. Tudo isso com a confiança e a qualidade chancelada pela CNSeg e pela ENS.",
			imagem: "https://i.imgur.com/SpbW7tb.jpeg",
		},
	];

	return (
		<div className="py-10 px-4 h-full text-center">
			<div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
				{beneficios.map((item, index) => (
					<div
						key={index}
						className="w-fit rounded-[20px] bg-(--primary-ex-dark) py-6 px-8 text-center border border-(--tertiary) hover:border-violet-500 transition-colors duration-300">
						<img
							src={item.imagem}
							alt={item.titulo}
							className={`w-20 h-20 mb-6 mx-auto object-contain rounded-full border-3 ${item.id == 1 && `border-(--secondary-ex-light)`} ${
								item.id == 2 && `border-(--secondary-light)`
							} ${item.id == 3 && `border-(--secondary)`} `}
						/>

						<h3 className="text-white pb-2 text-xl font-bold sm:text-2xl">{item.titulo}</h3>
						<span
							className={`${item.id == 1 && `bg-(--secondary-ex-light)`} ${item.id == 2 && `bg-(--secondary-light)`} ${
								item.id == 3 && `bg-(--secondary)`
							} mx-auto mb-6 inline-block h-1 w-[90px] rounded`}></span>

						<p className="text-gray-400 mb-5 text-base leading-relaxed">{item.descricao}</p>

						<div className="flex flex-wrap gap-3">
							<Link
								to="/produtos"
								className="bg-(--primary-light) border-(--primary-light) block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90 hover:bg-(--primary)">
								Contratar Agora
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
