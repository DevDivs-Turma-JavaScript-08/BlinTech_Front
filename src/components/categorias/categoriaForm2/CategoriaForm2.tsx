export default function CadastroCategoria() {
    return (
        <div className="min-h-[70vh] w-full bg-gradient-to-b from-violet-600 to-purple-700 py-10">
            <div className="max-w-4xl mx-auto bg-violet-500/30 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10">

                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-(--tertiary) drop-shadow">
                        Cadastrar Categoria
                    </h1>
                    <p className="text-violet-100/90 mt-1">Preencha os dados da cetegoria</p>
                </div>


                <h2 className="text-(--secondary) font-semibold text-center mb-4">
                    Informações da Categoria
                </h2>

                <form className="space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm text-violet-100/90 mb-1">
                                Nome da Categoria *
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Eletrônicos"
                                className="w-full rounded-lg bg-black/40 text-white placeholder-white/60
                           px-4 py-3 border border-white/10 focus:outline-none
                           focus:ring-2 focus:ring-purple-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-violet-100/90 mb-1">
                                Carência (dias) *
                            </label>
                            <input
                                type="number"
                                min={0}
                                placeholder="Ex: 30"
                                className="w-full rounded-lg bg-black/40 text-white placeholder-white/60
                           px-4 py-3 border border-white/10 focus:outline-none
                           focus:ring-2 focus:ring-purple-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-violet-100/90 mb-1">
                            Descrição
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Detalhe sobre a categoria"
                            className="w-full rounded-lg bg-black/40 text-white placeholder-white/60
                         px-4 py-3 border border-white/10 focus:outline-none
                         focus:ring-2 focus:ring-purple-300"
                        />
                    </div>


                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-5 py-2.5 rounded-lg bg-black/50 text-white
                         hover:bg-black/60 border border-white/10"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-purple-300 text-purple-900 font-semibold
                         hover:bg-purple-200"
                        >
                            Cadastrar Categoria
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}