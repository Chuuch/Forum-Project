import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Categories = () => {
	const [showCategories, setShowCategories] = useState(false);

	const handleCategoriesClick = () => {
		setShowCategories(!showCategories);
	};
	return (
		<div className="flex flex-row justify-center items-start z-40 cursor-pointer">
			<div onClick={handleCategoriesClick} className="cursor-pointer">
				<button className="block w-48 h-16 hover:scale-105 z-20 uppercase outline-none border-none rounded text-base font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] dark:bg-teal-200 dark:text-[#001440]">
					Categories
				</button>
			</div>
			{showCategories && (
				<div className="absolute mt-24 z-50 pb-10">
					<ul className="inline-flex bg-[rgb(30,30,30)] dark:bg-[#001440] text-gray-400 border border-[#F7AB0A] dark:border-teal-200 z-50 rounded-md">
						<NavLink to="/c">
							<li className="p-4 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img src="/icons/c.png" alt="c" className="w-8 h-8 p-1" />C
							</li>
						</NavLink>
						<NavLink to="/csharp">
							<li className="p-4 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img
									src="/icons/csharp.png"
									alt="csharp"
									className="w-8 h-8 p-1"
								/>
								C#
							</li>
						</NavLink>
						<NavLink to="/java">
							<li className="p-3 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img
									src="/icons/java.png"
									alt="java"
									className="w-10 h-10 p-1"
								/>
								Java
							</li>
						</NavLink>
						<NavLink to="javascript">
							<li className="p-4 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img src="/icons/js.png" alt="js" className="w-8 h-8 p-1" />
								JavaScript
							</li>
						</NavLink>
						<NavLink to="/python">
							<li className="p-4 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img
									src="/icons/python.png"
									alt="python"
									className="w-8 h-8 p-1"
								/>
								Python
							</li>
						</NavLink>
						<NavLink to="/typescript">
							<li className="p-4 flex flex-row justify-center items-center hover:bg-[#F7AB0A] dark:hover:bg-teal-200 hover:text-[rgb(36,36,36)]">
								<img src="/icons/ts.png" alt="ts" className="w-8 h-8 p-1" />
								Typescript
							</li>
						</NavLink>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Categories;
