import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Sobre from "./pages/sobre/sobre";
import Footer from "./components/footer/Footer";
import Contatos from "./pages/Contato.tsx/Contato";
// import Cadastro from "./pages/cadastro/Cadastro";

function App() {
	return (
		<>
			{/* <AuthProvider> */}
				<BrowserRouter>
        <Navbar />
					<Routes>
						{/* <Route path="/" element={<Login />} /> */}
						<Route path="/" element={<Home />} />
						<Route path="/sobre" element={<Sobre />} />
						<Route path="/contato" element={<Contatos />} />
						{/* <Route path="/cadastro" element={<Cadastro />} /> */}
					</Routes>
          <Footer />
				</BrowserRouter>
			{/* </AuthProvider> */}
		</>
	);
}

export default App;
