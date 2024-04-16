import React from "react";
import HomeHeader from "../shared/homeHeader";
import { motion as m } from "framer-motion";

function Home() {
    return (
        <>
            <HomeHeader />
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75, ease: "easeOut" }} className="absolute top-0 left-0">
                <main className="w-screen h-screen bg-light-tan">
                    <h1 className="text-deep-teal font-serif text-6xl self-center justify-self-center col-span-3 row-start-3">About</h1>
                    <p>Journaling is beneficial for your mind, body, and soul, but it can be so hard to keep up with this crucial daily habit. Accountable makes journaling a social event. We link you up with family, friends, and like-minded digital neighbors who all have one goal in mind: to keep a daily journal. Through this platform you can quickly and easily write in your digital journal, access previous journal entries, follow other users in their journaling adventure, and keep yourself and others accountable to reaching your goals.

                        Accountable is the work of Brynne Henderson, a software engineer based in Utah. The original product was released in April 2024, with an update release date soon to be announced.

                        Is there a feature missing that you would like to see in the app? Contact us: bwallace7430@gmail.com</p>
                </main >
            </m.div>
        </>
    )
}

export default Home;