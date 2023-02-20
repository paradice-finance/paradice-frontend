import Image from "next/image";
import Container from "./container";
import heroImg from "../../public/images/mk.png";
import mascot from "../../public/images/mascot.png";
import tree from "../../public/images/tree.png";
import forest from "../../public/images/forest.png";

export function Welcome() {
  return (
    <>
      <Container className="flex flex-wrap relative lg:bg-sky-300 lg:h-max overflow-y-hidden lg:rounded-xl">
        <div className="flex items-center justify-center w-full z-20">
          <div className="flex flex-col max-w-2xl mb-8 lg:justify-center lg:items-center  lg:bg-white lg:bg-opacity-20 ">
            <h1
              className="text-4xl font-bold leading-snug tracking-tight text-green-800  lg:ml-4 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white"
              style={{
                textShadow: "0 12px 24px rgba(0,0,0,0.25)",
              }}
            >
              PARADICE LOTTERY
            </h1>
            <p
              className="text-xl leading-normal text-green-600 lg:ml-4 lg:text-lg xl:text-lg  mb-5 z-20"
              style={{
                textShadow: "0 12px 24px rgba(0,0,0,0.25)",
              }}
            >
              Take a Chance on Fortune: Play the Lottery and Be Rich Today!
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row lg:py-12 lg:ml-14 z-20">
              <button className=" shadow-lg px-10 py-6 text-lg font-medium text-center text-green-50 bg-green-600 hover:bg-yellow-300 hover:text-green-600 rounded-xl ">
                BUY TICKET
              </button>
            </div>
          </div>
        </div>

        <div className=" absolute right-20 bottom-0 z-20 overflow-hidden invisible lg:visible">
          <Image
            src={mascot}
            height={350}
            alt="Hero Illustration"
            loading="eager"
          />
        </div>

        <div className=" absolute bottom-0 right-0 z-10  hidden lg:block">
          <Image
            src={tree}
            height={500}
            alt="Hero Illustration"
            loading="eager"
          />
        </div>
        <div className=" absolute bottom-0 left-0 z-10 hidden lg:block">
          <Image
            src={forest}
            height={500}
            alt="forest paradise"
            loading="eager"
          />
        </div>
      </Container>
      <div className="flex items-center bg-sky-300 z-20 justify-center w-full lg:w-1/2 ">
        <div className="lg:hidden">
          <Image
            src={heroImg}
            width="616"
            alt="Hero Illustration"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}
