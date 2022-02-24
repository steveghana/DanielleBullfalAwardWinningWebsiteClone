export const scroll = (gsap, LocomotiveScroll, ScrollTrigger) => {
  const sections = document.querySelectorAll(".scroll_wrapper");
  // const locomotive = new LocomotiveScroll({
  //   el: document.querySelector(".scroll"),
  //   smooth: true,
  //   scrollFromAnywhere: true,
  // });
  let observe = true;
  const container = document.querySelectorAll(".scroll_wrapper");
  let clickToWidScreen = () => {
    [
      ...document.querySelectorAll(".scroll_wrapper_img_cover_text_wrapper"),
    ].forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log(observe);
        if (!observe) {
          gsap.to(".scroll_wrapper_img_cover_text_wrapper", {
            left: "-50%",
            ease: "none",
          });
          gsap.to(e.target.parentNode, {
            width: "50%",
            height: "500px",
            duration: 1,
            ease: "power2.inOut",
          });
          gsap.to(el, { display: "flex" });
          gsap.to(".content", {
            display: "none",
          });
          observe = true;
          return;
        }
        [...document.querySelectorAll(".scroll_wrapper")]
          .filter((item) => e.target.parentNode.parentNode !== item)
          .forEach((el) => {
            // gsap
            //   .to(el, {
            //     opacity: 0,
            //     duration: 1,
            //   })
            //   .then(() => {
            // locomotive.scrollTo(1);
            gsap.to(el, { display: "none" });
            // });
          });
        gsap.to(
          [".scroll_wrapper_text", ".scroll_wrapper_img_cover_text_wrapper"],
          {
            opacity: 0,
          }
        );
        gsap.to(".scroll_wrapper_img_cover_text_wrapper", {
          left: "-0%",
          ease: "none",
        });

        gsap
          .to(e.target.parentNode, {
            width: "100%",
            height: "50%",
            duration: 1,
            ease: "power2.inOut",
          })
          .then(() => {
            gsap.to(".content", {
              display: "block",
            });
            gsap.to(
              [
                ".scroll_wrapper_text",
                ".scroll_wrapper_img_cover_text_wrapper",
              ],
              {
                opacity: 1,
                duration: 1,
                stagger: 0.3,
              }
            );
          });
        observe = false;
      });
    });
  };
  clickToWidScreen();
  let index = container.length - 1;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
              gsap.to(".intro", { opacity: 1, duration: 1 }).to(".scroll", {
                onStart: () => scrollContainer.classList.add("none"),
              });
              // gsap.to(".about__container", { opacity: 1, duration: 1 });

              return;
            });
          setTimeout(() => {
            // locomotive.scrollTo(1, { duration: 0 });
          }, 2000);
          // observer.unobserve(container[index]);
        }
      });
    },
    { threshold: 0.75 }
  );
  // if (!observe) {
  //   observer.unobserve(container[index]);
  // } else {
  //   observer.observe(container[index]);
  // }
  let scrollContainer = document.querySelector(".scroll");
  // locomotive.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(scrollContainer, {
    // scrollTop(value) {
    //   return arguments.length
    //     ? locomotive.scrollTo(value, 0, 0)
    //     : locomotive.scroll.instance.scroll.y;
    // },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });
  sections.forEach((item) => {
    let cover = item.querySelector(".scroll_wrapper_img_cover");
    gsap.to(cover, {
      scrollTrigger: {
        scroller: ".scroll",
        start: "top 100%",
        end: "bottom 0%",
        trigger: cover,
        scrub: 2,
      },
      y: 20,
      duration: 2,
      ease: "power3.inOut",
    });
    let overlay = item.querySelector(".overlay");
    let back = item.querySelector(".scroll_wrapper_text_content");
    gsap.to(overlay, {
      scrollTrigger: {
        scroller: ".scroll",

        start: "top 100%",
        end: "top -100px",
        trigger: cover,
        scrub: 1.5,
      },
      y: -250,
      duration: 2,
      ease: "power3.inOut",
    });
    gsap.to(back, {
      scrollTrigger: {
        scroller: ".scroll",
        start: "top 100%",
        end: "top -100px",
        trigger: cover,
        scrub: 1,
      },
      y: -250,
      duration: 2,
      ease: "power3.inOut",
    });
  });
  ScrollTrigger.addEventListener("refresh");
};

export function timeLine(gsap) {
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
            }
          });
        },
        { threshold: 0.74 }
      );
      observer.observe(container[index]);
      const scrollInit = () => {
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
