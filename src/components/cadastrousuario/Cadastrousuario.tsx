import React from "react";

const CadastroUsuario: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://i.imgur.com/bVWVMU0.png')" }}
        >
            {/* Card */}
            <div className="w-full max-w-2xl bg-black/40 backdrop-blur-lg shadow-lg rounded-3xl p-10 text-white">
                <h2 className="text-2xl font-bold text-center mb-2">Cadastrar Usuário</h2>
                <p className="text-center text-gray-300 mb-8">
                    Preencha os dados para criar sua conta
                </p>

                {/* Informações Pessoais */}
                <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm mb-1">Nome *</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email *</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Senha *</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">CPF *</label>
                        <input
                            type="text"
                            placeholder="Digite seu CPF"
                            className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
                        />
                    </div>
                </div>

                {/* Tipo de Usuário */}
                <div className="mt-6">
                    <label className="block text-sm mb-1">Tipo de Usuário *</label>
                    <select className="w-full p-3 rounded-md bg-black/20 text-white border border-gray-600 focus:border-purple-400 outline-none">
                        <option value="">Selecione...</option>
                        <option value="segurado">Segurado</option>
                        <option value="segurador">Segurador</option>
                    </select>
                </div>

                {/* Foto de Perfil */}
                <div className="mt-6">
                    <label className="block text-sm mb-1">Foto de Perfil</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-3 rounded-md bg-black/20 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-(--tertiary) file:text-white hover:file:bg-(--tertiary-light)"
                    />
                </div>

                {/* Botões */}
                <div className="mt-8 flex justify-between">
                    <button className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">
                        Cancelar
                    </button>
                    <button className="px-6 py-2 rounded-md bg-(--tertiary) hover:bg-(--tertiary-light) text-white font-bold">
                        Cadastrar Usuário
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CadastroUsuario;
