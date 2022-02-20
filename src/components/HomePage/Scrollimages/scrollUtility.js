export const scroll = (gsap, LocomotiveScroll, ScrollTrigger) => {
  const sections = document.querySelectorAll(".scroll_wrapper");
  const locomotive = new LocomotiveScroll({
    el: document.querySelector(".scroll"),
    smooth: true,
  });
  const container = document.querySelectorAll(".scroll_wrapper");
  let index = container.length - 1;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            locomotive.scrollTo(1);
          }, 2000);
          // observer.unobserve(container[index]);
        }
      });
    },
    { threshold: 0.75 }
  );
  observer.observe(container[index]);
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
