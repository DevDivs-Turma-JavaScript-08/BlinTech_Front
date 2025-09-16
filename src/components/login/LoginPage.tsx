import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const { usuario, handleLogin, isLoading } = useContext(AuthContext);

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	useEffect(() => {
		if (usuario.token !== "") {
			navigate("/");
		}
	}, [usuario]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		});
	}

	function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	return (
		<div className="flex h-[90vh] p-9 w-full bg-cover bg-center gap-3 bg-[url(https://i.imgur.com/RpvQcny.png)]">
			{/* Coluna esquerda - Formulário */}
			<div className="flex flex-col justify-center items-center w-1/2 bg-black/40 backdrop-blur-lg shadow-lg rounded-3xl">
				<div className="w-3/4 max-w-md bg-black/20 p-10 rounded-2xl shadow-xl">
					<h2 className="text-2xl font-bold text-white mb-2">
						Bem vindo <span className="text-(--secondary)">BlinTech</span>
					</h2>
					<p className="text-gray-300 mb-6">Entre na sua conta abaixo.</p>

					<form onSubmit={login} className="flex flex-col gap-4">
						{/* Campo Email */}
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={usuarioLogin.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							className="w-full px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:border-(--secondary) outline-none"
						/>
						{/* Campo Senha */}
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="w-full px-4 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-500 focus:border-(--secondary) outline-none"
							value={usuarioLogin.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>

						{/* Botão Entrar */}
						<button type="submit" className="w-full py-3 rounded-lg bg-(--tertiary) text-white font-bold hover:bg-(--tertiary) transition">
							{isLoading ? <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img> : <span>Entrar</span>}
						</button>
					</form>

					{/* <div className="text-center mt-4">
						<a href="#" className="text-gray-400 text-sm hover:text-white">
							Esqueceu sua senha?
						</a>
					</div> */}
				</div>
			</div>

			{/* Coluna direita - Banner */}
			<div className="flex flex-col justify-center items-center w-1/2 bg-white/90 text-black rounded-l-3xl relative">
				<div className="max-w-md text-center">
					<h3 className="text-3xl font-bold">
						Build the <span className="text-(--secondary)">Skills</span>
					</h3>
					<p className="mt-4 text-gray-600">
						You need to deliver <span className="font-semibold">results</span>
					</p>

					<div className="flex gap-4 justify-center mt-8">
						<Link to="/cadastro" className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100">
							Registre-se
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
