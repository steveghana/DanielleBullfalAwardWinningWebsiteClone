import React, { useState } from "react";
import { scroll } from "../Scrollimages/scrollUtility";
import gsap from "gsap";
import { timeLine } from "../Scrollimages/scrollUtility";
import LocomotiveScroll from "locomotive-scroll";
import ScrollTrigger from "gsap/ScrollTrigger";
function Intro({ setshowcontent, scrollInstance }) {
  console.clear();
  gsap.registerPlugin(ScrollTrigger);
  let numcount = React.useRef(100);
  const [count] = useState(100);
  React.useEffect(() => {
    scroll(gsap, LocomotiveScroll, ScrollTrigger);
    gsap.to([".intro_name, .about_btn"], { opacity: 0, duration: 0, y: -29 });
    const init = () => {
      const counter = (num) => {
        if (num <= 0) {
          return timeLine(gsap, setshowcontent, scrollInstance);
        }
        numcount.current.innerText = num;
        setTimeout(() => {
          counter(num - 1);
        }, 20);
      };
      counter(count);
    };
    init();
  }, [setshowcontent]);
  return (
    <div className="intro">
      <div ref={numcount} className="intro_num">
        {" "}
      </div>
      <div className="intro_page-description">
        <div className="page_description descr1">
          <span className="chars">V</span> isual
        </div>
        <div className="page_description descr2">
          Art Di<span className="chars">r</span>ection
        </div>
        <div className="page_description descr3">
          In <span className="chars">t</span> eraction
        </div>
      </div>
      <div className="intro_name_who">
        <div className="intro_name-container">
          <div className="intro_name name1">
            daneille <br /> buffal
          </div>
          <div className="intro_name name2">
            daneille <br /> buffal
          </div>
        </div>
        <div className="about_btn">who?</div>
      </div>
    </div>
  );
}

export default Intro;
