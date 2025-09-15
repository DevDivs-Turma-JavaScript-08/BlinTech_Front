import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isHomePage = useMemo(() => location.pathname == "/", [location.pathname]);


  return (
		<header className="bg-(--primary-ex-dark) text-white py-4">
			<nav className="flex items-center justify-between max-w-6xl mx-auto px-4">
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
					<ul className="flex space-x-6">
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
                  hover:before:w-12`
											: `text-(--secondary) cursor-default`
									}
                  
                `}>
								Home
							</a>
						</li>
						<li>
							<a
								href="/sobre"
								className="
                  relative flex items-center cursor-pointer px-4 py-2 
                  text-(--tertiary) font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0
                  before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-12
                ">
								Sobre
							</a>
						</li>
						<li>
							<a
								href="/servicos"
								className="
                  relative flex items-center cursor-pointer px-4 py-2 
                  text-(--tertiary) font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0
                  before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-12
                ">
								Serviços
							</a>
						</li>
						<li>
							<a
								href="/contato"
								className="
                  relative flex items-center cursor-pointer px-4 py-2 
                  text-(--tertiary) font-bold uppercase tracking-wide 
                  bg-transparent border-0 outline-0
                  before:content-[''] before:block before:h-[1px] before:bg-(--tertiary)
                  before:mr-2 before:w-0 before:transition-all before:duration-300 
                  hover:before:w-12
                ">
								Contato
							</a>
						</li>
					</ul>
				</div>

				{/* Lado direito: Informações do usuário */}
				<div className="flex items-center space-x-4 flex-shrink-0">
					<div className="text-right text-sm">
						<span>Bem vindo(a), visitante!</span>
						<small className="block text-xs text-gray-400">Cadastre-se ou Acesse sua conta</small>
					</div>
					<img
						className="
              px-5 py-5 rounded-full bg-(--secondary) text-white shadow-lg 
              hover:shadow-xl hover:bg-(--secondary) transition
            "></img>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
