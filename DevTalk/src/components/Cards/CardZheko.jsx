import { SocialIcon } from 'react-social-icons';

const CardZheko = () => {
	return (
		<article className="flex flex-col rounded-lg items-center space-y-7 justify-evenly flex-shrink-0 w-[500px] md:w-[450px] md:h-[600px] xl:[600px] bg-[rgb(30,30,30)] dark:bg-[#001440] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
			<div className="px-0 md:px-10">
				<img
					src="/images/Zheko.jpg"
					alt="Zheko"
					className="w-32 h-32 rounded-full object-cover object-center"
				/>
				<h4 className="text-gray-400 text-4xl font-light">Zheko Stanchev</h4>
				<p className="text-gray-400 font-bold text-2xl mt-1">DevTalk</p>
				<div className="flex space-x-2 my-2">
					<SocialIcon
						url="https://facebook.com"
						fgColor="#4267B2"
						bgColor="transparent"
						className="hover:scale-125"
					/>
					<SocialIcon
						url="https://twitter.com"
						fgColor="#1DA1F2"
						bgColor="transparent"
						className="hover:scale-125"
					/>
					<SocialIcon
						url="https://linkedin.com"
						fgColor="#0077B5"
						bgColor="transparent"
						className="hover:scale-125"
					/>
					<SocialIcon
						url="https://github.com/z-stanGH"
						fgColor="#ddd"
						bgColor="transparent"
						className="hover:scale-125"
					/>
				</div>

				<p className="uppercase py-5 text-gray-300">03 JUL 2023 - PRESENT</p>

				<ul className="list-disc space-y-4 ml-5 text-lg text-gray-300	">
					<li>Admin Post Functionality</li>
					<li>Admin User Management</li>
					<li>Admin Functionality</li>
					<li>Public Features</li>
					<li>Project Issue Management</li>
				</ul>
			</div>
		</article>
	);
};

export default CardZheko;
