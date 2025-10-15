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
import PaginaServicos from "./pages/servicos/PaginaServicos";
import Contatos from "./pages/contato/Contato";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
          <ScrollToTop />
					<Navbar />
					<Routes>
						<Route path="/login" element={<LoginAndRegisterPage />} />
						<Route path="/cadastro" element={<LoginAndRegisterPage />} />
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<PaginaSobre />} />
						<Route path="/servicos" element={<PaginaServicos />} />
						<Route path="/contato" element={<Contatos />} />
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
      <ToastContainer />
		</>
	);
}

export default App;
