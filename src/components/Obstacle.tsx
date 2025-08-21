import React, { useEffect, useRef, useState } from 'react'

type ObstacleType = {
  id: number;
  x: number;
};

interface ObstacleProps {
  stopped: boolean;
  reset: boolean;
  setReset: () => void;
}

const Obstacle: React.FC<ObstacleProps> = ({ stopped, reset, setReset }) => {
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const vx = 200;

  useEffect(() => {
    if (stopped) return;

    const spawnInterval = setInterval(() => {
      setObstacles((prev) => [...prev, { id: Date.now(), x: 0 }]);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [stopped]);

  // move
  useEffect(() => {
    const move = (now: number) => {
      if (stopped) return;

      if (lastTime.current == null) lastTime.current = now;
      const dt = (now - lastTime.current) / 1000;
      lastTime.current = now;

      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, x: obs.x + vx * dt }))
          .filter((obs) => obs.x < window.innerWidth)
      );

      rafId.current = requestAnimationFrame(move);
    };

    rafId.current = requestAnimationFrame(move);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [stopped]);

  //reset to initial state
  useEffect(() => {
    const resetAll = () => {
      rafId.current = null;
      setObstacles([]);
      lastTime.current = null;

      setReset();
    }
    resetAll();
  }, [reset])

  return (
    <div className='flex relative'>
      {obstacles.map((obs) => (
        <span
          key={obs.id}
          className="obstacle absolute bottom-0 w-4 h-12 bg-red-500"
          style={{ transform: `translateX(-${obs.x}px)` }}
        >        </span>
      ))}
    </div>
  )
}

export default Obstacle
