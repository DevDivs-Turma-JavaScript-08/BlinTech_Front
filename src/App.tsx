import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
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
						{/* <Route path="/cadastro" element={<Cadastro />} /> */}
					</Routes>
				</BrowserRouter>
			{/* </AuthProvider> */}
		</>
	);
}

export default App;
