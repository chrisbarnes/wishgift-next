import { getRandomInt } from "../../../lib/randomInt";
import { bgColors } from "../../../lib/accentColors";

const getRandomBgColor = () => {
  const randomInt = getRandomInt(0, 5);

  return bgColors[randomInt];
};

export const setBgColor = (gift) => {
  const bgColor = getRandomBgColor();

  return { ...gift, bgColor };
};
