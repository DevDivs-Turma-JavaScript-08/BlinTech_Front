import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="w-full bg-(--primary-ex-dark) py-6">
			<div className="container mx-auto flex flex-col space-y-6 px-4">
				<div className="flex items-center md:items-start gap-20 md:gap-0 md:justify-between flex-col md:flex-row">
					<div className="flex flex-col w-full md:w-[20vw] items-center">
						<img
							src="https://images-ext-1.discordapp.net/external/v9uTH383FKCC6F29yVEuyjrOmrbS7SN3gJPtEJrsCF8/https/i.imgur.com/diiGCH2.png?format=webp&quality=lossless&width=519&height=483"
							alt="Logo BlinTech"
							className="w-30"
						/>
						<p className="text-white font-semibold text-sm text-center">Seu dispositivo, nossa segurança!</p>
					</div>
					<div className="w-fit grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-15 md:ml-8 text-center md:text-start">
						<div>
							<Link to="/" className="text-(--secondary) font-semibold mb-4">
								Home
							</Link>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Benefício
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Categorias
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Dúvidas Frequentes
									</a>
								</li>
							</ul>
						</div>

						<div>
							<Link to="/sobre" className="text-(--secondary) font-semibold mb-4">
								Sobre
							</Link>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Nossa Hístoria
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Inovação
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Missão
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Visão
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Valores
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										DevDivs
									</a>
								</li>
							</ul>
						</div>

						<div>
							<Link to="/servicos" className="text-(--secondary) font-semibold mb-4">
								Serviços
							</Link>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Seguros
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Produtos
									</a>
								</li>
							</ul>
						</div>

						<div>
							<Link to="/contato" className="text-(--secondary) font-semibold mb-4">
								Contato
							</Link>
							<ul className="space-y-2 text-gray-400 text-sm">
								<li>
									<a href="#" className="hover:text-(--tertiary)">
										Nosso Time
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-between items-center border-t border-gray-400 pt-4">
					<div className="text-sm text-white">© 2025 Direitos Reservados - BLINTECH</div>

					<div className="flex space-x-3">
						<a href="https://github.com/DevDivs-Turma-JavaScript-08" target="_blank" rel="noopener noreferrer">
							<img src="https://i.imgur.com/IAxiPUI.png" className="text-white w-[30px]" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
