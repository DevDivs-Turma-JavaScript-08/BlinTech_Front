import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
	const location = useLocation();

	const isHomePage = useMemo(() => location.pathname === "/", [location.pathname]);
	const isSobrePage = useMemo(() => location.pathname === "/sobre", [location.pathname]);
	const isServicosPage = useMemo(() => location.pathname === "/servicos", [location.pathname]);
	const isContatoPage = useMemo(() => location.pathname === "/contato", [location.pathname]);
	const isProdutoPage = useMemo(() => location.pathname === "/produtos", [location.pathname]);
	const isCategoriaPage = useMemo(() => location.pathname === "/categorias", [location.pathname]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	// 1. Crie as referências para o modal e o botão de toggle
	const modalRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLDivElement>(null);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const { handleLogout, usuario } = useContext(AuthContext);
	const token = usuario.token;

	function logout() {
		handleLogout();
		console.log("O Usuário foi desconectado com sucesso!");
		// Remova a recarga de página para não resetar o estado.
		// O redirecionamento será tratado pelo seu contexto ou rotas privadas.
	}

	useEffect(() => {
		if (usuario.token !== "") {
			console.log(usuario);
		}
	}, [usuario.token]);

	// 2. Adicione o useEffect para o evento de clique
	useEffect(() => {
		// 3. Implemente a função que verifica o clique
		const handleClickOutside = (event: MouseEvent) => {
			// Verifica se o clique foi fora do modal e do botão de toggle
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				toggleRef.current &&
				!toggleRef.current.contains(event.target as Node)
			) {
				setIsModalOpen(false);
			}
		};

		// Adiciona o event listener somente se o modal estiver aberto
		if (isModalOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// 4. Cleanup: remove o event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isModalOpen]); // O efeito depende do estado do modal

	return (
		<header className="bg-(--primary-ex-dark) text-white py-4">
			<nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
				{/* Lado esquerdo: Logo */}
				<div className="flex-shrink-0">
					<Link to="/">
						<img
							src="https://i.imgur.com/diiGCH2.png"
							alt="Logo da Empresa"
							className="h-15 w-auto" // Ajuste o tamanho do logo
						/>
					</Link>
				</div>

				{/* Centro: Links de navegação */}
				<div className="flex-grow flex justify-center">
					<ul className="flex space-x-2">
						<li>
							<Link
								to="/"
								className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 ${
									!isHomePage
										? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6 hover:text-(--tertiary-dark)`
										: `text-(--secondary) cursor-default`
								} `}>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/sobre"
								className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 transition-all ${
									!isSobrePage
										? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6`
										: `text-(--secondary) cursor-default`
								} `}>
								Sobre
							</Link>
						</li>
						<li>
							<Link
								to="/servicos"
								className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 ${
									!isServicosPage
										? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6`
										: `text-(--secondary) cursor-default`
								} `}>
								Serviços
							</Link>
						</li>
						<li>
							<Link
								to="/contato"
								className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 ${
									!isContatoPage
										? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6`
										: `text-(--secondary) cursor-default`
								} `}>
								Contato
							</Link>
						</li>
						{token !== "" && (
							<>
								<li>
									<Link
										to="/produtos"
										className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 ${
											!isProdutoPage
												? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6`
												: `text-(--secondary) cursor-default`
										} `}>
										Produtos
									</Link>
								</li>
								<li>
									<Link
										to="/categorias"
										className={` relative flex items-center px-4 py-2 font-bold uppercase tracking-wide bg-transparent border-0 outline-0 ${
											!isCategoriaPage
												? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary) before:mr-2 before:w-0 before:transition-all before:duration-300 hover:before:w-6`
												: `text-(--secondary) cursor-default`
										} `}>
										Categorias
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>

				{/* Lado direito: Informações do usuário */}
				{token !== "" ? (
					<div className="flex items-center space-x-4 flex-shrink-0 relative">
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
							className={`w-12 h-12 overflow-hidden flex justify-center bg-cover rounded-full bg-[url(${usuario.foto})] border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:border-(--secondary) transition`}></div>
					</div>
				) : (
					<div className="flex items-center space-x-4 flex-shrink-0">
						<div className="text-right text-sm">
							<span>Bem vindo(a), visitante!</span>
							<small className="block text-xs text-gray-400">
								<span className="text-(--secondary) hover:text-(--primary-ex-light) transition-all">Cadastre-se </span>
								ou
								<Link to="/logar">
									<span className="text-(--tertiary) hover:text-(--primary-ex-light) transition-all"> Acesse sua conta</span>
								</Link>
							</small>
						</div>
						<div
							ref={toggleRef}
							onClick={toggleModal}
							className="w-12 h-12 overflow-hidden flex justify-center items-center rounded-full border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:border-(--secondary) transition">
							<FontAwesomeIcon icon={faUser} className="text-3xl" />
						</div>
					</div>
				)}
				{token !== "" && isModalOpen && (
					<div ref={modalRef} className="absolute top-24 right-4 w-50 bg-(--primary-ex-dark) text-white rounded-[30px] shadow-lg p-4 z-50">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 rounded-full overflow-hidden mr-4 ">
								<img src={usuario.foto} alt="Perfil do Usuário" className="w-full h-full object-cover" />
							</div>
							<div>
								<p className="font-bold">{usuario.nome}</p>
								<p className="text-sm">Meus seguros:</p>
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
								<button
									onClick={logout}
									className="block w-full text-left text-(--secondary) hover:bg-(--primary-dark) px-2 rounded-md cursor-pointer">
									Sair
								</button>
							</li>
						</ul>
					</div>
				)}
				{token === "" && isModalOpen && (
					<div ref={modalRef} className="absolute top-24 right-4 w-50 bg-(--primary-ex-dark) text-white rounded-[30px] shadow-lg p-4 z-50">
						<div className="flex items-center mb-4">
							<div className="py-3">
								<p className="text-sm">Ainda não tem cadastro?</p>
								<p className="text-sm">Não perga tempo. Proteja seus eletrônicos agora!</p>
							</div>
						</div>
						<ul className="flex flex-col justify-center items-center pb-3">
							<li>
								<Link to="/logar" className="block  hover:text-(--tertiary) px-2 rounded-md">
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
			</nav>
		</header>
	);
};

export default Navbar;
