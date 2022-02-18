import React, { useState } from "react";
import gsap from "gsap";
function Intro({ setshowcontent }) {
  let numcount = React.useRef(100);
  const [count, setcount] = useState(100);
  React.useEffect(() => {
    let scrollContainer = document.querySelector(".scroll");
    gsap.to([".intro_name, .about_btn"], { opacity: 0, duration: 0, y: -29 });
    let tl = gsap.timeline({ defaults: { duration: 1 } });

    const counter = (num) => {
      if (num <= 0) {
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
            setshowcontent(true);
          })
          .then(() => {
            window.addEventListener("wheel", () => {
              const container = document.querySelectorAll(".scroll_wrapper");
              let index = container.length - 1;
              const scrolltimeline = gsap.timeline();
              scrolltimeline
                .to(".intro", { opacity: 0, duration: 1 })
                .to(".scroll", {
                  onStart: () => scrollContainer.classList.remove("none"),
                })
                .to(".scroll_container", {
                  onComplete: () => {
                    const observer = new IntersectionObserver(
                      (entries) => {
                        entries.forEach((entry) => {
                          if (entry.isIntersecting) {
                            window.removeEventListener("wheel", true);
                            gsap.to(".scroll_container", {
                              opacity: 0,
                              duration: 2,
                              ease: "power2",
                            });
                          }
                        });
                      },
                      { threshold: 0.4 }
                    );
                    observer.observe(container[index]);
                  },
                  opacity: 1,
                  duration: 1,
                });
            });
          });
        return;
      }
      numcount.current.innerText = num;
      setTimeout(() => {
        counter(num - 1);
      }, 20);
    };
    counter(count);
  }, []);
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
