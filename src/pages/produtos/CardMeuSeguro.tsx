import { Link } from "react-router-dom";
import type Produto from "../../models/Produto";

interface CardMeuSeguroProps {
	seguro: Produto;
}

function CardMeuSeguro({ seguro }: CardMeuSeguroProps) {
	return (
		<div key={seguro.id} className="flex flex-col bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
			<h2 className="text-2xl font-semibold text-blin-secondary">{seguro.nomeProduto}</h2>

			<div className="flex-1">
				<p className="text-gray-300 mb-2">
					<span className="font-medium text-blin-tertiary">Cobertura:</span> {seguro.cobertura}
				</p>
				<p className="text-gray-300 mb-2">
					<span className="font-medium text-blin-tertiary">Descrição:</span> {seguro.descricao}
				</p>
				<p className="text-gray-300 mb-2">
					<span className="font-medium text-blin-tertiary">Tempo de Uso:</span> {seguro.tempoUso}
				</p>
				<p className="text-gray-300">
					<span className="font-medium text-blin-tertiary">Contratado em:</span>{" "}
					{new Intl.DateTimeFormat("pt-BR", {
						dateStyle: "full",
						timeStyle: "medium",
					}).format(new Date(seguro.dataDeCadastro))}
				</p>
				<p className="text-gray-300">
					<span className="font-medium text-blin-tertiary">Valor do Premio Mensal:</span> {seguro.premioMensal}
				</p>
				<p className="text-gray-300">
					<span className="font-medium text-blin-tertiary">Valor do Produto:</span> {seguro.valorProduto}
				</p>
				<p className="text-gray-300">
					<span className="font-medium text-blin-tertiary">Valor do Seguro:</span> {seguro.valorSeguro}
				</p>
				<p className="text-gray-300">
					<span className="font-medium text-blin-tertiary">Valor do Seguro:</span> {seguro.categoria?.nome}
				</p>
				{seguro.imei ? (
					<p className="text-gray-300">
						<span className="font-medium text-blin-tertiary">IMEI:</span> {seguro.valorSeguro}
					</p>
				) : (
					<></>
				)}
			</div>

			<div className="mt-6 flex justify-between gap-4">
				<Link to={`/produtos/editar/${seguro.id}`} className="flex-1">
					<button className="w-full px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">Editar</button>
				</Link>
				<Link to={`/produtos/deletar/${seguro.id}`} className="flex-1">
					<button className="flex-1 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">Excluir</button>
				</Link>
			</div>
		</div>
	);
}

export default CardMeuSeguro;
