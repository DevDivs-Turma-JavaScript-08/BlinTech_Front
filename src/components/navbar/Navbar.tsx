import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Navbar: React.FC = () => {
	const location = useLocation();

	const isHomePage = useMemo(() => location.pathname == "/", [location.pathname]);
	const isSobrePage = useMemo(() => location.pathname == "/sobre", [location.pathname]);
	const isServicosPage = useMemo(() => location.pathname == "/servicos", [location.pathname]);
	const isContatoPage = useMemo(() => location.pathname == "/contato", [location.pathname]);

	return (
		<header className="bg-(--primary-ex-dark) text-white py-4">
			<nav className="flex items-center justify-between max-w-7xl mx-auto px-4">
				{/* Lado esquerdo: Logo */}
				<div className="flex-shrink-0">
					<a href="/">
						<img
							src="https://i.imgur.com/diiGCH2.png"
							alt="Logo da Empresa"
							className="h-15 w-auto" // Ajuste o tamanho do logo
						/>
					</a>
				</div>

				{/* Centro: Links de navegação */}
				<div className="flex-grow flex justify-center">
					<ul className="flex space-x-2">
						<li>
							<a
								href="/"
								className={` 
                  relative flex items-center px-4 py-2 
                  font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0 ${
										!isHomePage
											? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-6 hover:text-(--tertiary-dark)`
											: `text-(--secondary) cursor-default`
									}
                `}>
								Home
							</a>
						</li>
						<li>
							<a
								href="/sobre"
								className={` 
                  relative flex items-center px-4 py-2 
                  font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0 transition-all ${
										!isSobrePage
											? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-6`
											: `text-(--secondary) cursor-default`
									}
                `}>
								Sobre
							</a>
						</li>
						<li>
							<a
								href="/servicos"
								className={` 
                  relative flex items-center px-4 py-2 
                  font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0 ${
										!isServicosPage
											? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-6`
											: `text-(--secondary) cursor-default`
									}
                `}>
								Serviços
							</a>
						</li>
						<li>
							<a
								href="/contato"
								className={` 
                  relative flex items-center px-4 py-2 
                  font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0 ${
										!isContatoPage
											? `cursor-pointer text-(--tertiary) before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-6`
											: `text-(--secondary) cursor-default`
									}
                `}>
								Contato
							</a>
						</li>
					</ul>
				</div>

				{/* Lado direito: Informações do usuário */}
				<div className="flex items-center space-x-4 flex-shrink-0">
					<div className="text-right text-sm">
						<span>Bem vindo(a), visitante!</span>
						<small className="block text-xs text-gray-400">
							<span className="text-(--secondary) hover:text-(--primary-ex-light) transition-all">Cadastre-se </span>
							ou
							<span className="text-(--tertiary) hover:text-(--primary-ex-light) transition-all"> Acesse sua conta</span>
						</small>
					</div>
					<div
						className="w-12 h-12 flex justify-center items-center rounded-full border-3 border-(--tertiary) shadow-lg hover:shadow-xl hover:bg-(--secondary) transition
            ">
						<FontAwesomeIcon icon={faUser} className="text-3xl" />
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
