import CardEquipe from "../../components/cards/cardEquipe/CardEquipe";
import { motion, AnimatePresence } from "framer-motion";

function Contatos() {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="flex flex-col items-center justify-center text-center bg-[url(https://i.imgur.com/5mCcuA4.png)] bg-(--tertiary-ex-dark)"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -30 }}
				transition={{ duration: 0.6, ease: "easeOut" }}>
				<motion.div
					className="bg-[url(https://i.imgur.com/x3Gn2Fn.png)] w-full h-23 bg-repeat-x"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				/>

				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="w-full">
					<CardEquipe />
				</motion.div>

				<motion.div
					className="bg-[url(https://i.imgur.com/j9uFiYm.png)] w-full h-23 bg-repeat-x"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				/>
			</motion.div>
		</AnimatePresence>
	);
}

export default Contatos;
