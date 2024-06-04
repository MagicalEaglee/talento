
import Link from 'next/link';


const Nav = ({login,logout}) => {
  
  return (
    <div className="w-full h-20 bg-white flex justify-around items-center">
      <h1 className='text-gradient text-3xl font-extrabold'>TalentoLink</h1>
      {
        login ?<button onClick={logout} className=' bg-[var(--primary)] font-bold px-10 py-3'>Logout</button>
        :<Link href="./login" className=' bg-[var(--primary)] font-bold px-10 py-3'>Login</Link>
      }
    </div>
  );
};

export default Nav;
