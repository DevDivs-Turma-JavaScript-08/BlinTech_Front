import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Contatos from "./pages/Contato.tsx/Contato";
import LoginAndRegisterPage from "./components/login/LoginAndRegisterPage";
import MeusSeguros from "./pages/produtos/MeusSeguros";
import CategoriaForm from "./components/categorias/categoriaForm/CategoriaForm";
import Perfil from "./pages/perfil/Perfil";
import Sobre from "./pages/sobre/sobre";
import Servicos from "./pages/servicos/servicos";

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
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/contato" element={<Contatos />} />
						<Route path="/servicos" element={<Servicos />} />
						<Route path="/produtos" element={<MeusSeguros />} />
						<Route path="/produtos/contratar" element={<MeusSeguros />} />
						<Route path="/produtos/:id" element={<MeusSeguros />} />
						<Route path="/categorias" element={<CategoriaForm />} />
						<Route path="/perfil" element={<Perfil />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
