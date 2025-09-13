import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
