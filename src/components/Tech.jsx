import { useState } from "react";
import { stack } from "../constants";
import { SectionWrapper } from "../hoc";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, inViewAnim, inViewInitial } from "../utils/motion";
import { styles } from "../style";
import { Tilt } from "react-tilt";
import StackIcon from "./iconComponents/stackIcon";
import { useSectionInView } from "../hooks/useSectionInView";
import { useTheme } from "../context/theme-context";

const Tech = () => {
  const [selectedTab, setSelectedTab] = useState(stack[0]);

  const { ref } = useSectionInView("experience", 0.75);

  const { theme } = useTheme();

  return (
    <>
      <motion.div whileInView={inViewAnim} initial={inViewInitial}>
        <h2 className={`${styles.sectionHeadText}`}>Conocimientos.</h2>
      </motion.div>

      <div className="w-full flex transition-none">
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="textBalance mt-3 font-semibold dark:font-normal text-tertiary dark:text-primaryText text-[17px] max-w-3xl leading-[30px] font-poiret transition-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {stack.map((item) => (
                <div key={item.label}>
                  {item === selectedTab ? (
                    <p className="w-full max-w-xl transition-none">
                      {item.text}
                    </p>
                  ) : null}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div
        ref={ref}
        className="w-full h-fit rounded-2xl overflow-hidden shadow-underShadow flex flex-col bg-secondary dark:bg-tertiary mt-14"
      >
        <ul className="flex w-full m-0 p-1 font-medium">
          {stack.map((item) => (
            <li
              className={`${
                item === selectedTab
                  ? "bg-secondary dark:bg-tertiary"
                  : "bg-tertiary/20 dark:bg-primary/50"
              } hover:bg-tertiary/75 dark:hover:bg-secondary hover:text-secondary dark:hover:text-tertiary hover:font-bold rounded-2xl rounded-b-none w-full px-2 py-3 relative cursor-pointer flex justify-center items-center flex-1 capitalize text-tertiary dark:text-secondary text-[14px] md:text-[20px] font-comfortaa font-bold dark:font-thin text-center`}
              key={item.label}
              onClick={() => setSelectedTab(item)}
            >
              {item.label}
              {item === selectedTab ? (
                <motion.div
                  className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-tertiary dark:bg-secondary w-full"
                  layoutId="underline"
                />
              ) : null}
            </li>
          ))}
        </ul>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-wrap flex-row justify-around md:justify-evenly items-start gap-6 p-6 md:p-12 font-comfortaa"
            >
              {selectedTab
                ? selectedTab.logos.map((logo) => (
                    <Tilt
                      key={logo.name}
                      className={`${
                        logo.name == "Vite" && "gShadow"
                      } flip-card-inner w-36 h-20 flex flex-row rounded-xl justify-start items-center p-3 gap-1 text-white`}
                      style={{
                        background:
                          theme == "dark"
                            ? logo.color
                            : logo.name != "Vite"
                            ? logo.color.slice(0, 7)
                            : "linear-gradient(135deg, rgba(71, 202, 255, 1) 0%, rgba(190, 52, 254, 1) 100%)",
                        boxShadow: "0 0 15px " + logo.color.slice(0, 7),
                      }}
                      options={{
                        reverse: true,
                      }}
                    >
                      <div className="w-7 h-7 md:w-20 md:h-20 zTransform flex-1 flex justify-center items-center">
                        <StackIcon
                          icon={logo.icon}
                          className={"w-full h-full"}
                        />
                      </div>
                      <div className="zTransform flex flex-[1.5] p-0 justify-center items-center">
                        <h3 className="text-center text-xs ">{logo.name}</h3>
                      </div>
                    </Tilt>
                  ))
                : "Whoops!"}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
