import { NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

const Navbar = () => {
    return (
        <header className='sticky top-0 flex flex-row items-center justify-between p-5 bg-[rgb(36,36,36)] font-space'>
            
            <div className='flex flex-row items-center justify-center'>
                <img src='logo2.png' alt='logo image' className='w-[100px] h-[100px]'/>
            </div>
                <div>
                    <NavLink className='text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110' to='/'>Home</NavLink>
                    <NavLink className='text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110' to='/trending'>Trending</NavLink>
                    <NavLink className='text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110' to='/contact'>Contact</NavLink>
                    <NavLink className='text-2xl cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0 hover:scale-110' to='/about'>About</NavLink>
                </div>
            <div className='flex flex-row items-center space-x-2'>
                <SocialIcon className='cursor-pointer hover:scale-105' network='email' fgColor='#F7AB0A' bgColor='transparent'/>
                <button className='block p-15 h-10 w-32 hover:scale-105 uppercase outline-none border-none rounded-sm text-2xl font-bold text-[rgb(36,36,36)] bg-[#F7AB0A]'>LOGIN</button>
            </div>
        </header>
    )
};

export default Navbar