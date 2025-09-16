import type Categoria from "../../../models/Categoria";

interface CardSegurosHomeProps {
  seguros: Categoria;
}

function CardSegurosHome({ seguros }: CardSegurosHomeProps) {
	return (
		<div className="w-64 p-5 rounded-2xl bg-gray-600 text-white flex flex-col items-start gap-4 shadow-lg">
			<div className="w-full flex justify-between items-start">
				<div>
					<h4 className="font-semibold text-lg">{seguros.nome}</h4>
				</div>

				<div className="text-right">
					<p className="text-xs text-gray-300">Carência:</p>
					<span className="font-bold text-sm">{seguros.carencia} dias</span>
				</div>
			</div>

			<p className="text-sm text-gray-200">{seguros.descricao}</p>

			{/* Marcas como "pills" */}
			{/* <div className="mt-2 flex flex-wrap gap-2">
				{seguros.marcas.map((m) => (
					<span key={m} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20" title={`Marca: ${m}`}>
						{m}
					</span>
				))}
			</div> */}
		</div>
	);
};

export default CardSegurosHome;
