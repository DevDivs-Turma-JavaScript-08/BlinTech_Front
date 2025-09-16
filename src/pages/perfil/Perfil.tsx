import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Perfil() {
	const navigate = useNavigate();

	const { usuario } = useContext(AuthContext);

	useEffect(() => {
		if (usuario.token === "") {
			alert("Você precisa estar logado");
			navigate("/");
		}
	}, [usuario.token]);

	return (
		<main className="relative h-screen w-full flex flex-col items-center">
			<div className="bg-violet-700 w-[100%] h-[300px]">
				<button className="p-2 w-[100px] text-white m-4 rounded-2xl hover:cursor-pointer hover:underline ">&larr; Voltar</button>
			</div>

			<section className="absolute items-center top-1/6 shadow-2xl">
				<div className="flex gap-8 p-5 bg-white w-[750px] h-[300px] ">
					{/* <div className="bg-black rounded-full h-35 w-35"></div> */}
					<img className="rounded-full h-35 w-35" src={usuario.foto} alt="foto" />
					<div className="flex flex-col gap-2 w-[300px]">
						<h3 className="font-semibold text-2xl">{usuario.nome}</h3>
						<p>CPF: {usuario.cpf}</p>
						<p>Email: {usuario.email}</p>

						<button className="mt-10 bg-violet-400 p-3 rounded-2xl w-[150px] hover:cursor-pointer hover:bg-violet-500">Editar Perfil</button>
					</div>
				</div>
			</section>

			<section className="relative top-1/5 ">
				<h1>seguros efetuados do fulano ciclano</h1>
				<div>cardsSeguros</div>
			</section>
		</main>
	);
}
