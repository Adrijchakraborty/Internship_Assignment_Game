import Cookies from "js-cookie";

export const setCookie = (value: number) => {
  const highScore = Cookies.get("score");
  const high = highScore ? Number(highScore) : 0;

  if (value > high) {
    Cookies.set("score", String(value));
  }
};

export const getCookie = (): number => {
  const highScore = Cookies.get("score");
  return highScore ? Number(highScore) : 0;
};
