import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
// import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import CardBeneficios from "./components/cards/cardBeneficios/CardBeneficios";
import BeneficiosSeguro from "./components/cards/cardBeneficios/CardBeneficios";
import Sobre from "./pages/sobre/sobre";
import Contatos from "./pages/Contato.tsx/Contato";
import Servicos from "./pages/servicos/servicos";
import CardFormEletronico from "./components/cards/cardFormEletronico/CardFormEletronico";
import Perfil from "./pages/perfil/Perfil";



function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Perfil />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/cadastro" element={<Cadastro />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
