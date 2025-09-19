import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface CtaCardProps {
	type: "link" | "button" | "submit";
	path?: string;
	text?: string;
	textColor?: string;
	textHover?: string;
	bgColor?: string;
	bgHover?: string;
	border?: string;
	icon?: IconDefinition;
	onClick?: () => void;
}

function CtaCard({ ...props }: CtaCardProps) {
	return (
		<>
			{props.type === "link" ? (
				<Link
					to={props.path}
					className={`flex-1 text-center px-4 py-2 bg-${props.bgColor} rounded-md text-${
						props.textColor
					} font-semibold transition-all duration-300 hover:scale-105 hover:bg-${props.bgHover}
          ${props.border !== "" ? `hover:border-2 border-${props.border}` : ""} hover:shadow-lg`}>
					{props.icon ? <FontAwesomeIcon icon={props.icon} /> : props.text}
				</Link>
			) : (
				<button
					type={props.type === "submit" ? "submit" : "button"}
					onClick={props.onClick}
					className={`flex-1 px-4 py-2 bg-${props.bgColor} hover:border-2 border-${props.border} rounded-md cursor-pointer text-${props.textColor} font-semibold transition-all duration-300 hover:scale-105 hover:bg-${props.bgHover} hover:text-${props.textHover}`}>
					{props.icon ? <FontAwesomeIcon icon={props.icon} /> : props.text}
				</button>
			)}
		</>
	);
}

export default CtaCard;
