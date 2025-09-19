import { NavLink } from "react-router-dom";

interface CtaCriarProps {
  path: string;
  textColor?: string;
  mainColor: string;
  content: string;
}

function CtaCriar({ ...props } : CtaCriarProps ) {
	return (
		<NavLink
			to={`${props.path}`}
			className={`my-6 border-2 border-(${props.mainColor}) p-3 text-white font-bold rounded-4xl cursor-pointer hover:bg-(${props.mainColor}) transition-all hover:text-${props.textColor}`}>
			{props.content}
		</NavLink>
	);
}

export default CtaCriar;

{/* <NavLink
	to={"/categorias/criar"}
	className="my-6 border-2 border-(--secondary) p-3 text-white font-bold rounded-4xl cursor-pointer hover:bg-(--secondary) transition-all">
	Adicionar Categoria
</NavLink>; */}