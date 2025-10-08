import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";
import Loader from "../../components/buttons/Loader";

const LoginAndRegisterPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { usuario, handleLogin } = useContext(AuthContext);
	const [showLogin, setShowLogin] = useState(location.pathname === "/login");

	// Estados para Login
	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	// Estados para Cadastro
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [confirmarSenha, setConfirmarSenha] = useState<string>("");
	const [usuarioCadastro, setUsuarioCadastro] = useState<Usuario>({
		id: 0,
		nome: "",
		email: "",
		senha: "",
		cpf: "",
		tipoDeUsuario: "Segurado",
		foto: "",
	});

	// Efeito para redirecionar após o login bem-sucedido
	useEffect(() => {
		if (usuario.token !== "") {
			navigate("/");
		}
	}, [usuario, navigate]);

	useEffect(() => {
		setShowLogin(location.pathname === "/login");
	}, [location.pathname]);

	// Funções de Login
	function atualizarEstadoLogin(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
	}

	function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	// Funções de Cadastro
	function atualizarEstadoCadastro(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioCadastro({ ...usuarioCadastro, [e.target.name]: e.target.value });
	}

	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value);
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);

		if (confirmarSenha === usuarioCadastro.senha && usuarioCadastro.senha.length >= 6) {
			try {
				await cadastrarUsuario(`/usuarios/cadastro`, usuarioCadastro, setUsuarioCadastro);
				alert("Usuário cadastrado com sucesso!");
				setShowLogin(true);
			} catch (error) {
				alert(`Erro ao cadastrar usuário!: ${error}`);
			}
		} else {
			alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.");
			setUsuarioCadastro({ ...usuarioCadastro, senha: "" });
			setConfirmarSenha("");
		}
		setIsLoading(false);
	}

	return (
		<div className="flex flex-col md:flex-row h-[700px] md:h-[90vh] p-4 md:p-9 w-full bg-cover bg-center gap-4 md:gap-3 bg-[url(https://i.imgur.com/RpvQcny.png)] relative overflow-hidden">
			{/* Container do formulário de Login */}
			<div
				className={`flex flex-col justify-center items-center w-full md:w-1/2 bg-(--primary-dark)/40 backdrop-blur-lg shadow-lg rounded-3xl transition-transform duration-700 ${
					showLogin ? "transform translate-x-0" : "transform -translate-x-[110%]"
				}`}>
				<div className="w-fit md:w-3/4 max-w-md bg-(--primary-ex-dark)/60 my-5 p-10 rounded-2xl shadow-xl">
					<h2 className="text-2xl font-bold text-white mb-2">
						Bem vindo a <span className="text-(--secondary)">BlinTech</span>
					</h2>
					<p className="text-gray-300 mb-6">Entre na sua conta abaixo.</p>
					<form onSubmit={login} className="flex flex-col gap-4">
						<div className="input-group">
							<input
								required
								id="login_email"
								type="email"
								name="email"
								className="input h-10 w-full"
								autoComplete="on"
								value={usuarioLogin.email}
								onChange={atualizarEstadoLogin}
							/>
							<label className="user-label">E-mail</label>
						</div>

						<div className="input-group">
							<input
								required
								id="login_password"
								type="password"
								name="senha"
								className="input h-10 w-full"
								autoComplete="off"
								value={usuarioLogin.senha}
								onChange={atualizarEstadoLogin}
							/>
							<label className="user-label">Senha</label>
						</div>

						<button
							type="submit"
							className={`px-6 py-2 rounded-lg text-(--tertiary) hover:text-(--primary-ex-dark) transition-all border-2 font-bold hover:bg-(--tertiary) border-(--tertiary) cursor-pointer`}>
							{isLoading ? (
								<span>
									<Loader />
								</span>
							) : (
								<span> Entrar </span>
							)}
						</button>
					</form>
				</div>
			</div>

			{/* Container do formulário de Cadastro */}
			<div
				className={`flex flex-col justify-center items-center h-fit w-[90vw] md:w-1/2 bg-(--primary-ex-dark)/40 backdrop-blur-lg shadow-lg rounded-3xl absolute md:top-9 left-7.5 md:left-1/2 md:h-[calc(100%-4.5rem)] transition-transform duration-700 ${
					showLogin ? "transform translate-x-[110%] z-10" : "transform translate-x-[-3%] z-20"
				}`}>
				<form onSubmit={cadastrarNovoUsuario} autoComplete="on" className="w-full max-w-2xl p-2 md:p-10 text-white">
					<fieldset className="w-full bg-(--primary-ex-dark)/70 p-2 md:p-4 rounded-4xl">
						<legend className="text-2xl font-bold text-center mb-2">Cadastrar Usuário</legend>
						<h3 className="text-lg font-semibold text-center mb-4">Informações Pessoais</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="input-group">
								<input
									required
									id="nome"
									type="nome"
									name="nome"
									className="input h-10 w-full"
									value={usuarioCadastro.nome}
									onChange={atualizarEstadoCadastro}
								/>
								<label className="user-label">
									Nome<span className="text-(--secondary-light)"> *</span>
								</label>
							</div>

							<div className="input-group">
								<input
									required
									id="text"
									type="email"
									name="email"
									className="input h-10 w-full"
									value={usuarioCadastro.email}
									onChange={atualizarEstadoCadastro}
								/>
								<label className="user-label">
									E-mail<span className="text-(--secondary-light)"> *</span>
								</label>
							</div>

							<div className="input-group">
								<input
									required
									id="senha"
									type="password"
									name="senha"
									className="input h-10 w-full"
									value={usuarioCadastro.senha}
									onChange={atualizarEstadoCadastro}
								/>
								<label className="user-label">
									Senha<span className="text-(--secondary-light)"> *</span>
								</label>
							</div>

							<div className="input-group">
								<input
									required
									id="confirmarSenha"
									type="password"
									name="confirmarSenha"
									className="input h-10 w-full"
									value={confirmarSenha}
									onChange={handleConfirmarSenha}
								/>
								<label className="user-label">
									Confirmar Senha<span className="text-(--secondary-light)"> *</span>
								</label>
							</div>

							<div className="input-group">
								<input
									required
									id="cpf"
									type="text"
									name="cpf"
									className="input h-10 w-full"
									value={usuarioCadastro.cpf}
									onChange={atualizarEstadoCadastro}
								/>
								<label className="user-label">
									CPF<span className="text-(--secondary-light)"> *</span>
								</label>
							</div>
						</div>

						{/* <div className="my-6 input-group">
							<select
								required
								id="tipoDeUsuario"
								name="tipoDeUsuario"
								className="input h-10 w-full"
								value={usuarioCadastro.tipoDeUsuario}
								onChange={atualizarEstadoCadastro}>
								<option value="segurado" defaultChecked>
									Segurado
								</option>
								<option value="segurador">Segurador</option>
							</select>
							<label className="user-label">
								Tipo de Usuario <span className="text-(--secondary-light)">*</span>
							</label>
						</div> */}

						<div className="flex gap-4 my-8">
							<span>Tipo de Usuário: </span>

							<div className="button-group">
								<input
									type="radio"
									id="tipoDeUsuarioSegurado"
									name="tipoDeUsuario"
									value="segurado"
                  checked={usuarioCadastro.tipoDeUsuario === "segurado"}
									onChange={atualizarEstadoCadastro}
								/>
								<label htmlFor="tipoDeUsuarioSegurado">Segurado</label>
							</div>

							<div className="button-group">
								<input
									type="radio"
									id="tipoDeUsuarioSegurador"
									name="tipoDeUsuario"
									value="segurador"
                  checked={usuarioCadastro.tipoDeUsuario === "segurador"}
									onChange={atualizarEstadoCadastro}
								/>
								<label htmlFor="tipoDeUsuarioSegurador">Segurador</label>
							</div>
						</div>

						<div className="input-group">
							<input
								required
								id="foto"
								type="text"
								name="foto"
								className="input h-10 w-full"
								value={usuarioCadastro.foto}
								onChange={atualizarEstadoCadastro}
							/>
							<label className="user-label">Link da foto de Perfil</label>
						</div>

						<div className="gap-5 mt-6 flex justify-center">
							<NavLink to="/login" className="md:hidden w-[50%]">
								<button
									onClick={() => setShowLogin(true)}
									className={`px-6 py-2 rounded-lg text-(--secondary) hover:text-(--secondary-dark) transition-all border-2 font-bold hover:bg-(--secondary-light) border-(--secondary)"
									`}>
									Login
								</button>
							</NavLink>

							<button
								type="submit"
								className={`px-6 py-2 rounded-lg text-(--tertiary) hover:text-(--primary-ex-dark) transition-all border-2 font-bold hover:bg-(--tertiary) border-(--tertiary) cursor-pointer w-[50%]`}>
								{isLoading ? (
									<span>
										<Loader />
									</span>
								) : (
									<span> Entrar </span>
								)}
							</button>
						</div>
					</fieldset>
				</form>
			</div>

			{/* Coluna direita - Banner e botões de alternância */}
			<div
				className={`flex flex-col justify-center items-center w-full p-3 md:p-0 md:w-1/2 bg-(--primary-dark)/90 text-white rounded-3xl relative transition-all duration-700 ${
					showLogin ? "md:transform translate-x-0 z-20" : "md:transform translate-x-[-105%] z-10"
				}`}>
				<div className="max-w-md text-center">
					<h3 className="text-3xl font-bold">
						{showLogin ? (
							<p>
								É novo por aqui? <span className="text-(--secondary)">Registre-se</span>
							</p>
						) : (
							<p>
								Já possui uma conta? <br /> <span className="text-(--secondary)">Entre agora!</span>
							</p>
						)}
					</h3>
					<p className="mt-4 text-(--primary-ex-light)">
						Acompanhe seus seguros <span className="font-semibold">em tempo real!</span>
					</p>
					<div className="flex gap-4 justify-center mt-8">
						{showLogin ? (
							<NavLink to="/cadastro">
								<button
									onClick={() => setShowLogin(false)}
									className={`px-6 py-2 rounded-lg text-(--tertiary) hover:text-(--primary-ex-dark) transition-all border-2 font-bold hover:bg-(--tertiary-light) border-(--tertiary) cursor-pointer`}>
									Registre-se
								</button>
							</NavLink>
						) : (
							<NavLink to="/login">
								<button
									onClick={() => setShowLogin(true)}
									className={`px-6 py-2 rounded-lg ${
										showLogin
											? "bg-(--tertiary) text-white"
											: "text-(--secondary) hover:text-white transition-all border-2 font-bold hover:bg-(--secondary) border-(--secondary) cursor-pointer"
									}`}>
									Login
								</button>
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginAndRegisterPage;
