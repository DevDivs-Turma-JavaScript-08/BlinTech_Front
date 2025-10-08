export default function CardMotivos() {
  const escolha = [
		{
			titulo: "Atendimento rapido",
			descricao: "Solucao em 24h",
			imagem: "https://i.imgur.com/hLjfOZK.png",
		},
		{
			titulo: "Sem Franquia",
			descricao: "Sem custos extras",
			imagem: "https://i.imgur.com/0TAFLoV.png",
		},
		{
			titulo: "Suporte",
			descricao: "Atendimento sempre disponivel",
			imagem: "https://i.imgur.com/7VRKvcz.png",
		},

		{
			titulo: "Preco competitivo",
			descricao: "Servicos completos com os melhores precos",
			imagem: "https://i.imgur.com/vMvJRA1.png",
		},
	];

  return (
    <div className="py-10 px-4 text-center">
        
      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto ">
        {escolha.map((item, index) => (
          <div
            key={index}
            className="bg-(--primary-light) text-white rounded-xl p-6 flex flex-col items-center"
          >
            <img
              src={item.imagem}
              alt="imagem"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-bold mb-2
">{item.titulo}</h3>
            <p className="text-sm text-center">{item.descricao}</p>

          </div>
        ))}
      </div>


    </div>
  );
}