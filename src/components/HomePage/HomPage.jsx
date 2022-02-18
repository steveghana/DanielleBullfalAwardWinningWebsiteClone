import React, { useEffect, useState } from "react";
import { data } from "../../shop_data/data";
import Scrollimages from "./Scrollimages/Scrollimages";
import { Navigation, Intro } from "./exports";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import About from "./About/About";
const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // gsap.defaults({ ease: "none", duration: 1 });
    // const timeline = gsap.timeline();
    // ScrollTrigger.create({
    //   animation: timeline,
    //   trigger: ".home",
    //   start: "top top",
    //   end: "+=4000",
    //   scrub: true,
    //   pin: true,
    //   anticipatePin: 1,
    // });
  }, []);
  const [scrollInstance, setscrollInstance] = useState("");
  const [showcontent, setshowcontent] = useState(false);
  const switchOpacity = showcontent ? "1" : "0";
  return (
    <div className="home">
      <Navigation showcontent={showcontent} />
      <Intro setshowcontent={setshowcontent} scrollInstance={scrollInstance} />
      <Scrollimages setscrollInstance={setscrollInstance} />
      <About />
      <div style={{ opacity: switchOpacity }} className="home__sidenav">
        <div className="home__sidenav_side_text">section 1</div>
        <div className="home__sidenav__scroll-to-bottom_indicator">
          <div></div>
          <div></div>
        </div>
      </div>

      <div style={{ opacity: switchOpacity }} className="home__footer">
        <div className="home__footer_dark-light-mode">Switch to light</div>
        <div className="home__footer_job-description">
          principal designer <span>@metalab</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
