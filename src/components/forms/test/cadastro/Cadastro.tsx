import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../../../models/Usuario";
import { cadastrarUsuario } from "../../../../services/Services";

function Cadastro() {
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
		navigate("/");
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
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-amber-300">
				<div className="bg-[url(../assets/bg.png)] bg-cover lg:block w-[100%] h-[100%]"></div>
				<form className="flex justify-center items-center flex-col w-2/3 gap-3" onSubmit={cadastrarNovoUsuario}>
					<h2 className=" text-5xl">Cadastrar</h2>
					<div className="flex flex-col w-full ">
						<label htmlFor="nome">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Nome"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.nome}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full ">
						<label htmlFor="email">E-mail</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.email}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full ">
						<label htmlFor="cpf">CPF</label>
						<input
							type="cpf"
							id="cpf"
							name="cpf"
							placeholder="CPF"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.cpf}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full ">
						<label htmlFor="tipoDeUsuario">Tipo de Usuario</label>
						<select
							id="tipoDeUsuario"
							name="tipoDeUsuario"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.tipoDeUsuario}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}>
							<option value="Segurado"> Segurado </option>
							<option value="Segurador"> Segurador </option>
						</select>
					</div>
					<div className="flex flex-col w-full">
						<label htmlFor="foto">Foto</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Foto"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.foto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full  ">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full  ">
						<label htmlFor="confirmarSenha">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmar Senha"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2  invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={confirmarSenha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
						/>
					</div>
					<div className="flex justify-around w-full gap-8 mt-4">
						<button
							type="reset"
							className="rounded-xl  bg-(--secondary) hover:bg-(--secondary-dark) w-1/2 py-2 transition-all ease-in box-"
							onClick={retornar}>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded-xl  bg-(--tertiary) hover:bg-(--tertiary-dark) hover: w-1/2 py-2 flex justify-center transition-all ease-in">
							{isLoading ? (
								<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img>
							) : (
								<span> Cadastrar </span>
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Cadastro;
