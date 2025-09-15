type Beneficios = {
	id: number;
	icon: string;
	title: string;
	text: string;
};

function CardBeneficios({ beneficios }: { beneficios: Beneficios }) {
	return (
		<div className="flex flex-col items-start gap-4 p-8 w-[25%] border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
			<div className="text-3xl text-blue-600">{beneficios.icon}</div>
      <hr className="text-red-400"/>
			<div className="flex flex-col gap-2">
				<h3 className="text-lg text-center font-semibold text-gray-800">{beneficios.title}</h3>
				<p className="text-sm text-gray-600 leading-relaxed">{beneficios.text}</p>
			</div>
		</div>
	);
}

export default CardBeneficios;
