const Home = () => {
  return (
    <section className="w-full bg-gray-100 min-h-[89vh] flex py-5">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-5 lg:justify-evenly">

        <div className="bg-lime-50 pt-10 px-4 lg:px-10 mx-3 max-w-[600px] lg:max-w-[500px] bg-white shadow-xl rounded basis-[50%]">
          <h1 className="text-5xl lg:text-6xl text-center font-extrabold mt-7">
            EventMaster
          </h1>
          <p className="text-base lg:text-2xl text-center font-semibold my-2">
            Proyecto final apliaciones en el web y redes inalambricas
          </p>
          <a
            className="max-w-[230px] flex items-center justify-center gap-2 bg-[#00A5CF] hover:bg-[#007390] text-slate-50 font-semibold rounded h-10 mx-auto mt-6 mb-8"
            href="/register"
          >
            Continuar con registro
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
