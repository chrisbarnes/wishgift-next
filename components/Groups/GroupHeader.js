import { borderColors } from "../../lib/accentColors";
import { getRandomInt } from "../../lib/randomInt";

const GroupHeader = ({ name, description }) => {
  const randomColor = borderColors[getRandomInt(0, 5)];

  return (
    <div className={`flex justify-between mb-4 pb-4 border-b-4 ${randomColor}`}>
      <div>
        <h1 className="text-4xl font-extrabold mb-2 text-gray-700">{name}</h1>
        <p className="text-sm text-black">{description}</p>
      </div>
    </div>
  );
};

export default GroupHeader;
