import CategoriaForm from "../../components/categorias/categoriaForm/CategoriaForm";
import ProdutosForm from "../../components/produtos/produtosForm/ProdutosForm";

function Home() {
	return (
		<div className="flex gap-6">
			home
			<CategoriaForm />
			<ProdutosForm />
		</div>
	);
}

export default Home;
