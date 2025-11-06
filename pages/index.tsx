import LargeHero from "../components/Heros/LargeHero";
import type { NextPage } from "next";

const App: NextPage = () => {
  return (
    <div>
      <LargeHero
        heading="WishGift"
        description="Lists of gifts."
        backgroundImage="/images/hero-present.jpg"
        link={{ url: "/groups", text: "Groups" }}
      />
    </div>
  );
};

export default App;
