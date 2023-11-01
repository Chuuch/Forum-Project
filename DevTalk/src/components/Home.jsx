import { useState } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';

const Home = () => {
    const [thread, setThread] = useState('');
    const [text] = useTypewriter({
        words: ['Welcome to DevTalk!', '<Made by developers />','{For developers!}'],
        loop:true,
        delaySpeed: 2000
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread('');
    }
    return (
        <div className='flex flex-col items-center justify-center bg-[rgb(36,36,36)] h-screen font-space space-y-8'>
            <h1 className='text-6xl font-semibold text-[#F7AB0A] p-20 relative'>
                <span className='mr-3'>{text}</span>
                <Cursor cursorColor='#F7AB0A'/>
            </h1>
            <h2 className='text-3xl mb-10 text-[#F7AB0A]'>
                Create a Thread
            </h2>
            <form className='flex items-center space-x-5 w-2/3 mb-30' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center  w-3/4'>
                    <label htmlFor="thread" className='text-2xl text-[#F7AB0A]' >Title / Description</label>
                    <input className='p-3 bg-[rgb(30,30,30)] text-[#F7AB0A]' placeholder='Subject' type="text" name='thread' required value={thread} onChange={(e) => setThread(e.target.value)} />
                </div>
                <button className='block w-52 h-14 p-15 mt-7 cursor-pointer outline-none border-none rounded-sm text-base font-bold text-[rgb(36,36,36)] bg-[#F7AB0A] mb-15'>CREATE THREAD</button>
            </form>
        </div>
    )
}

export default Home