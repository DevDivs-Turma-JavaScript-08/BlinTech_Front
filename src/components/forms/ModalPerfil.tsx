import Popup from "reactjs-popup";
import FormEditPerfil from "./FormPerfil";
function ModalPerfil() {
    return (
        <>
        <div >
            <Popup
            
            trigger={
                <button className="border rounded-3xl px-4 bg-violet-400">Editar Perfil</button>
            }
            modal
            contentStyle={{
                borderRadius: '1.5em',
                padding: '2em',
                background: 'white',
                border: 'solid 5px',
                color: 'black',
                width: '400px',
                height: '400px',
            }}
            >
                <FormEditPerfil />
            </Popup>
        </div>
        </>
    )
}
export default ModalPerfil
