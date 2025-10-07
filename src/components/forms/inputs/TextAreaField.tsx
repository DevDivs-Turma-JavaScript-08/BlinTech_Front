import type { ChangeEvent } from "react";

interface TextAreaProps {
  name: string;
  placeholder: string;
  rows: number;
  value: any;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  required: boolean;
}

function TextAreaField({ ...props }: TextAreaProps) {
  return (
		<div className="relative" id={`input${props.name}`}>
			<textarea
				name={props.name}
				placeholder={props.placeholder}
				className="block w-full mt-4 text-sm px-4  focus:text-white selection:text-white  appearance-none  focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px] hover:border-(--primary) border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
				value={props.value}
				onChange={props.onChange}
			/>
			<label
				className="rounded-xl peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-(--primary) data-[disabled]:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white"
				htmlFor={props.name}>
				{`${props.label}`} {props.required && <span className="text-[1.25rem] text-(--secondary)"> * </span>}
			</label>
		</div>
	);
}

export default TextAreaField;
