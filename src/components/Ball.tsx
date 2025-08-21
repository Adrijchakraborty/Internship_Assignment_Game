import React, { useEffect, useRef } from 'react'

interface BallProps {
  stopped: boolean;
  reset: boolean;
  setReset: () => void;
}

const Ball: React.FC<BallProps> = ({ stopped, reset, setReset }) => {
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  const y = useRef(0);
  const vy = useRef(0);
  const jumping = useRef(false);

  useEffect(() => {
    const GRAVITY = -2400;
    const JUMP_VELOCITY = 900;
    const MAX_HEIGHT = 220;

    const ball = document.getElementById("ball") as HTMLElement | null;

    const applyBallTransform = () => {
      if (ball) ball.style.transform = `translateY(-${y.current}px)`;
    };

    const tick = (now: number) => {
      if (stopped) return;

      if (lastTime.current == null) lastTime.current = now;
      const dt = (now - lastTime.current) / 1000;
      lastTime.current = now;

      vy.current += GRAVITY * dt;
      y.current += vy.current * dt;

      if (y.current <= 0) {
        y.current = 0;
        vy.current = 0;
        jumping.current = false;
      } else if (y.current > MAX_HEIGHT) {
        y.current = MAX_HEIGHT;
        if (vy.current > 0) vy.current = 0;
      }

      applyBallTransform();

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const attemptJump = () => {
      if (stopped) return;
      if (!jumping.current && y.current === 0) {
        jumping.current = true;
        vy.current = JUMP_VELOCITY;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        attemptJump();
      }
    };
    const onTouch = () => attemptJump();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchstart", onTouch);
    document.addEventListener("click", onTouch);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouch);
      document.removeEventListener("click", onTouch);
    };
  }, [stopped]);

  //reset to initial state
  useEffect(() => {
    const resetAll = () => {
      rafId.current = null;
      lastTime.current = null;

      y.current = 0;
      vy.current = 0;
      jumping.current = false;

      setReset();
    }
    resetAll();
  }, [reset])

  return (
    <span id='ball' className='rounded-full bg-amber-600 w-12 h-12 flex justify-center items-center ml-10'>

    </span>
  )
}

export default Ball
