export default function BeneficiosSeguro() {
  const beneficios = [
    {
      titulo: 'Agilidade e segurança',
      descricao:
        'Cobertura total e imediata ao sair da loja em caso de Roubo e Furto Qualificado, em parceria com a Zurich.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    {
      titulo: 'Economia em situações inesperadas',
      descricao:
        'Seguro adicionado na compra garante até 80% de desconto, com limite de R$1.800,00 em caso de sinistro.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    {
      titulo: 'Atendimento rápido',
      descricao:
        'Suporte especializado via central ou site. Em até 5 dias úteis você recebe um novo produto.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
    {
      titulo: 'Proteção ainda mais completa',
      descricao:
        'Adicione o seguro Quebra Acidental para cobrir quedas, líquidos e outros danos. Disponível apenas na loja.',
      imagem: 'https://i.imgur.com/SpbW7tb.jpeg',
    },
  ];

  return (
    <div className="bg-violet-100 py-10 px-4 text-center">
        
      <h1 className="text-2xl font-bold mb-8 text-violet-800 ">Benefícios do Seguro BlinTech</h1>
      <div className="flex gap-6 max-w-5xl mx-auto h-[350px]">
        {beneficios.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-black"
          >
            <img
              src={item.imagem}
              alt={item.titulo}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h3 className="text-lg font-bold mb-2 - border-b-2
">{item.titulo}</h3>
            <p className="text-sm text-center">{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}