import { SparklesCore } from "./ui/sparkles";
import image1 from "../assets/images/𝗡𝗮𝗴𝗮𝘁𝗼.jpeg";
import { FaHandshake, FaHistory } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { useEffect, useState } from "react";

const About = () => {
  const [text, setText] = useState("");
  const fullText = "AbysiniaMarket - Your Ultimate Shopping Destination!";
  const typingSpeed = 50;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          {/* <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          /> */}
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          <span className="font-mono">{text}</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <p className="text-2xl text-center w-[80%]">
          Your Ultimate Shopping Destination! Explore a world of endless
          possibilities with{" "}
          <span className="font-bold text-blue-600">AbyssiniaMarket</span>,
          where you&apos;ll find everything you need and more.
        </p>
        <p className="w-[90%] text-xl mt-4 font-thin mb-12">
          From trendy fashion to the latest gadgets, from gourmet foods to
          everyday essentials, we&apos;ve got it all. Shop with confidence and
          convenience, knowing that AbyssiniaMarket has curated the best
          products for you. Elevate your shopping experience and discover new
          treasures every day at AbyssiniaMarket!&ldquo;
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-x-4">
          <div className="m-8">
            <div className="flex items-center space-x-4">
              <FaHistory size={30} style={{ color: "darkBlue" }} />
              <p className="text-2xl font-bold">Our story</p>
            </div>
            <p className="font-thin text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              veritatis necessitatibus aperiam quas laborum earum architecto
              unde, voluptatem, dolores nam quo! Adipisci perferendis eum error
              eius, corporis laudantium blanditiis ullam.
            </p>
          </div>
          <div className="m-8">
            <div className="flex items-center space-x-4">
              <GoGoal size={30} style={{ color: "darkBlue" }} />
              <p className="text-2xl font-bold">Mission Statement</p>
            </div>
            <p className="font-thin text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis aliquid cum porro labore unde! Dolorum accusantium
              dolor laborum hic, dolores porro praesentium soluta sunt,
              necessitatibus eaque magni omnis eos sed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-24">
        <div className="flex items-center space-x-4">
          <FaHandshake size={30} style={{ color: "darkBlue" }} />
          <p className="text-3xl font-bold">Meet the Team:</p>
        </div>
        <p className="text-xl m-8 w-[80%] font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          delectus autem deleniti itaque! Accusamus tenetur aliquid voluptate
          tempora impedit minus sapiente, facilis facere dolore iure quasi
          nesciunt, aperiam reiciendis corrupti.
        </p>
        <img src={image1} className="rounded-full w-20 h-20" />
        <a href="https://github.com/kaleabendrias">
          <p className="text-blue-600 font-bold">Kaleab Endrias</p>
        </a>
        <p className="">Developer</p>
      </div>
    </>
  );
};

export default About;
