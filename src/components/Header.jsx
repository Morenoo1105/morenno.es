import { motion } from "framer-motion";
import React from "react";
import { navLinks } from "../constants";
import { TbLanguage, TbMoonFilled } from "react-icons/tb";
import StackIcon from "./iconComponents/stackIcon";
import { useActiveSectionContext } from "../context/active-section-context";

const Header = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header id="home" className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[5rem] w-full rounded-none border border-tertiary sm:border-secondary border-opacity-40 bg-tertiary bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[42rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      />

      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="font-comfortaa flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-bold sm:w-[42rem] sm:flex-nowrap sm:gap-5">
          {navLinks.map((link) => (
            <motion.li
              className="relative h-3/4 flex items-center justify-center"
              key={link.id}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <a
                className={`flex w-full items-center justify-center px-3 py-3 ${
                  link.id == activeSection
                    ? "text-tertiary hover:text-primaryText"
                    : "text-primaryText hover:text-secondary"
                }   transition-colors`}
                href={`#${link.id}`}
                onClick={() => {
                  setActiveSection(link.id);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.id == "home" ? (
                  <StackIcon icon={link.id} className={"text-[1.2rem]"} />
                ) : (
                  link.title
                )}
              </a>

              {link.id == activeSection && (
                <motion.span
                  className="bg-secondary rounded-full absolute inset-0 -z-10"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.li>
          ))}
          <motion.li
            className="w-[0.1rem] h-2/3 bg-secondary bg-opacity-50 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          />
          <motion.li
            className="flex items-center justify-center text-[1.2rem]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <a
              className="flex w-full items-center justify-center mx-3 my-3 hover:text-secondary transition"
              href=""
            >
              <TbLanguage />
            </a>
            <button
              className="flex w-full items-center justify-center mx-3 my-3 hover:text-secondary transition"
              onClick={() => {}}
            >
              <TbMoonFilled />
            </button>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;