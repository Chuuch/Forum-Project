import { useState, useEffect } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const DarkModeToggle = () => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
      // Load mode preference from local storage on initial render
      const savedMode = localStorage.getItem('mode');
      setMode(savedMode || 'light');
    }, []);
  
    const toggleDarkMode = () => {
      // Toggle mode state and update the local storage
      const updatedMode = mode === 'light' ? 'dark' : 'light';
      setMode(updatedMode);
      localStorage.setItem('mode', updatedMode);
  
      // Apply changes to the class name of the <html> element
      const htmlElement = document.getElementsByTagName('html')[0];
      htmlElement.classList.toggle('dark', updatedMode === 'dark');
	};

	return (
		<div>
			<button onClick={toggleDarkMode}>
				{mode === 'light' ? (
					<BsSunFill className='w-7 h-7 dark:fill-[#001440] fill-[#F7AB0A] hover:scale-110 mt-2 mr-2'/>
				) : (
					<BsMoonFill className='w-6 h-6 mt-2 mr-2 hover:scale-110 fill-[#001440] '/>
				)}
			</button>
		</div>
	);
};

export default DarkModeToggle;
