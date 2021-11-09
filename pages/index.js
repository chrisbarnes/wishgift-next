import Navigation from "../components/Navigation/Navigation";
import LargeHero from "../components/Heros/LargeHero";

const App = () => {
  return (
    <div>
      <Navigation />
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
