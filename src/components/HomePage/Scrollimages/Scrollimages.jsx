import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import a1 from "../../../img/averie-woodard-4nulm-JUYFo-unsplash 1.png";
import a2 from "../../../img/Group.png";
import a3 from "../../../img/impressive_elegance_card (3).png";
import a4 from "../../../img/phhyy.png";
import { scroll } from "./scrollUtility";
function Scrollimages() {
  const clicking = (e) => {
    console.log(e.target);
  };
  console.clear();
  const obj = ["a", "b", "c", "d"];
  const imgArray = [a1, a2, a3, a4];
  return (
    <div data-scroll-section="" className="scroll none">
      <div className="scroll_container">
        {imgArray.map((img, i) => (
          <div id={i} key={i} className="scroll_wrapper">
            <div className="scroll_wrapper_text">
              <div
                data-scroll-speed="0"
                className="scroll_wrapper_text_content"
              >
                the yes
              </div>
            </div>
            <div className="scroll_wrapper_img_cover">
              <div className="scroll_wrapper_img_cover_text_wrapper">
                <div data-scroll-speed="0" className="overlay">
                  the yes
                </div>
              </div>
              <a href={`#${i}`}>
                <img className="img" src={img} alt="" />
              </a>
            </div>
          </div>
        ))}
        <div className="content">
          {obj.map((item) => (
            <div className="content_item">item</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scrollimages;
