import { useState } from "react";
interface Equipe {
	foto: string;
	nome: string;
	funcao: string;
	frase: string;
	pitch: string;
	formacao: string;
}

export default function CardEquipe() {
	const ListEquipe: Equipe[] = [
		{
			foto: "https://i.imgur.com/vj5DgbC.jpeg",
			nome: "Agata",
			funcao: "Desenvolvedora",
			frase: "Seja a mudança que você quer ver no mundo.",
			pitch: "Apaixonada por soluções front-end e experiência do usuário, busco transformar ideias em interfaces intuitivas e funcionais.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
		{
			foto: "https://i.imgur.com/r9JoYhT.png",
			nome: "Alex",
			funcao: "Desenvolvedor",
			frase: "Acredite no seu potencial, ele é infinito.",
			pitch: "Especialista em back-end, construo APIs robustas e escaláveis, garantindo a performance e a segurança dos nossos sistemas.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
		{
			foto: "https://i.imgur.com/Q1Z67IP.png",
			nome: "Grazielle",
			funcao: "Desenvolvedora",
			frase: "O sucesso é a soma de pequenos esforços.",
			pitch: "Com foco em arquitetura de software, crio soluções otimizadas e de alta qualidade que impulsionam o crescimento do projeto.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
		{
			foto: "https://i.imgur.com/U6lUbHW.png",
			nome: "Leticia",
			funcao: "Desenvolvedora",
			frase: "A persistência é o caminho do êxito.",
			pitch: "Minha especialidade é a prototipagem e o design de interfaces, traduzindo conceitos complexos em designs simples e elegantes.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
		{
			foto: "https://i.imgur.com/EuTNqNp.png",
			nome: "Lucas",
			funcao: "PO",
			frase: "Lidere com paixão e inspire a equipe.",
			pitch:
				"Como Product Owner, meu objetivo é alinhar a visão do produto com as necessidades do mercado, garantindo que entreguemos o máximo de valor.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
		{
			foto: "https://i.imgur.com/0kpfncl.png",
			nome: "Pedro",
			funcao: "Tester",
			frase: "Qualidade não é um ato, é um hábito.",
			pitch: "Responsável por garantir a integridade do produto, realizo testes rigorosos para assegurar que cada funcionalidade seja impecável.",
			formacao: "Generation Brasil - JavaScript Fullstack",
		},
	];

	const [selecionado, setSelecionado] = useState<Equipe | null>(null);

	function handleSelect(equipe: Equipe) {
		if (selecionado && selecionado.nome === equipe.nome) {
			setSelecionado(null);
		} else {
			setSelecionado(equipe);
		}
	}

	return (
		<div className="flex flex-col w-full items-center px-6 pb-12 gap-6 text-white">
			<h1 className="text-6xl font-bold p-3"> Nossa Equipe </h1>
			<div className="flex items-center">
				<div className="flex flex-wrap justify-center gap-6">
					{ListEquipe.map((equipe) => (
						<div
							key={equipe.nome}
							onClick={() => handleSelect(equipe)}
							className={`
              w-56 h-auto p-4 flex flex-col items-center justify-center 
               rounded-lg cursor-pointer
              transform transition-all duration-300 hover:scale-105
              ${
								selecionado?.nome === equipe.nome
									? " bg-(--primary-dark) shadow-[0_0px_10px_rgb(0_0_0_/_0.9)] border-2 border-(--secondary-dark) scale-105 "
									: "border-2 border-transparent bg-(--primary-ex-dark) shadow-lg  "
							}
            `}>
							<div className="w-24 h-24 rounded-full overflow-hidden mb-2">
								<img src={equipe.foto} alt={`Foto de ${equipe.nome}`} className="w-full h-full object-cover" />
							</div>
							<span className="text-lg font-semibold">{equipe.nome}</span>
							<p className="text-sm text-(--secondary-dark)">{equipe.funcao}</p>
						</div>
					))}
				</div>

				{selecionado ? (
					<div className="h-fit w-full p-8 m-4 bg-(--primary-ex-dark) rounded-tl-[250px] rounded-br-[500px] rounded-bl-2xl shadow-[0_0px_10px_rgb(0_0_0_/_0.9)] flex flex-col items-center justify-between transition-all duration-500 content-center">
						<div className="flex items-center">
							<div>
								<h2 className="text-3xl font-bold mb-2 text-white">{selecionado.nome}</h2>
								<p className="text-xl italic text-(--secondary) mb-4">"{selecionado.frase}"</p>
								<p className="mt-4 text-lg font-semibold text-white">{selecionado.formacao}</p>
							</div>
							<div className="p-2 text-center">
								<img src={selecionado.foto} alt={`Foto de ${selecionado.nome}`} className="w-50 h-50 rounded-4xl shadow-lg" />
							</div>
						</div>
						<div className="flex flex-col items-center md:items-start text-center md:text-left">
							<p className="text-md bg-(--primary-ex-light) text-white px-4 py-2 rounded-tl-4xl rounded-br-4xl rounded-bl-2xl">{selecionado.pitch}</p>
						</div>
					</div>
				) : (
					<div
						className="
          w-full max-w-5xl h-64 p-8 mt-6
          bg-(--primary-ex-dark) rounded-lg shadow-xl
          flex justify-center items-center
          text-(--secondary-dark) text-xl transition-all duration-500
        ">
						<p>Selecione um membro da equipe para ver os detalhes.</p>
					</div>
				)}
			</div>
		</div>
	);
}
