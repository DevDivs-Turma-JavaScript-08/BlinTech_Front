export default function Footer() {
    return (
        <footer className="w-full bg-(--primary-ex-dark) py-6">
            <div className="container mx-auto flex flex-col space-y-6 px-4">

                <div className="flex">
                    <div className="flex flex-col w-[20vw] items-center">
                        <img
                            src="https://images-ext-1.discordapp.net/external/v9uTH383FKCC6F29yVEuyjrOmrbS7SN3gJPtEJrsCF8/https/i.imgur.com/diiGCH2.png?format=webp&quality=lossless&width=519&height=483"
                            alt="Logo BlinTech"
                            className="w-30"
                        />
                        <p className="text-white font-semibold text-sm">
                            Seu dispositivo, nossa segurança!
                        </p>
                    </div>
                    <div className="w-[70vw] grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 ml-8 items-start">


                        <div>
                            <h3 className="text-(--secondary) font-semibold mb-4">Home</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-(--tertiary)">Benefício</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Categorias</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Dúvidas Frequentes</a></li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-(--secondary) font-semibold mb-4">Sobre</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-(--tertiary)">Nossa Hístoria</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Inovação</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Missão</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Visão</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Valores</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">DevDivs</a></li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-(--secondary) font-semibold mb-4">Serviços</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-(--tertiary)">Seguros</a></li>
                                <li><a href="#" className="hover:text-(--tertiary)">Produtos</a></li>

                            </ul>
                        </div>


                        <div>
                            <h3 className="text-(--secondary) font-semibold mb-4">Contato</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-(--tertiary)">Nosso Time</a></li>

                            </ul>
                        </div>

                    </div>
                </div>


                <div className="w-full flex justify-between items-center border-t border-gray-400 pt-4">

                    <div className="text-sm text-white">
                        © 2025 Direitos Reservados - BLINTECH
                    </div>


                    <div className="flex space-x-3">
                        <a
                            href="https://github.com/DevDivs-Turma-JavaScript-08"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://www.svgrepo.com/show/361183/github-alt.svg"
                                alt="GitHub"
                                className="w-6 h-6 invert mr-20"
                            />
                        </a>
                    </div>
                </div>

            </div>
        </footer >
    );
}