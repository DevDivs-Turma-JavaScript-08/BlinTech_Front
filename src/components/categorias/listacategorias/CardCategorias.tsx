import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { useState } from "react";

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
			<div className="rounded-[36px] w-64 bg-(--primary-dark) shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
				<div className="w-40 h-18 bg-violet-500 rounded-bl-[50px] absolute -right-5 -top-7">
					<p className="absolute text-nowrap text-white left-8 top-8 align-text-top">
						Carência: <span className="font-bold text-2xl align-text-top"> {categoria.carencia} </span>
					</p>
				</div>
				<div className="fill-violet-500 w-12"></div>
				<h1 className="font-bold text-xl text-white"> {categoria.nome} </h1>
				<p className="text-sm text-white leading-6">{categoria.descricao}</p>

				<div className="flex flex-col gap-3">
					<Link
						to={`/categorias/editar/${categoria.id}`}
						className="flex-1 text-center px-4 py-2 bg-(--primary) rounded-md text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-(--primary-dark) hover:border-2 border-(--tertiary) hover:shadow-lg hover:shadow-(--primary-light)/50">
						<button> Editar </button>
					</Link>

					<button
						onClick={handleShowModal}
						className="flex-1 px-4 py-2 bg-transparent border-2 rounded-md text-(--secondary) font-semibold transition-all duration-300 hover:scale-105 hover:border-none hover:bg-(--secondary-dark) hover:text-white">
						<button> Deletar </button>
					</button>
				</div>

				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
						<div className="bg-(--primary-dark) p-6 rounded-2xl shadow-2xl w-96 animate-fade-in">
							<h3 className="text-xl font-bold mb-4 text-(--tertiary-light)">Confirmar Exclusão</h3>
							<p className="mb-6 text-gray-200">
								Tem certeza que deseja excluir a categoria <span className="font-semibold text-(--secondary)">{categoria.nome}</span>?
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
			</div>
		</>
	);
}

export default CardCategorias;
