export default function Hero() {
  return (
    <section className="w-full flex justify-center">
      {/* เฟรม 320×240 เหมือน Figma */}
      <div
        aria-labelledby="hero-title"
        className="w-[320px] h-[240px]
                   pt-[90px] pr-[99px] pb-[90px] pl-[99px]
                   flex flex-col items-center gap-2 text-center
                   bg-[url('/Checker.png')] bg-repeat bg-center"
      >
        <h1
          id="hero-title"
          className="font-headTH text-[24px] font-medium leading-[1]
                     text-[#102E50] whitespace-nowrap"
        >
          Intania Job Fair 2025
        </h1>

        <p
          className="font-bodyTH text-[16px] font-normal leading-[1]
                     text-[#102E50]/85 whitespace-nowrap text-center"
        >
          Engineering Your Future
        </p>
      </div>
    </section>
  );
}
