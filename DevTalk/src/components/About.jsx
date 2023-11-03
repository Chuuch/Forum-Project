import CardJoro from "./CardJoro";
import CardDani from './CardDani';
import CardZheko from "./CardZheko";

const About = () => {
    return (
    <>
        
        <div className="bg-[rgb(36,36,36)] h-screen flex flex-col max-w-full px-10 justify-evenly items-center mx-auto z-20">
        <h1 className="uppercase flex justify-center items-center text-[#F7AB0A] text-3xl">The Dev Team</h1>
            <div className="w-full flex space-x-5 p-10 justify-evenly z-20 mb-16">
            <CardJoro className='text-gray-400'/>
            <CardDani />
            <CardZheko />
            </div>
            <div className="w-full absolute -skew-y-12 h-[500px] top-[30%] left-0 bg-[#F7AB0A]/10 z-1"></div>
        </div>
    </>
    )
};

export default About;