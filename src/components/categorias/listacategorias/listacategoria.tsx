

export default function CategoriasSeguros() {
  const planos = [
    {
      titulo: "Básico",
      descricao: "Cobertura simples para danos acidentais em seus dispositivos.",
      icon: "📱",
    },
    {
      titulo: "Intermediário",
      descricao: "Proteção extra com suporte 24h e reposição rápida.",
      icon: "💻",
    },
    {
      titulo: "Plus",
      descricao:
        "Seguro completo com cobertura internacional e máxima proteção.",
      icon: "🎧",
    },
  ];

  return (
    <div className="p-10 bg-white">
      {/* Botão adicionar categoria (centralizado) */}
      <div className="flex justify-center mb-10">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition">
          Adicionar Categoria
        </button>
      </div>

      {/* Planos */}
      <h2 className="text-2xl font-bold text-center mb-6">Nossos Planos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {planos.map((plano, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-orange-100 p-6 rounded-2xl shadow-md text-center hover:scale-105 transition-transform"
          >
            <span className="text-4xl">{plano.icon}</span>
            <h3 className="mt-4 text-lg font-semibold">{plano.titulo}</h3>
            <p className="text-sm mt-2 text-gray-700">{plano.descricao}</p>

            {/* Botões Editar e Excluir */}
            <div className="flex gap-4 mt-4">
              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Editar
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
