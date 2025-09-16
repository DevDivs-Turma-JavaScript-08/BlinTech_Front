export default function BeneficiosSeguro() {
  const beneficios = [
    {
      titulo: 'Seguro Smartphone',
      descricao:
        'Cobertura total e imediata ao sair da loja em caso de Roubo e Furto Qualificado, em parceria com a Zurich.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    {
      titulo: 'Seguro Notebook',
      descricao:
        'Seguro adicionado na compra garante até 80% de desconto, com limite de R$1.800,00 em caso de sinistro.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    {
      titulo: 'Seguro eletronico geral',
      descricao:
        'Suporte especializado via central ou site. Em até 5 dias úteis você recebe um novo produto.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    
  ];

  return (
    <div className="py-10 px-4 text-center">
        
      <div className="flex items-c gap-6 max-w-5xl mx-auto h-[450px]">
        {beneficios.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-black"
          >
            <img
              src={item.imagem}
              alt={item.titulo}
              className="w-20 h-20 mb-4 object-contain rounded-full"
            />
            <h3 className="text-lg font-bold mb-2 - border-b-2
">{item.titulo}</h3>
            <p className="text-sm text-center">{item.descricao}</p>

          <div>
            <button className="bg-violet-400 text-white p-2 rounded-2xl mt-8 hover:cursor-pointer hover:bg-violet-500 hover:border">Contratar Agora</button>
          </div>
          </div>
        ))}
      </div>


    </div>
  );
}