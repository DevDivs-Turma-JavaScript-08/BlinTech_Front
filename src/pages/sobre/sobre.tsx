import { Link } from "react-router-dom";

function Sobre() {
	return (
		<main className=" flex flex-col w-screen h-screen bg-gray-50 px-6 py-16 justify-center items-center">
        {/* Nossa História */}
        <div className="w-[80%]">
        <section className="mb-20 fade-in">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white p-6 rounded-2xl p-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Nossa História</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        A Blintech nasceu da paixão por tecnologia e inovação. Fundada em 2020, nossa empresa começou como um pequeno time de desenvolvedores visionários que acreditavam no poder da tecnologia para transformar negócios.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Hoje, somos uma empresa líder em soluções tecnológicas, atendendo clientes em todo o Brasil com produtos e serviços de alta qualidade que impulsionam o crescimento e a eficiência dos negócios.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Inovação Constante</h3>
                    <p className="text-gray-600">Sempre buscando as melhores soluções para nossos clientes</p>
                </div>
            </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Nossos Pilares</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                    <div className="text-4xl mb-4 text-center">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Missão</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                        Desenvolver soluções tecnológicas inovadoras que simplifiquem processos e potencializem o sucesso de nossos clientes.
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                    <div className="text-4xl mb-4 text-center">👁️</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Visão</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                        Ser reconhecida como a principal referência em inovação tecnológica no mercado brasileiro até 2030.
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                    <div className="text-4xl mb-4 text-center">💎</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Valores</h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                        Excelência, transparência, inovação e compromisso com a satisfação total de nossos clientes.
                    </p>
                </div>
            </div>
        </section>
        </div>

         <section className="text-center">
            <div className="bg-[var(--primary-ex-light)] rounded-3xl p-12 text-black">
                <h2 className="text-4xl font-bold mb-6">Pronto para Inovar?</h2>
                <p className="text-xl mb-8 opacity-90">
                    Entre em contato conosco e descubra como podemos transformar sua ideia em realidade.
                </p>
                <Link to="/contatos">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                    Contato
                </button>
                </Link>
            </div>
        </section>  

        </main>
	);
}

export default Sobre;