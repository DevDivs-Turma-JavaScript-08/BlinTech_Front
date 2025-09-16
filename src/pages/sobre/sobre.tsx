import { Link } from "react-router-dom";

function Sobre() {
	return (
		<main className="flex flex-col  bg-[url(https://i.imgur.com/RmVWxzg.png)] bg-repeat-x justify-center items-center text-white">
			{/* Nossa História */}
			<div className=" pt-20 flex flex-col items-center ">
				<section className="w-[80%] mb-20 fade-in">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="bg-(--tertiary-ex-dark) border-2 border-(--tertiary) p-8 rounded-2xl shadow-lg">
							<h2 className="text-5xl font-bold mb-6">Nossa História</h2>
							<p className="text-lg mb-6 leading-relaxed opacity-90">
								A Blintech nasceu da paixão por tecnologia e inovação. Fundada em 2020, nossa empresa começou como um pequeno time de desenvolvedores
								visionários que acreditavam no poder da tecnologia para transformar negócios.
							</p>
							<p className="text-lg leading-relaxed opacity-90">
								Hoje, somos uma empresa líder em soluções tecnológicas, atendendo clientes em todo o Brasil com produtos e serviços de alta qualidade
								que impulsionam o crescimento e a eficiência dos negócios.
							</p>
						</div>

						<div className="bg-(--primary-ex-light) rounded-2xl p-10 text-center text-(--primary-dark) shadow-lg">
							<div className="text-6xl mb-4">🚀</div>
							<h3 className="text-2xl font-bold mb-2">Inovação Constante</h3>
							<p className="opacity-80">Sempre buscando as melhores soluções para nossos clientes</p>
						</div>
					</div>
				</section>
				{/* Footer Banner */}
				{/* Pilares */}
				<section className=" w-[80%] mb-20">
					<h2 className="text-5xl font-bold text-center mb-12">Nossos Pilares</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-(--tertiary-ex-dark) rounded-2xl p-8 shadow-lg text-center border border-(--tertiary)">
							<div className="text-4xl mb-4">🎯</div>
							<h3 className="text-2xl font-bold mb-4">Missão</h3>
							<p className="opacity-90 leading-relaxed">
								Desenvolver soluções tecnológicas inovadoras que simplifiquem processos e potencializem o sucesso de nossos clientes.
							</p>
						</div>
						<div className="bg-(--tertiary-ex-dark) rounded-2xl p-8 shadow-lg text-center border border-(--tertiary)">
							<div className="text-4xl mb-4">👁️</div>
							<h3 className="text-2xl font-bold mb-4">Visão</h3>
							<p className="opacity-90 leading-relaxed">
								Ser reconhecida como a principal referência em inovação tecnológica no mercado brasileiro até 2030.
							</p>
						</div>
						<div className="bg-(--tertiary-ex-dark) rounded-2xl p-8 shadow-lg text-center border border-(--tertiary)">
							<div className="text-4xl mb-4">💎</div>
							<h3 className="text-2xl font-bold mb-4">Valores</h3>
							<p className="opacity-90 leading-relaxed">
								Excelência, transparência, inovação e compromisso com a satisfação total de nossos clientes.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* Call to Action */}
			<section className="text-center w-full flex justify-center mb-20">
				<div className="bg-(--primary-ex-light) rounded-3xl p-12 text-(--primary-dark) w-[70%] shadow-xl">
					<h2 className="text-4xl font-bold mb-6">Pronto para Inovar?</h2>
					<p className="text-xl mb-8 opacity-90">Entre em contato conosco e descubra como podemos transformar sua ideia em realidade.</p>
					<Link to="/contatos">
						<button className="bg-white text-(--primary-dark) px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors shadow-lg">
							Contato
						</button>
					</Link>
				</div>
			</section>
		</main>
	);
}

export default Sobre;
