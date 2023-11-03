import { SocialIcon } from 'react-social-icons';

const CardJoro = () => {
	return (
		<article className="flex flex-col rounded-lg items-center space-y-7 justify-start flex-shrink-0 w-[500px] md:w-[450px] md:h-[600px] xl:[600px] bg-[rgb(30,30,30)] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
			<div className="px-0 md:px-10">
				<img
					src="logo2.png"
					alt="logo2"
					className="w-32 h-32 rounded-full object-cover object-center"
				/>
				<h4 className="text-gray-400 text-4xl font-light">Georgi Stoychev</h4>
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
						url="https://github.com/GDStoychev"
						fgColor="#ddd"
						bgColor="transparent"
						className="hover:scale-125"
					/>
				</div>

				<p className="uppercase py-5 text-gray-300">03 JUL 2023 - PRESENT</p>

				<ul className="list-disc space-y-4 ml-5 text-lg text-gray-300	">
					<li>Authentication</li>
					<li>User Functionality</li>
					<li>Browsing Post Functionality</li>
					<li>Private Profile Management</li>
					<li>Single Post View</li>
				</ul>
			</div>
		</article>
	);
};

export default CardJoro;
