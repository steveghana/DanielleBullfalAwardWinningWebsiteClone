export const scroll = (gsap, LocomotiveScroll, ScrollTrigger) => {
  const sections = document.querySelectorAll(".scroll_wrapper");
  const locomotive = new LocomotiveScroll({
    el: document.querySelector(".scroll"),
    smooth: true,
    scrollFromAnywhere: true,
  });
  const container = document.querySelectorAll(".scroll_wrapper");

  const content = document.querySelector(".content");

  //
  let clickToWidScreen = () => {
    [...document.querySelectorAll(".img")].forEach((el) => {
      el.addEventListener("click", (e) => {
        [...document.querySelectorAll(".img")]
          .filter((item) => e.target !== item)
          .forEach((el) => {
            const node = el.parentNode.parentNode.parentNode;
            node.classList.toggle("none");
          });
        e.target.parentNode.parentNode.classList.toggle("scale");
        gsap
          .to(
            [".scroll_wrapper_text", ".scroll_wrapper_img_cover_text_wrapper"],
            {
              opacity: 0,
            }
          )
          .then(() => {
            setTimeout(() => {
              gsap.to(
                [
                  ".scroll_wrapper_text",
                  ".scroll_wrapper_img_cover_text_wrapper",
                ],
                {
                  opacity: 1,
                }
              );
              e.target.parentNode.parentNode.firstChild.classList.toggle(
                "move"
              );
              e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
                "moveOverlay"
              );

              content.classList.toggle("showcontent");
            }, 1000);
          });
      });
    });
  };
  clickToWidScreen();

  //
  let index = container.length - 1;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry);
          gsap
            .to(".scroll", {
              opacity: 0,
              duration: 2,
              ease: "power2",
              pointerEvents: "none",
            })
            .then(() => {
              gsap.to(".about__container", { opacity: 1, duration: 1 });
              gsap.to(".intro", { opacity: 1, duration: 1 }).to(".scroll", {
                onStart: () => scrollContainer.classList.add("none"),
              });

              return;
            });
          setTimeout(() => {
            locomotive.scrollTo(1, { duration: 0 });
          }, 2000);
          observer.unobserve(container[index]);
        }
      });
    },
    { threshold: 0.75 }
  );

  observer.observe(container[index]);

  //
  let scrollContainer = document.querySelector(".scroll");
  locomotive.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locomotive.scrollTo(value, 0, 0)
        : locomotive.scroll.instance.scroll.y;
    },
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
    let overlay = item.querySelectorAll(".overlay");
    let back = item.querySelectorAll(".scroll_wrapper_text_content");
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
      { y: window.innerHeight, stagger: 0.6, opacity: 1 }
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
      // const container = document.querySelectorAll(".scroll_wrapper");
      // let index = container.length - 1;
      const scrollInit = () => {
        console.log("hi");

        const scrolltimeline = gsap.timeline();
        scrolltimeline
          .to(".intro", { opacity: 0, duration: 1 })
          .to(".scroll", {
            onStart: () => {
              scrollContainer.classList.remove("none");
            },
          })
          .then(() => {
            gsap.to(".scroll_container", {
              onComplete: () => {
                scrollContainer.classList.remove("none");
              },

              opacity: 1,
              duration: 1,
            });
          });
      };
      window.addEventListener("wheel", scrollInit);
    });
  return;
}
