import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import a1 from "../../../img/averie-woodard-4nulm-JUYFo-unsplash 1.png";
import a2 from "../../../img/Group.png";
import a3 from "../../../img/impressive_elegance_card (3).png";
import a4 from "../../../img/phhyy.png";
import { scroll } from "./scrollUtility";
function Scrollimages({}) {
  console.clear();
  gsap.registerPlugin(ScrollTrigger);
  React.useEffect(() => {
    scroll(gsap, LocomotiveScroll, ScrollTrigger);
  }, []);
  const open = (e) => {
    [...document.querySelectorAll(".scroll_wrapper_img_cover")]
      .filter((item) => e.target.parentNode !== item)
      .forEach((el) => {
        gsap
          .to(el.parentNode, {
            opacity: 0,
            duration: 1,
          })
          .then(() => {
            gsap.to(el.parentNode, { display: "none" });
          });
      });
    console.log(e.target.parentNode);
    gsap.to(e.target.parentNode, {
      width: "100%",
      duration: 1,
      ease: "power2.inOut",
    });
  };
  const imgArray = [a1, a2, a3, a4];
  return (
    <div data-scroll-section="" className="scroll none">
      <div className="scroll_container">
        {imgArray.map((img, i) => (
          <div key={i} className="scroll_wrapper">
            <div className="scroll_wrapper_text">
              <div
                data-scroll-speed="0"
                className="scroll_wrapper_text_content"
              >
                the yes
              </div>
            </div>
            <div onClick={open} className="scroll_wrapper_img_cover">
              <div className="scroll_wrapper_img_cover_text_wrapper">
                <div data-scroll-speed="0" className="overlay">
                  the yes
                </div>
              </div>
              <img src={img} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scrollimages;
