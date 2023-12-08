"use client"
import Image from "next/image"
import { CustomButton } from "."
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
  } from "../config/motion";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
    const handleScroll = () => {}
  return (
    <AnimatePresence>
        <div className="hero">
        <motion.section className="flex-1 pt-36 padding-x" {...slideAnimation("left")}>
            <motion.div {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>

                <h1 className="hero__title">Find, book or rent your dream car <span className="text-primary-blue">today</span></h1>
                <p className="hero__subtitle">Streamline your car rental experience with our online booking system</p>

                <CustomButton
                    title= "Explore Cars"
                    containerStyles= "bg-primary-blue text-white rounded-full mt-10"
                    handleClick= {handleScroll}

                    />
            </motion.div>
        </motion.div>
        </motion.section>
        <div className="hero__image-container">
            <motion.div className="hero__image" {...slideAnimation("right")}>
                <Image src={"/hero.png"} alt="hero" fill className="object-contain" />
            </motion.div>
            <div className="hero__image-overlay"/>
        </div>
        
    </div>
``` </AnimatePresence>
  )
}

export default Hero