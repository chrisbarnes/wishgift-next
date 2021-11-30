const GiftsCount = ({ totalGifts, filteredGifts }) => {
  if (filteredGifts === 0) {
    return <p className="text-2xl font-light ">No gifts found.</p>;
  }

  return (
    <p className="text-2xl font-light">
      Showing {totalGifts > 1 && filteredGifts === totalGifts && "all "}
      <strong className="font-extrabold">{filteredGifts}</strong> gift
      {filteredGifts > 1 && "s"}.
    </p>
  );
};

export default GiftsCount;
