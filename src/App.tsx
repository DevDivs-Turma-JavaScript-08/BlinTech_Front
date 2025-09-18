import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import LoginAndRegisterPage from "./pages/loginEcadastro/LoginAndRegisterPage";
import Perfil from "./pages/perfil/Perfil";
import ListaCategorias from "./components/layout/lists/CategoriasList";
import PaginaSobre from "./pages/sobre/PaginaSobre";
import ProdutosList from "./components/layout/lists/ProdutosList";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/login" element={<LoginAndRegisterPage />} />
						<Route path="/cadastro" element={<LoginAndRegisterPage />} />
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<PaginaSobre />} />
						<Route path="/produtos" element={<ProdutosList />} />
						<Route path="/produtos/contratar" element={<ProdutosList />} />
						<Route path="/produtos/editar/:id" element={<ProdutosList />} />
						<Route path="/categorias" element={<ListaCategorias />} />
						<Route path="/categorias/criar" element={<ListaCategorias />} />
						<Route path="/categorias/editar/:id" element={<ListaCategorias />} />
						<Route path="/perfil" element={<Perfil />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
