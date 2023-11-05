import { Cursor, useTypewriter } from 'react-simple-typewriter';
import Categories from '../Categories/Categories';

const Home = () => {
	const [text] = useTypewriter({
		words: [
			'Welcome to DevTalk!',
			'<Made by developers />',
			'{For developers!}',
		],
		loop: true,
		delaySpeed: 2000,
	});
	return (
		<div className="flex flex-col items-center justify-center pb-48 bg-[rgb(36,36,36)] dark:bg-white h-screen font-space space-y-8">
			<h1 className="text-6xl font-semibold text-[#F7AB0A] p-20 relative dark:text-[#001440] z-20">
				<span className="mr-3">{text}</span>
				<Cursor />
			</h1>
			<h2 className="text-3xl mb-10 text-[#F7AB0A] dark:text-[#001440] z-20">
				Select a category to view threads
			</h2>
			<div className="z-10 text-[#F7AB0A] dark:text-[] mt-10 text-2xl p-15">
				<Categories />
			</div>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70"></div>
		</div>
	);
};

export default Home;
