import React, { useState } from "react";
import { scroll } from "../Scrollimages/scrollUtility";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import ScrollTrigger from "gsap/ScrollTrigger";
function Intro({ setshowcontent, scrollInstance }) {
  console.clear();
  gsap.registerPlugin(ScrollTrigger);
  let numcount = React.useRef(100);
  const [count, setcount] = useState(100);
  React.useEffect(() => {
    scroll(gsap, LocomotiveScroll, ScrollTrigger);
    gsap.to([".intro_name, .about_btn"], { opacity: 0, duration: 0, y: -29 });
    const init = () => {
      const counter = (num) => {
        if (num <= 0) {
          return timeLine(setshowcontent, scrollInstance);
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
function timeLine(setshowcontent, scrollInstance) {
  let scrollOff = false;
  let tl = gsap.timeline({ defaults: { duration: 1, yoyo: true } });
  let scrollContainer = document.querySelector(".scroll");

  tl.to(".intro_num", { y: 1000, ease: "power2.inOut" })
    .fromTo(
      ".page_description",
      { opacity: 0 },
      { y: 300 + window.innerHeight, stagger: 0.6, opacity: 1 }
    )
    .to(".chars", {
      ease: "elastic",
      scaleX: 2.3,
      fontWeight: 200,
      padding: "0 15px",
    })
    .to(".about_btn", { y: 10, opacity: 1 })
    .to([".name1, .name2"], { y: 10, opacity: 1, stagger: 0.35 })
    .then(() => {
      // setshowcontent(true);
    })
    .then(() => {
      const container = document.querySelectorAll(".scroll_wrapper");
      let index = container.length - 1;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scrollOff = true;
              gsap
                .to(".scroll_container", {
                  opacity: 0,
                  duration: 2,
                  onComplete: () => {},
                  ease: "power2",
                  pointerEvents: "none",
                })
                .then(() => {
                  timeLine();
                  gsap
                    .to(".intro", { opacity: 1, duration: 1 })
                    .then(".scroll", {
                      onStart: () => scrollContainer.classList.add("none"),
                    });
                  // gsap.to(".about__container", { opacity: 1, duration: 1 });

                  return;
                });
            }
          });
        },
        { threshold: 0.74 }
      );
      observer.observe(container[index]);
      const scrollInit = () => {
        console.log(scrollOff);
        const scrolltimeline = gsap.timeline();
        scrolltimeline
          .to(".intro", { opacity: 0, duration: 1 })
          .to(".scroll", {
            onStart: () => scrollContainer.classList.remove("none"),
          })
          .then(() => {
            if (scrollOff) return;
            gsap.to(".scroll_container", {
              onComplete: () => {},

              opacity: 1,
              duration: 1,
            });
          });
      };
      if (scrollOff) {
        window.removeEventListener("wheel", scrollInit, true);
      } else {
        window.addEventListener("wheel", scrollInit);
      }
    });
  return;
}
