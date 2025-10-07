type Beneficios = {
	id: number;
	icon: string;
	title: string;
	text: string;
};

function CardBeneficios({ beneficios }: { beneficios: Beneficios }) {
	return (
		<div className="flex flex-col items-start gap-4 p-8 md:w-[25%] border-2 border-(--tertiary) rounded-bl-4xl rounded-br-xl rounded-tr-4xl rounded-tl-xl shadow-sm hover:shadow-lg transition-shadow duration-300 bg-(--primary) text-white">
			<hr className="" />
			<div className="flex flex-col gap-2">
				<h3 className="text-lg text-center font-bold ">{beneficios.title}</h3>
				<p className="text-sm leading-relaxed">{beneficios.text}</p>
			</div>
		</div>
	);
}

export default CardBeneficios;
