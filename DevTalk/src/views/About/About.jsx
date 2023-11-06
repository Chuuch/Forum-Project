import CardJoro from '../../components/Cards/CardJoro';
import CardDani from '../../components/Cards/CardDani';
import CardZheko from '../../components/Cards/CardZheko';
import { motion } from 'framer-motion';

const About = () => {
	return (
		<>
			<div className="bg-[rgb(36,36,36)] dark:bg-white h-screen flex flex-col max-w-full px-10 justify-evenly items-center mx-auto z-20">
				<h1 className="uppercase flex justify-center items-center text-[#F7AB0A] dark:text-[#001440] text-3xl font-semibold">
					The Dev Team
				</h1>
				<motion.div
					initial={{ y: -300, opacity: 0 }}
					transition={{ duration: 1.5 }}
					whileInView={{ opacity: 1, y: 0}}
					className="w-full flex space-x-5 p-10 justify-evenly z-20 mb-16"
				>
					<CardJoro />
					<CardDani />
					<CardZheko />
				</motion.div>
				<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
			</div>
		</>
	);
};

export default About;
