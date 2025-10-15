import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type Usuario from "../../models/Usuario";
import { atualizar, buscar } from "../../services/Services";
import { Flip, toast } from "react-toastify";

type FormFields = Usuario;

function FormEditPerfil() {
	const navigate = useNavigate();
	const { usuario, handleLogin } = useContext(AuthContext);
	const token = usuario.token;
	const { id } = useParams<{ id: string }>();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		watch,
	} = useForm<FormFields>({
		mode: "onTouched",
		defaultValues: usuario,
	});

	// --- Busca usuário se necessário ---
	useEffect(() => {
		if (id && Number(id) !== usuario.id) {
			buscarUsuario(id);
		} else {
			reset(usuario);
		}
	}, [id]);

	async function buscarUsuario(id: string) {
		try {
			await buscar(`/usuarios/${id}`, (data: Usuario) => reset(data), {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			// console.error("Erro ao buscar usuário:", error);
			if (error.toString().includes("401")) {
				toast.warning("Você precisa estar logado!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
			}
		}
	}

	const senha = watch("senha", "");

	// --- Submissão ---
	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		setIsLoading(true);

		const dadosAtualizados = {
			...usuario,
			...data,
		};

		try {
			await atualizar(`/usuarios/atualizacao`, dadosAtualizados, () => {}, {
				headers: { Authorization: token },
			});

			handleLogin(dadosAtualizados);
			toast.dismiss();
			toast.success("Perfil atualizado com sucesso!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "dark",
				transition: Flip,
			});
			navigate("/perfil");
		} catch (error: any) {
			// console.error("Erro ao atualizar:", error.response?.data || error.message);
			if (error.response?.status === 400) {
				toast.dismiss();
				toast.error("Erro de validação: verifique os campos.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
			} else if (error.toString().includes("401")) {
				toast.warning("Você precisa estar logado!", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
			} else {
				toast.dismiss();
				toast.error("Erro ao atualizar o perfil.", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: "dark",
					transition: Flip,
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container flex flex-col justify-center h-full mx-auto items-center md:w-[30vw] gap-8 px-[20px] py-[25px]">
			<h1 className="text-center text-4xl font-bold text-white">Editar Perfil</h1>

			<form className="flex flex-col w-full items-center justify-center gap-6" onSubmit={handleSubmit(onSubmit)}>
				{/* Nome */}
				<div className="w-full">
					<div className="input-group">
						<input id="nome" type="text" className="input h-10 w-full" {...register("nome", { required: "O nome é obrigatório" })} />
						<label className="user-label">
							Nome<span className="text-(--secondary-light)"> *</span>
						</label>
					</div>
					{errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
				</div>

				{/* Foto */}
				<div className="w-full">
					<div className="input-group">
						<input
							id="foto"
							type="text"
							className="input h-10 w-full"
							{...register("foto", {
								required: "O link da foto é obrigatório",
								pattern: {
									value: /^(https?:\/\/[^\s$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|webp))$/i,
									message: "URL inválida. Deve terminar com .jpg, .png, etc.",
								},
							})}
						/>
						<label className="user-label">Link da foto de Perfil</label>
					</div>
					{errors.foto && <span className="text-red-500 text-sm">{errors.foto.message}</span>}
				</div>

				{/* Senha */}
				<div className="w-full">
					<div className="input-group">
						<input
							id="senha"
							type="password"
							className="input h-10 w-full"
							{...register("senha", {
								minLength: {
									value: 6,
									message: "A nova senha deve ter no mínimo 6 caracteres",
								},
							})}
						/>
						<label className="user-label">Nova Senha</label>
					</div>
					{errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
				</div>

				{/* Botão */}
				<button
					type="submit"
					className={`Btn_perfil ${isValid && !isLoading ? "cursor-pointer hover:bg-(--tertiary-light)" : "opacity-50 cursor-not-allowed"}`}>
					Salvar
					<svg fill="#000000" version="1.1" id="Capa_1" width="25px" height="25px" viewBox="0 0 407.096 407.096" className="svg_perfil">
						<g>
							<g>
								<path d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086 c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032 C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z" />
								<path d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08 c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z" />
							</g>
						</g>
					</svg>
				</button>
			</form>
		</div>
	);
}

export default FormEditPerfil;
