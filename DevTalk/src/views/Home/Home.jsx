import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { NavLink } from 'react-router-dom';

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
			<ul className="inline-flex text-gray-400 dark:text-[#001440] z-50 rounded-md text-2xl">
						<NavLink to="/c">
							<li className="p-4 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img src="/icons/c.png" alt="c" className="w-8 h-8 p-1" />C
							</li>
						</NavLink>
						<NavLink to="/csharp">
							<li className="p-4 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img
									src="/icons/csharp.png"
									alt="csharp"
									className="w-8 h-8 p-1"
								/>
								C#
							</li>
						</NavLink>
						<NavLink to="/java">
							<li className="p-3 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img
									src="/icons/java.png"
									alt="java"
									className="w-8 h-8 p-1"
								/>
								Java
							</li>
						</NavLink>
						<NavLink to="javascript">
							<li className="p-4 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img src="/icons/js.png" alt="js" className="w-8 h-8 p-1" />
								JavaScript
							</li>
						</NavLink>
						<NavLink to="/python">
							<li className="p-4 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img
									src="/icons/python.png"
									alt="python"
									className="w-8 h-8 p-1"
								/>
								Python
							</li>
						</NavLink>
						<NavLink to="/typescript">
							<li className="p-4 flex flex-row justify-center items-center hover:text-[#F7AB0A] dark:hover:text-teal-200">
								<img src="/icons/ts.png" alt="ts" className="w-8 h-8 p-1" />
								Typescript
							</li>
						</NavLink>
					</ul>
			<div className="z-10 text-[#F7AB0A] dark:text-[] mt-10 text-2xl p-15">
			<div className="flex flex-row justify-center items-start z-40 cursor-pointer">
				<div className="absolute mt-24 z-50 pb-10">
			
				</div>
		</div>
			</div>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70"></div>
		</div>
	);
};

export default Home;
