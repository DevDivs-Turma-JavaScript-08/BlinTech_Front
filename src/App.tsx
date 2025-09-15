import { BrowserRouter} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/navbar/Navbar.tsx";


function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
				<Navbar />
					
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
