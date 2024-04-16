import React from "react";
import HomeHeader from "../shared/homeHeader";
import { motion as m } from "framer-motion";

function Home() {
    return (
        <>
            <HomeHeader />
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} className="flex flex-column flex-1">
                <main className="flex-1">
                    <div style={{ backgroundImage: `url(../../src/assets/HomeBackground.jpg)` }} className="bg-no-repeat bg-cover bg-right flex-1 grid grid-cols-7 grid-rows-5">
                        <h1 className="text-tan font-serif text-6xl self-center justify-self-center col-span-3 row-start-3">Accountable</h1>
                        <img
                            src="../../src/assets/NavigationButton.png"
                            className="cursor-pointer col-start-4 row-start-5 self-end justify-self-end mb-5 mr-11 hover:animate-bounce"
                        />
                    </div>
                </main>
            </m.div>
        </>
    )
}

export default Home;