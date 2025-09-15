type FAQs = {
  id: number;
  summary: string;
  details: string;
}

function Duvidas({ faqs }: { faqs:FAQs}) {
	return (
		<div>
			<details className="bg-(--primary) font-bold text-white p-2 rounded-tl-xl rounded-br-xl rounded-tr-[24px] rounded-bl-[24px] transition-all ease-in-out cursor-pointer hover:bg-(--primary-dark) hover:text-(--tertiary)">
				<summary className="mb-2"> {faqs.summary} </summary>
				<p className="text-(--primary) bg-(--primary-ex-light) rounded-tl-xl rounded-br-xl rounded-tr-[24px] rounded-bl-[24px] font-normal p-2">
					{faqs.details}
				</p>
			</details>
		</div>
	);
}

export default Duvidas;
