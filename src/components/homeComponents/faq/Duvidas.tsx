type FAQs = {
  id: number;
  summary: string;
  details: string;
}

function Duvidas({ faqs }: { faqs:FAQs}) {
	return (
		<div>
			<details className="bg-(--primary) font-bold text-white p-2 rounded-2xl transition-all ease-in-out">
				<summary className="mb-2"> {faqs.summary} </summary>
				<p className="text-(--primary) bg-(--primary-ex-light) rounded-b-2xl rounded-t-md font-normal p-2">
					{faqs.details}
				</p>
			</details>
		</div>
	);
}

export default Duvidas;
