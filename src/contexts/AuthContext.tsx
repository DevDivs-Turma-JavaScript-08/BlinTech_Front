import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Services";
import { Flip, toast } from "react-toastify";

interface AuthContextProps {
	usuario: UsuarioLogin;
	handleLogout(): void;
	handleLogin(usuario: UsuarioLogin): Promise<void>;
	isLoading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
	const [usuario, setUsuario] = useState<UsuarioLogin>({
		id: 0,
		nome: "",
		tipoDeUsuario: "",
		email: "",
		cpf: "",
		senha: "",
		foto: "",
		token: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	async function handleLogin(usuarioLogin: UsuarioLogin) {
		setIsLoading(true);
		try {
			await login(`/usuarios/login`, usuarioLogin, setUsuario);
			toast.dismiss();
			toast.success("Login realizado. \nBem vindo(a) a BlinTech!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
				className: "whitespace-pre-line",
			});
		} catch (error) {
			const backendMessage = error.response?.data?.message || error.message || "Erro desconhecido ao realizar o login.";

			toast.dismiss();
			toast.error(backendMessage, {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
		}
		setIsLoading(false);
	}

	function handleLogout() {
		setUsuario({
			id: 0,
			nome: "",
			tipoDeUsuario: "",
			email: "",
			cpf: "",
			senha: "",
			foto: "",
			token: "",
		});
	}

	return <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>{children}</AuthContext.Provider>;
}
