import type Categoria from "../../../models/Categoria";
import { useState } from "react";
import CtaCard from "../../buttons/CtaCard";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface CardCategoriasProps {
	categoria: Categoria;
  onDelete: (id: number) => void;
}

function CardCategorias({ categoria, onDelete }: CardCategoriasProps) {

    const [showModal, setShowModal] = useState(false);
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleConfirmDelete = () => {
      onDelete(categoria.id);
      handleCloseModal();
    };

	return (
		<>
			<div className="flex flex-col justify-between rounded-[36px] w-70 h-78 bg-(--primary-dark) shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
				<div>
					<div className="w-40 h-18 bg-violet-500 rounded-bl-[50px] absolute -right-5 -top-7">
						<div className="flex ">
							<p className="mt-8 ml-4 text-nowrap text-white align-text-top leading-4">
								Carência
								<br />
								<small className="ml-3 text-(--primary-dark) font-bold"> (em dias) </small>
							</p>
							<span className="mt-8 ml-2 text-white font-bold text-2xl align-text-top"> {categoria.carencia} </span>
						</div>
					</div>

					<div className="fill-violet-500 w-12"></div>

					<h1 className="font-bold mt-3 text-xl text-white"> {categoria.nome} </h1>

					<p className="text-wrap text-sm text-white leading-6 h-[130px] mt-4 w-full overflow-x-auto scrollbar-custom">{categoria.descricao}</p>
				</div>

				<div className="flex gap-3">
					<CtaCard
						type="link"
						path={`/categorias/editar/${categoria.id}`}
						textColor={"white"}
						icon={faEdit}
						bgHover="(--primary-dark)"
						bgColor="(--primary)"
						border="(--tertiary)"
					/>

					<CtaCard
						type="button"
						icon={faTrashCan}
						textColor="(--secondary)"
						textHover="white"
						border="(--secondary)"
						bgColor="transparent"
						bgHover="(--primary-ex-dark)"
						onClick={handleShowModal}
					/>
				</div>

				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
						<div className="bg-(--primary-dark) p-6 rounded-2xl shadow-2xl w-96 animate-fade-in">
							<h3 className="text-xl font-bold mb-4 text-(--secondary)">Confirmar Exclusão</h3>
							<p className="mb-6 text-gray-200">
								Tem certeza que deseja excluir a categoria <span className="font-semibold text-(--tertiary-light)">{categoria.nome}</span>?
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
			</div>
		</>
	);
}

export default CardCategorias;
