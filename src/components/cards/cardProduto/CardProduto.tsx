import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { useState } from "react";
import CtaCard from "../../buttons/CtaCard";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

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
				className="overflow-hidden flex flex-col justify-between bg-(--primary-dark)/45 w-80 h-[450px] text-white rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
				{/* Container Principal */}
				<div className="flex flex-col gap-4">
					{/* Título e Data de Contratação */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center">
						<div>
							<h2 className="text-2xl font-bold text-(--tertiary-light) tracking-wide">{seguro.nomeProduto}</h2>
							<h2 className="text-sm font-bold text-(--tertiary-light) tracking-wide">Cliente: {seguro.usuario?.nome}</h2>
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
							<span className="font-semibold text-(--tertiary)">Produto: </span> {seguro.descricao}
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Valor do Produto: </span>R$ {seguro.valorProduto}
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Tempo de Uso: </span>
							{seguro.tempoUso} meses
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Categoria: </span>
							{seguro.categoria?.nome}
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Carência: </span>
							{seguro.categoria?.carencia} dias
						</p>
						<p>
							<span className="font-semibold text-(--tertiary)">Cobertura: </span>
							{seguro.cobertura.charAt(0).toUpperCase() + seguro.cobertura.slice(1)}
						</p>
						{seguro.imei !== "WW-XXXXXX-YYYYYY-Z" && (
							<p>
								<span className="font-semibold text-(--tertiary)">IMEI: </span>
								{seguro.imei}
							</p>
						)}
					</div>
				</div>

				<div className="justify-self-end">
          
					{/* Valores */}
					<div className="flex justify-between items-center my-4 border-t border-(--tertiary-ex-dark) pt-4">
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
						<CtaCard
							type="link"
							path={`/produtos/editar/${seguro.id}`}
							icon={faEdit}
							textColor="white"
							bgHover="(--primary-dark)"
							bgColor="(--primary)"
							border="(--tertiary)"
						/>

						<CtaCard
							type="button"
							text="Cancelar"
							textColor="(--secondary)"
							textHover="white"
							border="(--secondary)"
							bgColor="transparent"
							bgHover="(--primary-ex-dark)"
							onClick={handleShowModal}
						/>
					</div>
				</div>
			</div>
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
					<div className="bg-(--primary-dark) p-6 rounded-2xl shadow-2xl w-96 animate-fade-in">
						<h3 className="text-xl font-bold mb-4 text-(--secondary)">Confirmar Cancelamento</h3>
						<p className="mb-6 text-gray-200">
							Tem certeza que deseja cancelar o seguro para o seu <span className="font-semibold text-(--tertiary-light)">{seguro.nomeProduto}</span>?
						</p>

						<div className="flex justify-end gap-4">
							<CtaCard
								type="button"
								text="Não"
								textColor="(--tertiary-light)"
								textHover="white"
								bgColor="(--primary)"
								bgHover="(--primary-dark)"
								onClick={handleCloseModal}
								border="(--tertiary)"
							/>
							<CtaCard
								type="button"
								text="Sim"
								textColor="(--secondary)"
								textHover="white"
								bgHover="(--primary-dark)"
								onClick={handleConfirmDelete}
								border="(--secondary)"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default CardProduto;
