import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type FAQs = {
	id: number;
	summary: string;
	details: string;
};

const answerVariants:Variants = {
	enter: {
		opacity: 1,
		height: "auto",
		transition: {
			height: { duration: 0.3, ease: "easeOut" },
			opacity: { duration: 0.3, delay: 0.1 },
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: {
			height: { duration: 0.2, ease: "easeIn" },
			opacity: { duration: 0.2 },
		},
	},
};

function Duvidas({ faqs }: { faqs: FAQs }) {
	// Estado para controlar se o <details> está aberto/fechado
	const [isOpen, setIsOpen] = useState(false);

	// A função é chamada quando o evento toggle da tag <details> é disparado
	const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
		setIsOpen(event.currentTarget.open);
	};

	return (
		<div className="w-full">
			<details
				className="
          w-full 
          bg-(--primary) 
          text-white 
          p-4 sm:p-5 
          rounded-xl 
          shadow-lg 
          transition-colors duration-300
          ease-in-out 
          open:bg-(--primary-dark) open:shadow-xl open:border-2 open:border-(--tertiary)
          hover:bg-(--primary-dark)
        "
				onToggle={handleToggle}
			>
				<summary
					className="
            font-bold 
            text-lg 
            cursor-pointer 
            list-none 
            flex justify-between items-center 
            relative 
            transition-all duration-300
            hover:text-(--tertiary)
          ">
					{faqs.summary}

					<span
						className="
              text-2xl 
              ml-4 
              transform 
              transition-transform duration-300
              details-open:rotate-180 
              rotate-0
              text-(--tertiary)
            ">
						&#9662;
					</span>
				</summary>

				<AnimatePresence initial={false}>
					{isOpen && (
						
						<motion.div
							key="faq-answer"
							initial="exit"
							animate="enter"
							exit="exit"
							variants={answerVariants}
							style={{ overflow: "hidden" }}>

							<hr className="my-3 border-t-2 border-(--primary-light)" />

							{/* Details (Resposta) */}
							<p
								className="
                  text-white 
                  bg-transparent 
                  font-normal 
                  pt-2 
                  text-base
                ">
								{faqs.details}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</details>
		</div>
	);
}

export default Duvidas;
