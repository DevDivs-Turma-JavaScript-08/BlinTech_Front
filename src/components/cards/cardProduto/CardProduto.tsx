import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { useState } from "react";

interface CardProdutoProps {
	seguro: Produto;
	onDelete: (id: number) => void;
}

function CardProduto({ seguro, onDelete }: CardProdutoProps) {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleConfirmDelete = () => {
		onDelete(seguro.id);
		handleCloseModal();
	};

	return (
		<>
			<div
				key={seguro.id}
				className="overflow-hidden flex flex-col bg-(--primary-dark)/45 w-80 text-white rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
				{/* Container Principal */}
				<div className="flex flex-col gap-4">
					{/* Título e Data de Contratação */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
						<div>
							<h2 className="text-2xl font-bold text-(--tertiary-light) tracking-wide">{seguro.nomeProduto}</h2>
							<h2 className="text-sm font-bold text-(--tertiary-light) tracking-wide">{seguro.usuario?.nome}</h2>
						</div>
						<div className="text-right text-gray-300 text-sm">
							<span className="font-medium text-(--tertiary)">Contratado em:</span>
							<p>
								{new Intl.DateTimeFormat("pt-BR", {
									dateStyle: "short",
								}).format(new Date(seguro.dataDeCadastro))}
							</p>
						</div>
					</div>

					{/* Detalhes do Produto */}
					<div className="flex flex-col gap-2 text-gray-300 text-sm">
						<p>
							<span className="font-semibold text-(--tertiary)">Categoria: </span>
							{seguro.categoria?.nome}
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Cobertura: </span>
							{seguro.cobertura.charAt(0).toUpperCase() + seguro.cobertura.slice(1)}
						</p>

						<p>
							<span className="font-semibold text-(--tertiary)">Tempo de Uso: </span>
							{seguro.tempoUso}
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Valor do Produto: </span>R$ {seguro.valorProduto}
						</p>
						{seguro.imei && (
							<p>
								<span className="font-semibold text-(--tertiary)">IMEI: </span>
								{seguro.imei}
							</p>
						)}
					</div>

					{/* Descrição */}
					<p className="text-gray-200 mt-2 text-sm">{seguro.descricao}</p>

					{/* Valores */}
					<div className="flex justify-between items-center my-4 border-t border-gray-700 pt-4">
						<div className="flex flex-col text-center">
							<span className="font-bold text-lg text-white">R$ {seguro.premioMensal}</span>
							<p className="font-medium text-(--secondary) text-xs">Prêmio Mensal</p>
						</div>
						<div className="flex flex-col text-center">
							<span className="font-bold text-lg text-white">R$ {seguro.valorSeguro}</span>
							<p className="font-medium text-(--tertiary) text-xs">Valor do Seguro</p>
						</div>
					</div>

					{/* Botões */}
					<div className="flex justify-around items-center gap-4 mt-2">
						<Link
							to={`/produtos/editar/${seguro.id}`}
							className="flex-1 text-center px-4 py-2 bg-(--primary) rounded-md text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-(--primary-dark) hover:border-2 border-(--tertiary) hover:shadow-lg hover:shadow-(--primary-light)/50">
							Editar
						</Link>
						<button
							onClick={handleShowModal}
							className="flex-1 px-4 py-2 bg-transparent border-2 rounded-md text-(--secondary) font-semibold transition-all duration-300 hover:scale-105 hover:border-none hover:bg-(--secondary-dark) hover:text-white">
							Excluir
						</button>
					</div>
				</div>
			</div>
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
					<div className="bg-(--primary-dark) p-6 rounded-2xl shadow-2xl w-96 animate-fade-in">
						<h3 className="text-xl font-bold mb-4 text-(--tertiary-light)">Confirmar Exclusão</h3>
						<p className="mb-6 text-gray-200">
							Tem certeza que deseja excluir a categoria <span className="font-semibold text-(--secondary)">{seguro.nomeProduto}</span>?
						</p>

						<div className="flex justify-end gap-4">
							<button
								onClick={handleCloseModal}
								className="px-4 py-2 rounded-md font-semibold border-2 border-(--tertiary) text-(--tertiary-light) transition-all duration-300 hover:bg-(--tertiary) hover:text-white">
								Cancelar
							</button>
							<button
								onClick={handleConfirmDelete}
								className="px-4 py-2 rounded-md font-semibold bg-(--primary) text-white transition-all duration-300 hover:scale-105 hover:bg-(--primary-dark) hover:shadow-lg hover:shadow-(--primary-light)/40">
								Excluir
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default CardProduto;
