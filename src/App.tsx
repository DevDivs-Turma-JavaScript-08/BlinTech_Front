import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Sobre from "./pages/sobre/sobre";
import Footer from "./components/footer/Footer";
import Contatos from "./pages/Contato.tsx/Contato";
// import SegurosForm from "./components/seguros/segurosForm/SegurosForm";
// import Login from "./pages/login/Login";
import LoginPage from "./components/login/LoginPage";
// import Cadastro from "./pages/cadastro/Cadastro";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/logar" element={<LoginPage />} />
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/contato" element={<Contatos />} />
						{/* <Route path="/segurosform" element={<SegurosForm />} /> */}
						{/* <Route path="/cadastro" element={<Cadastro />} /> */}
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
