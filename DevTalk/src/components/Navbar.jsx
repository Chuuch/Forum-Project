import { NavLink } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

const Navbar = () => {
    return (
        <header className='sticky top-0 flex items-start justify-between w-full p-5 mx-auto z-20 h-screen bg-[rgb(36,36,36)] '>
            
            <div className='flex flex-row items-center'>
                <h1 className='text-3xl font-bold text-[#F7AB0A]'>DevTalk</h1>
            </div>
                <div >
                    <NavLink className='cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0' to='/'>Home</NavLink>
                    <NavLink className='cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0' to='/trending'>Trending</NavLink>
                    <NavLink className='cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0' to='/contact'>Contact</NavLink>
                    <NavLink className='cursor-pointer p-10 uppercase text-[#F7AB0A] items-center inline-flex justify-center top-0' to='/about'>About</NavLink>
                </div>
            <div>
                <SocialIcon className='cursor-pointer hover:scale-150' network='email' fgColor='#F7AB0A' bgColor='transparent'/>
                <p className='uppercase hidden md:inline-flex text-md text-[#F7AB0A]'>Get in touch</p>
            </div>
        </header>
    )
};

export default Navbar