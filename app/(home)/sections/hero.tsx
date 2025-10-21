export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="w-full min-h-[240px]
                 pt-[90px] pr-[99px] pb-[90px] pl-[99px]
                 flex flex-col items-center gap-2 text-center"
    >
      <h1 id="hero-title"
          className="font-headTH text-[24px] font-medium leading-[1] text-primary-blue">
        Intania Job Fair 2025
      </h1>
      <p className="font-bodyTH text-[16px] leading-[1] text-primary-blue/90">
        Engineering Your Future
      </p>
    </section>
  );
}
