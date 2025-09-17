export default function Produtos() {
  return (
    <div className="min-h-screen bg-[#0B0F2F] p-8">
      <h1 className="text-white text-3xl font-bold text-center mb-10">Meus Produtos</h1>

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        <div className="relative rounded-2xl bg-[#1A1F4A] p-6 text-white shadow-md border border-purple-700">
          {/* Carência */}
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
            30 dias
          </span>

          <h2 className="text-xl font-bold">Produto A</h2>
          <p className="mt-1 text-sm text-gray-300">Descrição: Produto A básico</p>
          <p className="text-sm text-gray-400">Carência: 30 dias</p>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-xl bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-800">
              Adicionar
            </button>
            <button className="flex-1 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
              Excluir
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl bg-[#1A1F4A] p-6 text-white shadow-md border border-purple-700">
          <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
            15 dias
          </span>

          <h2 className="text-xl font-bold">Produto B</h2>
          <p className="mt-1 text-sm text-gray-300">Descrição: Produto intermediário com suporte 24h</p>
          <p className="text-sm text-gray-400">Carência: 15 dias</p>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-xl bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-800">
              Adicionar
            </button>
            <button className="flex-1 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
              Excluir
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl bg-[#1A1F4A] p-6 text-white shadow-md border border-purple-700">
          <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow">
            7 dias
          </span>

          <h2 className="text-xl font-bold">Produto C</h2>
          <p className="mt-1 text-sm text-gray-300">Descrição: Produto completo com cobertura internacional</p>
          <p className="text-sm text-gray-400">Carência: 7 dias</p>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-xl bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-800">
              Adicionar
            </button>
            <button className="flex-1 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}