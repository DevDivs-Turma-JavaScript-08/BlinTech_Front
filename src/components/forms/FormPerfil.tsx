
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent, } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { atualizar, buscar } from "../../services/Services";
import Popup from "reactjs-popup";


function FormEditPerfil() {
    const navigate = useNavigate();
    const { usuario, setUsuario } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();
    
    const [usuarioEditar, setUsuarioEditar] = useState<Usuario>({
        id: Number(id),
        nome: "",
        email: "",
        senha: "",
        tipoDeUsuario: "",
        cpf: "",
        foto: "",
    });
    //   useEffect(() => {
    //     if (id) {
    //       buscarUsuario(id);
    //     }
    //   }, [id]);
    //resolver erro na busca. Faz a requisicao, entra em estado peding e retorna um bad request - Id undefined - pesquisar
    //   async function buscarUsuario(id: string) {
    //     try {
    //       await buscar(`/usuarios/${id}`, setUsuarioEditar, {
    //         headers: { Authorization: token },
    //       });
    //     } catch (error: any) {
    //       console.error("Erro ao buscar usuário:", error);
    //       if (error.toString().includes("401")) {
    //         alert("Sessão expirada. Faça login novamente.");
    //       }
    //     }
    //   }
    //   const teste = buscarUsuario(id)
    //   console.log('Isso e o que retorna da minha funcao buscar: ', teste)
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioEditar({
            ...usuarioEditar,
            [e.target.name]: e.target.value,
        });
    }
    async function editarPerfil(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const dadosAtualizados = {
            ...usuario, // traz todos os dados atuais do contexto
            nome: usuarioEditar.nome || usuario.nome,
            foto: usuarioEditar.foto || usuario.foto,
        };
        if (usuarioEditar.senha && usuarioEditar.senha.length >= 6) {
            dadosAtualizados.senha = usuarioEditar.senha;
        }

        console.log("testando erro - enviando para API:", dadosAtualizados);
        try {
            await atualizar("/usuarios/atualizacao", dadosAtualizados, setUsuarioEditar, {
                headers: {
                    Authorization: token,
                },
            });
            // Atualiza o contexto global
            setUsuario(dadosAtualizados);
            alert("Perfil atualizado com sucesso! ✅");
            navigate("/perfil");
        } catch (error: any) {
            console.error("Erro ao atualizar:", error.response?.data || error.message);
            if (error.response?.status === 400) {
                alert("Erro de validação: Verifique se todos os campos estão preenchidos corretamente.");
            } else if (error.toString().includes("401")) {
                alert("Sessão expirada ou não autorizada. Faça login novamente.");
            } else {
                alert("Erro ao atualizar o perfil. Verifique os dados e tente novamente.");
            }
        }
    }

    return (
        
        <div className="container flex flex-col justify-center h-full mx-auto items-center w-1/2 gap-4 border-s-amber-100">
            <h1 className="text-center">Editar Perfil</h1>
            <form
                className="flex flex-col items-center justify-center gap-4"
                onSubmit={editarPerfil}
            >
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            placeholder="Digite um novo nome"
                            name="nome"
                            required
                            className="border-2 border-slate-700 rounded w-64 p-2"
                            value={usuarioEditar.nome}
                            onChange={atualizarEstado}
                        />
                    </div>
                    <div>
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="text"
                            placeholder="Link da nova foto"
                            name="foto"
                            required
                            className="border-2 border-slate-700 rounded w-64 p-2"
                            value={usuarioEditar.foto}
                            onChange={atualizarEstado}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="text"
                            placeholder="Digite sua senha atual ou uma nova"
                            name="senha"
                            required
                            className="border-2 border-slate-700 rounded w-64 p-2"
                            value={usuarioEditar.senha}
                            onChange={atualizarEstado}
                        />
                    </div>

                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate("/teste")}
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}
export default FormEditPerfil;