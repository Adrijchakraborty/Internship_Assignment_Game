import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

const ScoreBoard: React.FC = () => {
  const best = getCookie();
  return (
    <>
      <header className='relative border-b py-5'>
      <Link to={"/"}>
        <span className='flex items-center absolute left-2'>
          <MdKeyboardArrowLeft />
          <p>Back</p>
        </span>
      </Link>
      <h1 className='text-center text-2xl font-bold'>Scoreboard</h1>
    </header>
    <main className='flex justify-center items-center'>
      <h1 className='text-lg'>Best Score: {best}</h1>
    </main>
    </>
  )
}

export default ScoreBoard