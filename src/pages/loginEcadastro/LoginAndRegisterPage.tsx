import React, { useContext, useRef, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";
import Loader from "../../components/buttons/Loader";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = Usuario & { confirmarSenha: string };

const LoginAndRegisterPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { usuario, handleLogin } = useContext(AuthContext);
	const [showLogin, setShowLogin] = useState(location.pathname === "/login");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginRef = useRef<HTMLDivElement>(null);
	const cadastroRef = useRef<HTMLDivElement>(null);
	const [formHeight, setFormHeight] = useState<number>(0);

	// --- Estados para Login ---
	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	// --- Estados para Cadastro ---
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		reset,
		setValue,
	} = useForm<FormFields>({
		mode: "onTouched",
		defaultValues: {
			id: 0,
			nome: "",
			email: "",
			senha: "",
			cpf: "",
			tipoDeUsuario: "segurado",
			foto: "",
			confirmarSenha: "",
		},
	});

	const senha = watch("senha", "");
	const emptySetter = () => {};

	// --- Efeito para redirecionar após o login bem-sucedido ---

	useEffect(() => {
		if (usuario.token !== "") {
			navigate("/");
		}
	}, [usuario, navigate]);

	useEffect(() => {
		setShowLogin(location.pathname === "/login");
		if (location.pathname === "/cadastro") {
			reset();
		}
	}, [location.pathname, reset]);

	// --- Funções de Login ---

	function atualizarEstadoLogin(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
	}

	function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	// --- Funções de Cadastro ---

	const cadastrarNovoUsuario: SubmitHandler<FormFields> = async (data) => {
		setIsLoading(true);

		const { confirmarSenha, cpf, ...dadosRestantes } = data;
		const cpfLimpo = cpf.replace(/\D/g, "");
		const novoUsuario = {
			...dadosRestantes,
			cpf: cpfLimpo,
		};

		try {
			await cadastrarUsuario(`/usuarios/cadastro`, novoUsuario, emptySetter);
			alert("Usuário cadastrado com sucesso!");
			reset();
			setShowLogin(true);
		} catch (error) {
			console.error(error);
			 const backendMessage = error.response?.data?.message || error.message || "Erro desconhecido ao cadastrar usuário.";

				alert(backendMessage);
		}

		setIsLoading(false);
	};

	// --- Formatar CPF ---

	const formatarCpf = (value: string): string => {
		// 1. Remove tudo que não for dígito
		const numerico = value.replace(/\D/g, "");

		// 2. Limita a 11 dígitos
		const limitado = numerico.slice(0, 11);

		// 3. Aplica a formatação
		if (limitado.length <= 3) return limitado;
		if (limitado.length <= 6) return `${limitado.slice(0, 3)}.${limitado.slice(3)}`;
		if (limitado.length <= 9) return `${limitado.slice(0, 3)}.${limitado.slice(3, 6)}.${limitado.slice(6)}`;

		return `${limitado.slice(0, 3)}.${limitado.slice(3, 6)}.${limitado.slice(6, 9)}-${limitado.slice(9, 11)}`;
	};

  // --- Função de ajuste de tamanho dos formulários e banner --- 

	const bannerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
	const activeRef = showLogin ? loginRef.current : cadastroRef.current;
	const banner = bannerRef.current;
	if (!activeRef || !banner) return;

	const updateHeight = () => {
		if (window.innerWidth >= 768) {
			// DESKTOP → Banner acompanha o formulário
			const activeHeight = activeRef.scrollHeight;
			banner.style.height = `${activeHeight}px`;
			setFormHeight(activeHeight);
		} else {
			// MOBILE
			if (showLogin) {
				// Login → soma banner abaixo
				const totalHeight = activeRef.scrollHeight + (banner?.scrollHeight || 0);
				banner.style.height = "auto";
				setFormHeight(totalHeight);
			} else {
				// Cadastro → considera só o formulário
				banner.style.height = "auto";
				setFormHeight(activeRef.scrollHeight);
			}
		}
	};

	updateHeight();

	const resizeObserver = new ResizeObserver(updateHeight);
	resizeObserver.observe(activeRef);
	resizeObserver.observe(banner);

	window.addEventListener("resize", updateHeight);

	return () => {
		resizeObserver.disconnect();
		window.removeEventListener("resize", updateHeight);
	};
}, [showLogin]);



	return (
		<main
			className="flex flex-col md:flex-row p-4 md:p-9 w-full bg-cover bg-center gap-4 md:gap-3 bg-[url(https://i.imgur.com/RpvQcny.png)] relative overflow-hidden transition-all duration-500"
			style={{ height: formHeight ? `${formHeight + 100}px` : "auto" }}>
			{/* Container do formulário de Login */}
			<div
				ref={loginRef}
				className={`flex flex-col justify-center items-center w-full md:w-1/2 bg-(--primary-dark)/40 backdrop-blur-lg h-fit shadow-lg rounded-3xl transition-transform duration-700 mt-6 md:mt-3 py-5 md:py-10 ${
					showLogin ? "transform translate-x-0" : "transform -translate-x-[110%]"
				}`}>
				<div className="w-fit md:w-3/4 max-w-md bg-(--primary-ex-dark)/60 my-5 px-[15%] p-10 rounded-2xl shadow-xl">
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
				ref={cadastroRef}
				className={`flex flex-col justify-center items-center w-[90vw] md:w-1/2 bg-(--primary-ex-dark)/40 backdrop-blur-lg shadow-lg rounded-3xl absolute md:top-9 left-[8%] md:left-1/2 transition-transform duration-700 mt-8 md:mt-3 ${
					showLogin ? "transform translate-x-[110%] z-10" : "transform translate-x-[-3%] z-20"
				}`}>
				<form onSubmit={handleSubmit(cadastrarNovoUsuario)} autoComplete="on" className="w-full max-w-2xl p-2 md:p-10 md:h-full text-white">
					<fieldset className="w-full bg-(--primary-ex-dark)/70 p-2 md:p-4 rounded-4xl md:h-fit">
						<legend className="text-2xl font-bold text-center mb-2">Cadastrar Usuário</legend>
						<h3 className="text-lg font-semibold text-center mb-4">Informações Pessoais</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Nome */}
							<div>
								<div className="input-group">
									<input
										id="nome"
										type="text"
										className="input h-10 w-full"
										{...register("nome", {
											required: "O nome é obrigatório",
										})}
									/>
									<label className="user-label">
										Nome<span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.nome?.message && <span className="text-red-500 text-sm mt-1">{errors.nome.message}</span>}
							</div>

							{/* E-mail */}
							<div>
								<div className="input-group">
									<input
										required
										id="email"
										type="text"
										className="input h-10 w-full"
										{...register("email", {
											required: "O e-mail é obrigatório",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
												message: "E-mail inválido",
											},
										})}
									/>
									<label className="user-label">
										E-mail<span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.email?.message && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
							</div>

							{/* Senha */}
							<div>
								<div className="input-group">
									<input
										required
										id="senha"
										type="password"
										className="input h-10 w-full"
										{...register("senha", {
											required: "A senha é obrigatória",
											minLength: {
												value: 6,
												message: "A senha deve ter no mínimo 6 caracteres",
											},
										})}
									/>
									<label className="user-label">
										Senha<span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.senha?.message && <span className="text-red-500 text-sm mt-1">{errors.senha.message}</span>}
							</div>

							{/* Confirmar Senha */}
							<div>
								<div className="input-group">
									<input
										required
										id="confirmarSenha"
										type="password"
										className="input h-10 w-full"
										{...register("confirmarSenha", {
											required: "Confirmação de senha é obrigatória",
											validate: (value) => value === senha || "As senhas não conferem", // Valida se é igual ao valor 'watch' da senha
										})}
									/>
									<label className="user-label">
										Confirmar Senha<span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.confirmarSenha?.message && <span className="text-red-500 text-sm mt-1">{errors.confirmarSenha.message}</span>}
							</div>

							{/* CPF */}
							<div>
								<div className="input-group">
									<input
										required
										id="cpf"
										type="text"
										className="input h-10 w-full"
										{...register("cpf", {
											required: "O CPF é obrigatório",
											maxLength: {
												value: 14,
												message: "O CPF deve ter 11 dígitos",
											},
											minLength: {
												value: 14,
												message: "O CPF deve ter 11 dígitos",
											},
										})}
										onChange={(e) => {
											const valorFormatado = formatarCpf(e.target.value);
											setValue("cpf", valorFormatado, { shouldValidate: true });
										}}
									/>
									<label className="user-label">
										CPF<span className="text-(--secondary-light)"> *</span>
									</label>
								</div>
								{errors.cpf?.message && <span className="text-red-500 text-sm mt-1">{errors.cpf.message}</span>}
							</div>
						</div>

						{/* Tipo de Usuário */}
						<div className="flex gap-4 my-8">
							<span>Tipo de Usuário: </span>

							<div className="button-group">
								<input
									type="radio"
									id="tipoDeUsuarioSegurado"
									name="tipoDeUsuario"
									value="segurado"
									{...register("tipoDeUsuario", { required: true })}
								/>
								<label htmlFor="tipoDeUsuarioSegurado">Segurado</label>
							</div>

							<div className="button-group">
								<input type="radio" id="tipoDeUsuarioSegurador" value="segurador" {...register("tipoDeUsuario", { required: true })} />
								<label htmlFor="tipoDeUsuarioSegurador">Segurador</label>
							</div>
						</div>

						<div>
							<div className="input-group">
								<input
									required
									id="foto"
									type="text"
									className="input h-10 w-full"
									{...register("foto", {
										// O campo é opcional, mas se preenchido, deve validar o formato
										pattern: {
											value: /^(https?:\/\/[^\s$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp))$/i,
											message: "URL de foto inválida. Deve ser uma URL com extensão de imagem (.jpg, .png, etc.)",
										},
									})}
								/>
								<label className="user-label">Link da foto de Perfil</label>
							</div>
							{errors.foto?.message && <span className="text-red-500 text-sm mt-1">{errors.foto.message}</span>}
						</div>

						<div className="gap-5 mt-6 flex justify-center w-[90%] justify-self-center">
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
								disabled={!isValid || isLoading}
								className={`px-6 py-2 rounded-lg transition-all border-2 font-bold w-[50%] 
                                  ${
																		isValid && !isLoading
																			? "text-(--tertiary) hover:text-(--primary-ex-dark) hover:bg-(--tertiary) border-(--tertiary) cursor-pointer"
																			: "text-(--secondary-dark) bg-transparent border-(--secondary-ex-dark) cursor-not-allowed"
																	}`}>
								{isLoading ? (
									<span>
										<Loader />
									</span>
								) : (
									<span> Cadastrar </span>
								)}
							</button>
						</div>
					</fieldset>
				</form>
			</div>

			{/* Coluna direita - Banner e botões de alternância */}
			<div
				ref={bannerRef}
				className={`flex flex-col justify-center items-center w-full py-15 p-3 md:p-0 md:w-1/2 bg-(--primary-dark)/90 text-white rounded-3xl relative md:mt-3 transition-all duration-700 md:h-fit ${
					showLogin ? "md:transform translate-x-0 z-20 md:py-[23vh]" : "md:transform translate-x-[-105%] z-10"
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
		</main>
	);
};

export default LoginAndRegisterPage;
