import { getRandomInt } from "../../../lib/randomInt";
import { bgColors } from "../../../lib/accentColors";

const getRandomBgColor = (): string => {
  const randomInt = getRandomInt(0, 5);

  return bgColors[randomInt];
};

export const setBgColor = <T extends object>(gift: T): T & { bgColor: string } => {
  const bgColor = getRandomBgColor();

  return { ...gift, bgColor };
};
