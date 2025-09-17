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
			<div className="w-64 bg-(--primary-dark) shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden">
				<div className="w-40 h-18 bg-violet-500 rounded-bl-[50px] absolute -right-5 -top-7">
					<p className="absolute text-nowrap text-white left-8 top-8 align-text-top">
						Carência: <span className="font-bold text-2xl align-text-top"> {categoria.carencia} </span>
					</p>
				</div>
				<div className="fill-violet-500 w-12"></div>
				<h1 className="font-bold text-xl text-white"> {categoria.nome} </h1>
				<p className="text-sm text-white leading-6">{categoria.descricao}</p>

				<div>
					<Link
						to={`/categorias/editar/${categoria.id}`}
						className="w-full text-white bg-(--tertiary) font-bold hover:bg-(--tertiary-dark) flex items-center justify-center py-2 transition-all ease-in">
						<button> Editar </button>
					</Link>

					<button
						onClick={handleShowModal}
						className="text-white bg-(--secondary) font-bold hover:bg-(--secondary-dark) w-full flex items-center justify-center transition-all ease-in">
						<button> Deletar </button>
					</button>
				</div>

				{showModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
						<div className="bg-blin-primary-dark p-6 rounded-lg shadow-xl text-white w-96">
							<h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
							<p className="mb-6">Tem certeza que deseja excluir o seguro?</p>
							<div className="flex justify-end gap-4">
								<button onClick={handleCloseModal} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
									Cancelar
								</button>
								<button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
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
