import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
// Ícones para o menu sanduíche
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../contexts/AuthContext";

const Navbar: React.FC = () => {
	const location = useLocation();

	// Mapeamento de rotas para estado de ativo
	const isHomePage = useMemo(() => location.pathname === "/", [location.pathname]);
	const isSobrePage = useMemo(() => location.pathname === "/sobre", [location.pathname]);
	const isServicosPage = useMemo(() => location.pathname === "/servicos", [location.pathname]);
	const isContatoPage = useMemo(() => location.pathname === "/contato", [location.pathname]);
	const isProdutoPage = useMemo(() => location.pathname === "/produtos", [location.pathname]);
	const isCategoriaPage = useMemo(() => location.pathname === "/categorias", [location.pathname]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	// NOVO: Estado para o menu responsivo (hamburger)
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLDivElement>(null);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		// Fecha o menu responsivo se o modal for aberto
		setIsMenuOpen(false);
	};

	// NOVO: Função para alternar o menu responsivo
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		// Fecha o modal se o menu responsivo for aberto
		setIsModalOpen(false);
	};

	const { handleLogout, usuario } = useContext(AuthContext);
	const token = usuario.token;

	function logout() {
		handleLogout();
		console.log("O Usuário foi desconectado com sucesso!");
	}

	useEffect(() => {
		if (usuario.token !== "") {
			console.log(usuario);
		}
	}, [usuario.token, usuario]);

	// Hook para fechar o modal/menu ao clicar fora
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Lógica para fechar o modal do usuário
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				toggleRef.current &&
				!toggleRef.current.contains(event.target as Node)
			) {
				setIsModalOpen(false);
			}

			// Lógica para fechar o menu responsivo (Se necessário, adicione uma ref para o menu)
			// Por enquanto, vamos manter o menu responsivo simples, sendo fechado apenas por clique ou navegação.
		};

		if (isModalOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isModalOpen]);

	// Função auxiliar para aplicar estilos de link
	const getLinkClasses = (isActive: boolean) =>
		`relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 transition-all ${
			!isActive
				? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6 hover:text-(--tertiary-dark)`
				: `text-(--secondary) cursor-default`
		}`;

	return (
		<header className="bg-(--primary-ex-dark) text-white py-4 sticky top-0 z-50">
			<nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
				{/* Lado esquerdo: Logo */}
				<div className="flex-shrink-0">
					<Link to="/">
						<img src="https://i.imgur.com/diiGCH2.png" alt="Logo da Empresa" className="h-15 w-auto" />
					</Link>
				</div>

				{/* CONTROLES MOBILE: BOTÃO HAMBURGER E ICONE DE USUÁRIO - VISÍVEL APENAS EM TELAS PEQUENAS */}
				<div className="md:hidden flex items-center">
					<button
						onClick={toggleMenu}
						className="text-(--tertiary) hover:text-(--secondary) focus:outline-none transition-colors mr-4"
						aria-label="Abrir Menu">
						<FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="w-6 h-6" />
					</button>

					{/* Ícone/Login do Usuário - Mantido na direita para mobile */}
					<div
						ref={toggleRef}
						onClick={toggleModal}
						className={`w-12 h-12 overflow-hidden flex justify-center items-center rounded-full border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:border-(--secondary) transition cursor-pointer`}>
						{token !== "" && usuario.foto ? (
							<img src={usuario.foto} alt="Perfil do Usuário" className="w-full h-full object-cover" />
						) : (
							<FontAwesomeIcon icon={faUser} className="text-3xl" />
						)}
					</div>
				</div>

				{/* CENTRO: LINKS DE NAVEGAÇÃO - ESCONDIDOS EM TELAS PEQUENAS, MOSTRADOS EM TELAS MÉDIAS E MAIORES */}
				<div className="hidden md:flex justify-center">
					<ul className="flex space-x-2">
						<li>
							<Link to="/" className={getLinkClasses(isHomePage)}>
								Home
							</Link>
						</li>
						<li>
							<Link to="/sobre" className={getLinkClasses(isSobrePage)}>
								Sobre
							</Link>
						</li>
						<li>
							<Link to="/servicos" className={getLinkClasses(isServicosPage)}>
								Serviços
							</Link>
						</li>
						<li>
							<Link to="/contato" className={getLinkClasses(isContatoPage)}>
								Contato
							</Link>
						</li>
						{token !== "" && (
							<>
								<li>
									<Link to="/produtos" className={getLinkClasses(isProdutoPage)}>
										Produtos
									</Link>
								</li>
								<li>
									<Link to="/categorias" className={getLinkClasses(isCategoriaPage)}>
										Categorias
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>

				{/* LADO DIREITO: INFORMAÇÕES DO USUÁRIO - ESCONDIDO EM TELAS PEQUENAS, MOSTRADO EM TELAS MÉDIAS E MAIORES */}
				{token !== "" ? (
					<div className="hidden md:flex items-center space-x-4 flex-shrink-0 relative">
						<div className="mt-4 flex flex-col text-right text-sm">
							<p>
								Bem vindo(a), <span className="text-(--tertiary)"> {usuario.nome} </span>
							</p>
							<small onClick={logout} className="hover:text-(--secondary) cursor-pointer transition-all">
								sair
							</small>
						</div>
						<div
							ref={toggleRef}
							onClick={toggleModal}
							className={`w-12 h-12 overflow-hidden flex justify-center bg-cover rounded-full border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:border-(--secondary) transition cursor-pointer`}>
							<img src={usuario.foto} alt="Perfil do Usuário" className="w-full h-full object-cover" />
						</div>
					</div>
				) : (
					<div className="hidden md:flex items-center space-x-4 flex-shrink-0">
						<div className="text-right text-sm">
							<span>Bem vindo(a), visitante!</span>
							<small className="block text-xs text-gray-400">
								<Link to="/login">
									<span className="text-(--tertiary) hover:text-(--primary-ex-light) transition-all"> Acesse sua conta </span>
								</Link>
								ou
								<Link to="/cadastro">
									<span className="text-(--secondary) hover:text-(--primary-ex-light) transition-all"> Cadastre-se </span>
								</Link>
							</small>
						</div>
						<div
							ref={toggleRef}
							onClick={toggleModal}
							className="w-12 h-12 overflow-hidden flex justify-center items-center rounded-full border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:border-(--secondary) transition cursor-pointer">
							<FontAwesomeIcon icon={faUser} className="text-3xl" />
						</div>
					</div>
				)}
			</nav>

			{/* MENU RESPONSIVO (Dropdown/Vertical) - VISÍVEL APENAS EM MOBILE QUANDO ABERTO */}
			{isMenuOpen && (
				<div className="md:hidden w-50 rounded-3xl right-1 bg-(--primary-ex-dark) border border-(--primary) absolute z-40 shadow-lg">
					<ul className="flex flex-col items-end py-2 px-4 space-y-1">
						{/* Links principais */}
						<li>
							<Link
								to="/"
								onClick={toggleMenu}
								className={`block w-full py-2 px-2 rounded-md ${
									isHomePage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
								}`}>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/sobre"
								onClick={toggleMenu}
								className={`block w-full py-2 px-2 rounded-md ${
									isSobrePage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
								}`}>
								Sobre
							</Link>
						</li>
						<li>
							<Link
								to="/servicos"
								onClick={toggleMenu}
								className={`block w-full py-2 px-2 rounded-md ${
									isServicosPage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
								}`}>
								Serviços
							</Link>
						</li>
						<li>
							<Link
								to="/contato"
								onClick={toggleMenu}
								className={`block w-full py-2 px-2 rounded-md ${
									isContatoPage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
								}`}>
								Contato
							</Link>
						</li>

						{/* Links autenticados */}
						{token !== "" && (
							<>
								<li className="w-full border-t border-gray-700 mt-2 pt-2"></li>
								<li>
									<Link
										to="/produtos"
										onClick={toggleMenu}
										className={`block w-full py-2 px-2 rounded-md ${
											isProdutoPage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
										}`}>
										Produtos
									</Link>
								</li>
								<li>
									<Link
										to="/categorias"
										onClick={toggleMenu}
										className={`block w-full py-2 px-2 rounded-md ${
											isCategoriaPage ? "text-(--secondary) font-bold text-xl" : "text-white hover:bg-gray-700"
										}`}>
										Categorias
									</Link>
								</li>
								<li>
									<button
										onClick={() => {
											logout();
											toggleMenu();
										}}
										className="block w-full text-left py-2 px-2 text-(--secondary) hover:bg-(--primary-ex-dark) rounded-md">
										Sair
									</button>
								</li>
							</>
						)}

						{/* Links de login/cadastro para visitante */}
						{token === "" && (
							<>
								<li className="w-full border-t border-gray-700 mt-2 pt-2"></li>
								<li>
									<Link
										to="/login"
										onClick={toggleMenu}
										className="block w-full py-2 px-2 text-center text-(--tertiary) hover:bg-gray-700 rounded-md">
										Fazer Login
									</Link>
								</li>
								<li>
									<Link
										to="/cadastro"
										onClick={toggleMenu}
										className="block w-full py-2 px-2 text-center text-(--secondary) hover:bg-gray-700 rounded-md">
										Cadastre-se
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			)}

			{/* MODAL DE USUÁRIO (PERFIL) */}
			{token !== "" && isModalOpen && (
				<div
					ref={modalRef}
					className="absolute top-24 right-4 w-50 bg-(--primary-ex-dark) border border-(--primary) text-white rounded-[30px] shadow-lg p-4 z-50">
					<div className="flex items-center mb-4">
						<div className="w-18 h-18 rounded-full overflow-hidden mr-4 ">
							<img src={usuario.foto} alt="Perfil do Usuário" className="w-full h-full object-cover" />
						</div>
						<div>
							<p className="font-bold">{usuario.nome}</p>
							<p className="text-sm">{usuario.tipoDeUsuario}</p>
						</div>
					</div>
					<ul className="flex flex-col">
						<li>
							<Link to="/perfil" className="block hover:text-(--tertiary) px-2 rounded-md">
								Perfil
							</Link>
						</li>
						<li>
							<Link to="/produtos" className="block  hover:text-(--tertiary) px-2 rounded-md">
								Ver Meus Seguros
							</Link>
						</li>
						<li className="border-t pt-2 mt-2">
							<button onClick={logout} className="block w-full text-left text-(--secondary) hover:bg-(--primary-dark) px-2 rounded-md cursor-pointer">
								Sair
							</button>
						</li>
					</ul>
				</div>
			)}

			{/* MODAL DE VISITANTE (LOGIN/CADASTRO) */}
			{token === "" && isModalOpen && (
				<div
					ref={modalRef}
					className="absolute top-24 right-4 w-50 bg-(--primary-ex-dark) border border-(--primary) text-white rounded-[30px] shadow-lg p-4 z-50">
					<div className="flex items-center mb-4">
						<div className="py-3">
							<p className="text-sm">Ainda não tem cadastro?</p>
							<p className="text-sm">Não perca tempo. Proteja seus eletrônicos agora!</p>
						</div>
					</div>
					<ul className="flex flex-col justify-center items-center pb-3">
						<li>
							<Link to="/login" className="block  hover:text-(--tertiary) px-2 rounded-md">
								Faça login
							</Link>
						</li>
						<li>
							<Link to="/cadastro" className="block hover:text-(--tertiary) px-2 rounded-md">
								Cadastre-se
							</Link>
						</li>
					</ul>
				</div>
			)}
		</header>
	);
};

export default Navbar;
