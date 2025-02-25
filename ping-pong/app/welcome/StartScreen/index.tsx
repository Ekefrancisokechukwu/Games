const StartScreen = () => {
  return (
    <div>
      <h1 className="text-4xl font-play">Ping Pong</h1>

      <button className="mt-10 font-semibold ring-2 transition-all duration-300 hover:scale-105  rounded w-[8rem] py-2.5 bg-lime-700 cursor-pointer mx-auto block">
        Play
      </button>
    </div>
  );
};
export default StartScreen;
