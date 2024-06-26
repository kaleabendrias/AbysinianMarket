import image1 from "../assets/images/DIVERSITY OF AFRICAN PEOPLE.jpeg";
import { FaHandshake, FaHistory } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { motion } from "framer-motion";
import guts from "../assets/images/This Person Does Not Exist.jpeg";
import eren from "../assets/images/Beyond the Surface_ AI Face Portraits.jpeg";
import image2 from "../assets/images/Ethiopian Culture 🇪🇹.jpeg";

const About = () => {
  return (
    <div className="mt-28">
      <div className="flex flex-col space-y-4">
        <p className="font-bold mx-4 text-2xl md:text-4xl md:mx-16 text-center text-blue-600">
          About Us
        </p>
        <div className="flex flex-col justify-center items-center mt-8">
          <div className="flex mx-4 items-center justify-center md:space-x-10 md:mx-16 mt-4">
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <img src={image2} className="hidden md:flex w-80" />
            </motion.div>
            <div>
              <p className="text-3xl text-center w-full mb-8">
                Your Ultimate Shopping Destination! Explore a world of endless
                possibilities with{" "}
                <span className="font-bold text-blue-600 font-mono">
                  AbyssiniaMarket
                </span>
                , where you&apos;ll find everything you need and more.
              </p>
              <p className="w-[90%] text-2xl mt-4 font-thin mb-12">
                From trendy fashion to the latest gadgets, from gourmet foods to
                everyday essentials, we&apos;ve got it all. Shop with confidence
                and convenience, knowing that AbyssiniaMarket has curated the
                best products for you. Elevate your shopping experience and
                discover new treasures every day at AbyssiniaMarket!&ldquo;
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-x-4 m-16">
            <div className="">
              <div className="flex items-center space-x-4 w-full">
                <FaHistory size={30} style={{ color: "darkBlue" }} />
                <p className="text-2xl font-bold text-blue-700">Our story</p>
              </div>
              <p className="font-thin text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                veritatis necessitatibus aperiam quas laborum earum architecto
                unde, voluptatem, dolores nam quo! Adipisci perferendis eum
                error eius, corporis laudantium blanditiis ullam.
              </p>
            </div>
            <div className="m-8">
              <div className="flex items-center space-x-4">
                <GoGoal size={30} style={{ color: "darkBlue" }} />
                <p className="text-2xl font-bold text-blue-700">
                  Mission Statement
                </p>
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
            <p className="text-3xl font-bold text-blue-700">Meet the Team:</p>
          </div>
          <p className="text-xl m-8 w-[80%] font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            delectus autem deleniti itaque! Accusamus tenetur aliquid voluptate
            tempora impedit minus sapiente, facilis facere dolore iure quasi
            nesciunt, aperiam reiciendis corrupti.
          </p>
          <img src={image1} className="rounded-full w-24 h-24" />
          <a href="https://github.com/kaleabendrias">
            <p className="text-blue-600 font-bold">Kaleab Endrias</p>
          </a>
          <p className="">Developer</p>
        </div>
        <div className="mt-16">
          <p className="text-2xl md:text-4xl text-center w-full mt-24 mb-8 text-blue-700 font-bold">
            Testimonials
          </p>
          <div className="mb-16 flex flex-col md:flex-row items-center text-lg space-x-4">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 1 }}
              transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            >
              <div className="flex flex-col space-x-2 items-center justify-center">
                <img src={guts} className="h-32 w-32 rounded-full" />
                <p>
                  <span className="text-6xl text-blue-500">&ldquo;</span>
                  Welcome to the realm of Habesha style! Our digital fortress is
                  where the spirits of Ethiopia&apos;s culture converge. Dive
                  into the fray and claim your slice of tradition with our
                  authentic garments. From the hills of Ethiopia to the pixels
                  of your screen, we&apos;re here to unleash the essence of
                  Habesha fashion. Embrace the adventure, fellow warrior!
                </p>
                <p className="text-blue-700 text-xl font-bold">Guts</p>
                <p className="font-light">CEO</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="flex flex-col space-x-2 items-center justify-center">
                <img src={eren} className="h-32 w-32 rounded-full" />
                <p>
                  <span className="text-6xl text-blue-500">&ldquo;</span>
                  Hey, you! Ready to unlock the power of Habesha fashion? Our
                  site is the key to your titan-sized wardrobe dreams. From the
                  dusty streets of Ethiopia to your fingertips, we&apos;re here
                  to revolutionize your style. Join the fight for cultural
                  expression and unleash your inner titan with our authentic
                  garments. It&apos;s time to soar above the walls of fashion
                  conformity!
                </p>
                <p className="text-blue-700 text-xl font-bold">Eren Yager</p>
                <p className="font-light">Developer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
