import { useContext, useEffect, useState } from 'react'
import { buscar } from '../../../services/Services';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Categoria from '../../../models/Categoria';
import CardSegurosHome from './CardSegurosHome';

function ListaCardSegurosHome() {

// const navigate = useNavigate();

// const [isLoading, setIsLoading] = useState<boolean>(false);

const [seguros, setSeguros] = useState<Categoria[]>([]);

const { usuario, handleLogout } = useContext(AuthContext);
const token = usuario.token;

useEffect(() => {
	buscarPostagens();
}, [seguros.length]);

async function buscarPostagens() {
	try {
		// setIsLoading(true);

		await buscar("/categorias", setSeguros, {
			headers: { Authorization: token },
		});
	} catch (error: any) {
		if (error.toString().includes("401")) {
			handleLogout();
		}
	} finally {
		// setIsLoading(false);
	}
}

  return (
		<section className="bg-[url(https://i.imgur.com/jh5VGgQ.png)] bg-repeat-x bg-(--tertiary) flex flex-col items-center px-10 gap-8 py-30">
			<h2 className="text-(--primary-dark) text-4xl font-bold"> Confira nossas categorias de Seguros</h2>
			<div className="flex flex-wrap justify-center gap-6">
				{seguros.map((card) => (
					<CardSegurosHome key={card.id} seguros={card} />
				))}
			</div>
		</section>
	);
}

export default ListaCardSegurosHome