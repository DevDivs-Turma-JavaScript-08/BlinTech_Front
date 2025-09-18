import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
import type Produto from "../../../../../models/Produto";
import { buscar } from "../../../../../services/Services";
import ProdutosCardTest from "../produtosCardTest/ProdutosCardTest";
import ProdutosModalTest from "../produtosModalTest/ProdutosModalTest";

function ProdutosListTest() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [produtos, setProdutos] = useState<Produto[]>([]);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	useEffect(() => {
		if (token === "") {
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		buscarProdutos();
	}, [produtos.length]);

	async function buscarProdutos() {
		try {
			setIsLoading(true);

			await buscar("/produto", setProdutos, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			{isLoading && (
				<div className="flex justify-center w-full my-8">
					<img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" width={70}></img>
				</div>
			)}

      <ProdutosModalTest />

			<div className="flex justify-center w-full my-4">
				<div className="container flex flex-col">
					{!isLoading && produtos.length === 0 && <span className="text-3xl text-center my-8">Nenhuma Postagem foi encontrada!</span>}

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{produtos.map((produto) => (
							<ProdutosCardTest key={produto.id} seguro={produto} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default ProdutosListTest;
