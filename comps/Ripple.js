import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'

const Ripple = () => {
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        // Client-side-only code
        gsap.registerPlugin(ScrollTrigger);
        const bgVideo = document.querySelector("#bgVideo");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#bgVideo",
                pin: true,
                pinType: "transform",
                end: "800",
                pinSpacing: false,
                scrub: 1.25,
                duration: 1

            }
        });
        if (bgVideo != null) {
            bgVideo.onloadedmetadata = function () {
                tl.to(bgVideo, { currentTime: bgVideo.duration });
            }
        };

        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#homeGrid",
                pin: true,
                start: "top +=200px",
                end: "#bgVideo -=600px",
                pinSpacing: false
            }
        });


    })


    const SSR = typeof window === 'undefined';
    return (
        <div className="homeContent">
            {!SSR ? <video src="ripple11.mp4" id="bgVideo"></video> : null}
            {!SSR ? <div className="homeGrid" id="homeGrid">
                <div className="home1a">How does it work?</div>
                <div className="home1b">
                    <div className="home1c">
                        <img className="home1cIcon" src="search.png" /> <br />
                        <span className="home1cTitle">Search For Topic Of Interest</span>
                        <p className="home1cText">Go ahead and explore the library and choose a topic of interest. Once you feel ready, go ahead and take the assessment.</p>
                    </div>
                    <div className="home1c">
                        <img className="home1cIcon" src="wallet.png" /> <br />
                        <span className="home1cTitle">Connect Your Wallet</span>
                        <p className="home1cText">First things first, connect your wallet in the top right corner. Don’t have a wallet just yet? Follow the steps here to get you started.</p>
                    </div>
                    <div className="home1c">
                        <img className="home1cIcon" src="assessment.png" /> <br />
                        <span className="home1cTitle">Take Assessment</span>
                        <p className="home1cText">The time has come: time to prove your knowledge. Go through the assessment and test yourself on the topic you chose.</p>
                    </div>
                    <div className="home1c">
                        <img className="home1cIcon" src="checkmark.png" /> <br />
                        <span className="home1cTitle">Verify Your Knowledge</span>
                        <p className="home1cText">Pass the assessment? Congrats! you have now learned ad truly verified your knowledge. Share your NTT with the world!</p>
                    </div>
                </div>
                <div className="home2a">Ready To Learn and Earn?</div>
                <div className="home2b">
                    <div className="home2bText">View our most<br />popular assessments.</div>
                    <Link href="/explore">
                        <div className="home2bButton">Search For Topics</div>
                    </Link>
                </div>
                <div className="home3a">Have Knowledge To Share?</div>
                <div className="home3b">
                    <Link href="/educators">
                        <div className="home3bButton">Become An Educator</div>
                    </Link>
                    <div className="home3bText">Teach the world<br />what you know.</div>
                </div>
                <div className="homeMission">
                    <div className="homeMissionText"></div>
                    <div className="homeMissionVideo">
                        <video src=""></video>
                    </div>
                </div>
            </div> : null}
        </div>

    );
}

export default Ripple;






