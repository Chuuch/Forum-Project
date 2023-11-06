import { useForm } from 'react-hook-form';

const Contact = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (formData) => {
		window.location.href = `mailto:info@telerikacademy.com?subject=${formData.subject}&body= Hi, my name is ${formData.name}. ${formData.message}`;
	};

	return (
		<div className="h-screen bg-[rgb(36,36,36)] dark:bg-white flex flex-col items-center justify-center z-30">
			<h1 className="flex items-center justify-center m-15 text-[#F7AB0A] dark:text-[#001440] dark:z-40 text-4xl pb-16">
				Contact Us
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-2 w-fit mx-auto z-20 mb-32"
			>
				<div className="flex space-x-2">
					<input
						{...register('name')}
						placeholder="Name"
						className="bg-[rgb(30,30,30)] p-2 mb-15 text-gray-400 dark:bg-gray-800"
						type="text"
					/>
					<input
						{...register('email')}
						placeholder="Email"
						className="bg-[rgb(30,30,30)] p-2 mb-15 text-gray-400 dark:bg-gray-800"
						type="email"
					/>
				</div>

				<input
					{...register('subject')}
					placeholder="Subject"
					className="bg-[rgb(30,30,30)] p-2 mb-15 text-gray-400 dark:bg-gray-800"
					type="text"
				/>

				<textarea
					{...register('message')}
					placeholder="Message"
					className="bg-[rgb(30,30,30)] p-2 text-gray-400 dark:bg-gray-800"
				/>

				<button
					type="submit"
					className="bg-[#F7AB0A] dark:bg-teal-200 py-5 px-10 rounded-md text-[rgb(36,36,36)] dark:text-[#001440] font-bold text-lg hover:scale-105"
				>
					Submit
				</button>
			</form>
			<div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 dark:bg-teal-600/70 z-1"></div>
		</div>
	);
};

export default Contact;
