import Container from "./container";
import Image from "next/image";

export default function CheckSection() {
  return (
    <Container
      className={
        "relative flex w-full flex-col mt-4 items-center justify-center text-center lg:w-2/3 lg:rounded-lg"
      }
    >
      {/* <div className="z-10 text-sm font-bold tracking-wider text-yellow-600 uppercase">
        Join the Excitement and Play the Lottery Now
      </div> */}

      <h2
        className="z-10 max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-green-800 lg:leading-tight lg:text-4xl dark:text-white"
        style={{
          textShadow: "0 12px 24px rgba(0,0,0,0.25)",
        }}
      >
        LET 's CHECK YOUR REWARD
      </h2>

      <button className="z-10 shadow-lg px-10 py-6 text-lg font-medium text-center text-green-50 bg-green-600 hover:bg-yellow-300 hover:text-green-600 rounded-xl mt-16">
        CHECK REWARD
      </button>

      {/* <div className=" absolute z-0 opacity-90">
        <Image
          src={balloons}
          height={600}
          alt="Hero Illustration"
          loading="eager"
        />
      </div> */}
    </Container>
  );
}
