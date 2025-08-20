import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoReload } from "react-icons/io5";

import Ball from '../components/Ball'
import Obstacle from '../components/Obstacle'
import { getCookie, setCookie } from '../utils/cookie';

const GameBoard: React.FC = () => {
  const [reset,setReset] = useState(false);
  const [score, setScore] = useState(0);
  const [stopped, setStopped] = useState(false);
  const rafId = useRef<number | null>(null);
  const collisionHappened = useRef(false);

  const [bestScore, setBestScore] = useState(getCookie());

  useEffect(() => {
    const checkCollision = () => {
      const ball = document.getElementById("ball") as HTMLElement | null;
      const obstacles = document.querySelectorAll(".obstacle");

      if (ball) {
        const ballRect = ball.getBoundingClientRect();

        obstacles.forEach((obsEl) => {
          const rect = obsEl.getBoundingClientRect();

          const collided =
            ballRect.left < rect.right &&
            ballRect.right > rect.left &&
            ballRect.top < rect.bottom &&
            ballRect.bottom > rect.top;

          if (collided && !collisionHappened.current) {
            console.log("COLLISION!");
            collisionHappened.current = true;
            setStopped(true);
          }

          if (!obsEl.hasAttribute("data-passed") && rect.right < ballRect.left) {
            setScore((prev) => prev + 1);
            obsEl.setAttribute("data-passed", "true");
          }
        });
      }

      if (!collisionHappened.current) {
        rafId.current = requestAnimationFrame(checkCollision);
      }
    };

    rafId.current = requestAnimationFrame(checkCollision);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reset]);

  useEffect(() => {
    if (stopped) {
      const best = getCookie();
      if (score > best) {
        setCookie(score);
        setBestScore(score);
      } else {
        setBestScore(best);
      }
    }
  }, [stopped, score]);

  //reset to initial state
  useEffect(() => {
      const resetAll = () => {
        setScore(0);
        setStopped(false);
        collisionHappened.current = false;
        rafId.current = null;
      }
      resetAll();
    }, [reset])


  return (
    <main className='bg-gray-400 h-[100dvh] flex justify-center items-center'>
      <div className='w-[350px] sm:w-[600px] h-[70%] bg-gray-900 rounded-sm relative flex items-center overflow-hidden'>
        <span className='absolute top-2 left-5 text-xl text-white'>Score: {score}</span>

        <div id='parent' className='w-full h-5 border-b flex items-end justify-between bg-green-500'>
          <Ball stopped={stopped} reset={reset} setReset={()=>setReset(false)}/>
          <Obstacle stopped={stopped} reset={reset} setReset={()=>setReset(false)}/>
        </div>

        {stopped && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white">
            <h1 className='text-3xl font-bold'>Game Over</h1>
            <p>Your score: {score}</p>
            <p>Best score: {bestScore}</p>
            <h2 onClick={()=> setReset(true)} className='text-xl py-2'><IoReload /></h2>
            <Link to={'/scores'} >
              <p className='underline'>Scores</p>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default GameBoard
