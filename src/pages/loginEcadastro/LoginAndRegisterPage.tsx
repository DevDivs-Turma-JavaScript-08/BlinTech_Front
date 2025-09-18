import React, { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";

const LoginAndRegisterPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { usuario, handleLogin } = useContext(AuthContext);
	const [showLogin, setShowLogin] = useState(location.pathname === "/login");

	// Estados para Login
	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	// Estados para Cadastro
	// const [isLoading, setIsLoading] = useState<boolean>(false);
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
	function atualizarEstadoCadastro(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setUsuarioCadastro({ ...usuarioCadastro, [e.target.name]: e.target.value });
	}

	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value);
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// setIsLoading(true);

		if (confirmarSenha === usuarioCadastro.senha && usuarioCadastro.senha.length >= 6) {
			try {
				await cadastrarUsuario(`/usuarios/cadastro`, usuarioCadastro, setUsuarioCadastro);
				alert("Usuário cadastrado com sucesso!");
				setShowLogin(true);
			} catch (error) {
				alert("Erro ao cadastrar usuário!");
			}
		} else {
			alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.");
			setUsuarioCadastro({ ...usuarioCadastro, senha: "" });
			setConfirmarSenha("");
		}
		// setIsLoading(false);
	}

	return (
		<div className="flex h-[90vh] p-9 w-full bg-cover bg-center gap-3 bg-[url(https://i.imgur.com/RpvQcny.png)] relative overflow-hidden">
			{/* Container do formulário de Login */}
			<div
				className={`flex flex-col justify-center items-center w-1/2 bg-(--primary-dark)/40 backdrop-blur-lg shadow-lg rounded-3xl transition-transform duration-700 ${
					showLogin ? "transform translate-x-0" : "transform -translate-x-[110%]"
				}`}>
				<div className="w-3/4 max-w-md bg-(--primary-ex-dark)/60 p-10 rounded-2xl shadow-xl">
					<h2 className="text-2xl font-bold text-white mb-2">
						Bem vindo <span className="text-(--secondary)">BlinTech</span>
					</h2>
					<p className="text-gray-300 mb-6">Entre na sua conta abaixo.</p>
					<form onSubmit={login} className="flex flex-col gap-4">
						<div className="relative" id="input">
							<input
								required
								id="floating_outlined_email"
								type="email"
								name="email"
								placeholder="Email"
								value={usuarioLogin.email}
								onChange={atualizarEstadoLogin}
								className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
							/>
							<label
								className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
								htmlFor="floating_outlined_email">
								Email
							</label>
						</div>
						<div className="relative" id="input">
							<input
								required
								type="password"
								id="senha"
								name="senha"
								placeholder="Senha"
								className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
								value={usuarioLogin.senha}
								onChange={atualizarEstadoLogin}
							/>
							<label
								className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
								htmlFor="floating_outlined_email">
								Senha
							</label>
						</div>
						<button
							type="submit"
							className="w-full py-3 rounded-lg bg-(--tertiary-dark) hover:bg-(--tertiary) text-white font-bold transition-all hover:text-(--secondary-dark)">
							{/* {isLoginLoading ? (
								<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35} className="mx-auto" />
							) : ( */}
							<span>Entrar</span>
							{/* )} */}
						</button>
					</form>
				</div>
			</div>

			{/* Container do formulário de Cadastro */}
			<div
				className={`flex flex-col justify-center items-center w-1/2 bg-(--primary-ex-dark)/40 backdrop-blur-lg shadow-lg rounded-3xl absolute top-9 left-1/2 h-[calc(100%-4.5rem)] transition-transform duration-700 ${
					showLogin ? "transform translate-x-full z-10" : "transform translate-x-[-3%] z-20"
				}`}>
				<form onSubmit={cadastrarNovoUsuario} className="w-full max-w-2xl p-10 text-white">
					<fieldset className="w-full">
						<legend className="text-2xl font-bold text-center mb-2">Cadastrar Usuário</legend>
						<h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="relative" id="input">
								<input
									required
									type="text"
									id="nome"
									name="nome"
									placeholder="Nome"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={usuarioCadastro.nome}
									onChange={atualizarEstadoCadastro}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="floating_outlined_email">
									Nome <span className="text-(--secondary-light)">*</span>
								</label>
							</div>
							<div className="relative" id="input">
								<input
									required
									type="email"
									id="email"
									name="email"
									placeholder="Email"
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={usuarioCadastro.email}
									onChange={atualizarEstadoCadastro}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="floating_outlined_email">
									E-mail <span className="text-(--secondary-light)">*</span>
								</label>
							</div>
							<div className="relative" id="input">
								<input
									required
									type="password"
									id="senha"
									name="senha"
									placeholder="Senha"
									onChange={atualizarEstadoCadastro}
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={usuarioCadastro.senha}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="floating_outlined_email">
									Senha <span className="text-(--secondary-light)">*</span>
								</label>
							</div>
							<div className="relative" id="input">
								<input
									required
									type="password"
									id="confirmarSenha"
									name="confirmarSenha"
									placeholder="confirmarSenha"
									onChange={handleConfirmarSenha}
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
									value={confirmarSenha}
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="floating_outlined_email">
									Confirmar Senha <span className="text-(--secondary-light)">*</span>
								</label>
							</div>
							<div className="relative" id="input">
								<input
									required
									type="text"
									id="cpf"
									name="cpf"
									placeholder="CPF"
									value={usuarioCadastro.cpf}
									onChange={atualizarEstadoCadastro}
									className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
								/>
								<label
									className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
									htmlFor="floating_outlined_email">
									CPF <span className="text-(--secondary-light)">*</span>
								</label>
							</div>
						</div>
						<div className="my-6 relative" id="input">
							<select
								required
								id="tipoDeUsuario"
								name="tipoDeUsuario"
								value={usuarioCadastro.tipoDeUsuario}
								onChange={atualizarEstadoCadastro}
								className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)">
								<option value="segurado">Segurado</option>
								<option value="segurador">Segurador</option>
							</select>
							<label
								className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
								htmlFor="floating_outlined_email">
								Tipo de Usuario <span className="text-(--secondary-light)">*</span>
							</label>
						</div>
						<div className="relative" id="input">
							<input
								type="text"
								id="foto"
								name="foto"
								placeholder="Link da sua foto"
								className="block w-full text-sm h-10 px-4 text-(--tertiary-ex-dark) bg-white rounded-2xl border border-(--primary-ex-light) appearance-none focus:outline  focus:outline-(--primary-ex-dark) focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] transition-all ease-in-out hover:border-(--primary)"
								value={usuarioCadastro.foto}
								onChange={atualizarEstadoCadastro}
							/>
							<label
								className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary-dark) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
								htmlFor="floating_outlined_email">
								Link da foto de Perfil
							</label>
						</div>
						<div className="mt-8 flex justify-center">
							<button
								type="submit"
								className="px-6 py-2 rounded-md bg-(--tertiary-dark) hover:bg-(--tertiary) text-white font-bold transition-all hover:text-(--secondary-dark)">
								{/* {isLoading ? (
									<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35} className="mx-auto" />
								) : ( */}
								<span> Cadastrar </span>
								{/* )} */}
							</button>
						</div>
					</fieldset>
				</form>
			</div>

			{/* Coluna direita - Banner e botões de alternância */}
			<div
				className={`flex flex-col justify-center items-center w-1/2 bg-(--primary-dark)/90 text-white rounded-3xl relative transition-all duration-700 ${
					showLogin ? "transform translate-x-0 z-20" : "transform translate-x-[-105%] z-10"
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
									className={`px-6 py-2 rounded-lg text-(--tertiary-dark) hover:text-(--tertiary-ex-dark) transition-all border-2 font-bold hover:bg-(--tertiary-light) border-(--tertiary)`}>
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
											: "text-(--secondary) hover:text-(--secondary-dark) transition-all border-2 font-bold hover:bg-(--secondary-light) border-(--secondary)"
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
