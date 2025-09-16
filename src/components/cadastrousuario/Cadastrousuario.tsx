import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Services";

const CadastroUsuario: React.FC = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [confirmarSenha, setConfirmarSenha] = useState<string>("");

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		email: "",
		senha: "",
		cpf: "",
		tipoDeUsuario: "Segurado",
		foto: "",
	});

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar();
		}
	}, [usuario]);

	function retornar() {
		navigate("/login");
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	}

	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value);
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(usuario);

		if (confirmarSenha === usuario.senha && usuario.senha.length >= 6) {
			setIsLoading(true);

			try {
				await cadastrarUsuario(`/usuarios/cadastro`, usuario, setUsuario);
				alert("Usuário cadastrado com sucesso!");
			} catch (error) {
				alert("Erro ao cadastrar usuário!");
			}
		} else {
			alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.");
			setUsuario({ ...usuario, senha: "" });
			setConfirmarSenha("");
		}

		setIsLoading(false);
	}

	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center"
			style={{ backgroundImage: "url('https://i.imgur.com/bVWVMU0.png')" }}>
			{/* Card */}
			<form onSubmit={cadastrarNovoUsuario}>
				<fieldset className="w-full max-w-2xl bg-black/40 backdrop-blur-lg shadow-lg rounded-3xl p-10 text-white">
					<legend className="text-2xl font-bold text-center mb-2">Cadastrar Usuário</legend>
					<p className="text-center text-gray-300 mb-8">Preencha os dados para criar sua conta</p>

					{/* Informações Pessoais */}
					<h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="nome" className="block text-sm mb-1">
								Nome *
							</label>
							<input
								type="text"
								id="nome"
								name="nome"
								placeholder="Nome"
								className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
								value={usuario.nome}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm mb-1">
								Email *
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
								value={usuario.email}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>

						<div>
							<label htmlFor="senha" className="block text-sm mb-1">
								Senha *
							</label>
							<input
								type="password"
								id="senha"
								name="senha"
								placeholder="Senha"
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
								value={usuario.senha}
							/>
						</div>

						<div>
							<label htmlFor="confirmarSenha" className="block text-sm mb-1">
								Confirmar Senha *
							</label>
							<input
								type="password"
								id="confirmarSenha"
								name="confirmarSenha"
								placeholder="confirmarSenha"
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
								className="w-full p-3 rounded-md bg-black/20 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 outline-none"
								value={confirmarSenha}
							/>
						</div>

						<div>
							<label htmlFor="cpf" className="block text-sm mb-1">
								CPF *
							</label>
							<input
								type="text"
								id="cpf"
								name="cpf"
								placeholder="CPF"
								value={usuario.cpf}
								onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								className="w-full p-3 rounded-md bg-black/20 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-(--tertiary) file:text-white"
							/>
						</div>
					</div>

					{/* Tipo de Usuário */}
					<div className="mt-6">
						<label htmlFor="tipoDeUsuario" className="block text-sm mb-1">
							Tipo de Usuário *
						</label>
						<select
							id="tipoDeUsuario"
							name="tipoDeUsuario"
							value={usuario.tipoDeUsuario}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}
							className="w-full p-3 rounded-md bg-black/20 text-white border border-gray-600 focus:border-purple-400 outline-none">
							<option value="">Selecione...</option>
							<option value="segurado">Segurado</option>
							<option value="segurador">Segurador</option>
						</select>
					</div>

					{/* Foto de Perfil */}
					<div className="mt-6">
						<label htmlFor="foto" className="block text-sm mb-1">
							Foto de Perfil
						</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Link da sua foto"
							className="w-full p-3 rounded-md bg-black/20 text-white border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-(--tertiary) file:text-white hover:file:bg-(--tertiary-light)"
							value={usuario.foto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>

					{/* Botões */}
					<div className="mt-8 flex justify-between">
						<button className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">Cancelar</button>
						<button type="submit" className="px-6 py-2 rounded-md bg-(--tertiary) hover:bg-(--tertiary-light) text-white font-bold">
							{isLoading ? (
								<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img>
							) : (
								<span> Cadastrar </span>
							)}
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
};

export default CadastroUsuario;
