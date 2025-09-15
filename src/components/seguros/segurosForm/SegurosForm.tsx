// export default interface Produto {
//   id: number;
//   nomeProduto: string;
//   descricao: string;
//   cobertura: string;
//   imei?: string;
//   valorProduto: number;
//   valorSeguro: number;
//   premioMensal: number;
//   tempoUso: number;
//   dataDeCadastro: string;
//   categoria: Categoria | null;
//   usuario: Usuario | null;
// }

export default function SegurosForm() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-200">
      <div className="bg-violet-700 p-8 rounded-lg shadow-xl w-[80%] max-w-3xl">
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold mb-2 text-white">Cadastrar Eletrônico</h1>

          <p className="text-gray-200">Preencha os dados do dispositivo eletrônico</p>
        </div>

        {/* --- Seção: Informações do Dispositivo --- */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-200 text-center">
            Informações do Dispositivo
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                descricao do dispositivo *
              </label>
              
              <input
                type="text"
                id="tipoDispositivo"
                placeholder="Ex: Celular, Notebook, Tablet..."
                className="w-full  text-black bg-white border  rounded-lg p-3  "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nome do produto*
              </label>
              <input
                type="text"
                id="nome"
                placeholder="Ex: Galaxy A55 - Samsung"
                className="w-full bg-white text-black border  rounded-lg p-3 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Valor do Produto *
              </label>
              <input
                type="text"
                id="modelo"
                placeholder="Digite o valor de compra"
                className="w-full bg-white text-black rounded-lg p-3 "
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                IMEI *
              </label>
              <input
                type="text"
                id="numeroIMEI"
                placeholder="Digite o número do IMEI"
                className="w-full bg-white text-black rounded-lg p-3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Tempo de uso *
              </label>
              <input
                type="text"
                id="numeroIMEI"
                placeholder="Digite o tempo de uso em meses"
                className="w-full bg-white text-black  rounded-lg p-3"
              />
            </div>
          

          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Plano de Seguro
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Selecione o Plano de Seguro *
            </label>
            <div className="relative">
              <select
                id="planoSeguro"
                className="w-full bg-white text-black border  rounded-lg p-3 pr-10 appearance-none"
              >
                <option value="" disabled>Selecione um Plano</option>
                <option value="plano1">Básico</option>
                <option value="plano2">Intermediário</option>
                <option value="plano3">Plus</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Seção: Informações --- */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Informações do seguro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Valor do Seguro *
              </label>
              <input disabled
                type="number"
                id="valorSegurado"
                placeholder="preencha as informacoes acima"
                className="w-full bg-white text-black border border-gray-600 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Data de cadastro *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dataCadastro"
                  disabled
                  placeholder="dd/mm/aaaa"
                  className="w-full bg-white text-black rounded-lg p-3 pr-10 "
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Premio Mensal *
              </label>
              <input disabled
                type="number"
                id="valorSegurado"
                placeholder="preencha as informacoes acima"
                className="w-full bg-white text-black border  rounded-lg p-3" 
              />
            </div>
          </div>
        </div>

        
        <div className="flex justify-end space-x-4 pt-4 gap-2">
          <button
            type="button"
            className="px-6 py-3 bg-gray-700 text-gray-200 rounded-lg font-semibold hover:bg-red-600 transition-colors hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-violet-500 text-white rounded-lg font-semibold hover:bg-violet-900 transition-colors hover:cursor-pointer"
          >
            Cadastrar Eletrônico
          </button>
        </div>
      </div>
    </div>
  )
}