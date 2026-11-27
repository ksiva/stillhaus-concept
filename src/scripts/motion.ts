import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

// Split a heading into lines by its <br>-free text, using rendered line breaks.
function lines(el: HTMLElement) {
  el.setAttribute("aria-label", (el.textContent ?? "").trim().replace(/\s+/g, " "));
  // Tokens: each word of a text node, or a whole child element (e.g. an <em>) kept as one piece.
  const tokens: HTMLElement[] = [];
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      (n as Text).data.split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.append(" "); return; }
        const s = document.createElement("span"); s.textContent = p; s.style.display = "inline-block"; tokens.push(s); frag.append(s);
      });
      n.replaceWith(frag);
    } else if (n instanceof HTMLElement) {
      n.style.display = "inline-block"; tokens.push(n);
    }
  }
  const groups: HTMLElement[][] = [];
  let top = -99999;
  for (const t of tokens) {
    const y = Math.round(t.getBoundingClientRect().top);
    if (Math.abs(y - top) > 6) { groups.push([]); top = y; }
    groups[groups.length - 1].push(t);
  }
  el.textContent = "";
  return groups.map((g) => {
    const ln = document.createElement("span"); ln.className = "ln"; ln.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    g.forEach((t, i) => { inner.append(t); if (i < g.length - 1) inner.append(" "); });
    ln.append(inner); el.append(ln);
    return inner;
  });
}

if (!reduce) {
  document.documentElement.classList.add("js-motion");
  document.fonts.ready.then(() => {
    document.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) => {
      const ls = lines(el);
      el.classList.add("is-split");
      const now = el.hasAttribute("data-now");
      gsap.fromTo(ls, { yPercent: 105 }, { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.09, delay: now ? 0.2 : 0,
        ...(now ? {} : { scrollTrigger: { trigger: el, start: "top 88%" } }) });
    });
    ScrollTrigger.refresh();
  });

  gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
    const now = el.hasAttribute("data-now");
    gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: now ? 0.6 : 0, ...(now ? {} : { scrollTrigger: { trigger: el, start: "top 90%" } }) });
  });

  gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 82%" } });
    tl.to(el, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.inOut" });
    if (img) tl.from(img, { scale: 1.3, xPercent: -6, duration: 1.8, ease: "power3.out" }, 0);
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const amt = Number(el.dataset.parallax || 14);
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // Hero: a small window opens to the whole view as you scroll
  const win = document.querySelector<HTMLElement>("[data-window]");
  if (win) {
    const pane = win.querySelector<HTMLElement>(".pane")!;
    const word = win.querySelector<HTMLElement>(".bigword");
    const tl = gsap.timeline({ scrollTrigger: { trigger: win, start: "top top", end: "+=110%", scrub: 0.6, pin: true } });
    tl.fromTo(pane, { clipPath: "inset(26% 34% 22% 34%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
    tl.fromTo(pane.querySelector("img"), { scale: 1.35 }, { scale: 1, ease: "none" }, 0);
    if (word) tl.fromTo(word, { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0, ease: "none", immediateRender: false }, 0);
    tl.fromTo(win.querySelector(".after"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.55);
  }

  // Horizontal strip of houses, pinned on desktop
  const strip = document.querySelector<HTMLElement>("[data-hscroll]");
  if (strip) {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const track = strip.querySelector<HTMLElement>(".track")!;
      const dist = () => track.scrollWidth - window.innerWidth + 80;
      const tw = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: strip, start: "top top", end: () => "+=" + dist(), scrub: 0.8, pin: true, invalidateOnRefresh: true } });
      track.querySelectorAll<HTMLElement>(".h-card img").forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tw, start: "left right", end: "right left", scrub: true } });
      });
      const bar = strip.querySelector<HTMLElement>(".progress i");
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: strip, start: "top top", end: () => "+=" + dist(), scrub: true } });
    });
  }
}

// Header: hide on scroll down, show on scroll up
const header = document.querySelector<HTMLElement>(".site-header");
if (header) {
  let last = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    header.classList.toggle("is-solid", y > 30);
    header.classList.toggle("is-hidden", y > 300 && y > last && !document.body.classList.contains("menu-open"));
    last = y;
  }, { passive: true });
}
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
toggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Buttons: fill grows from the pointer position
document.querySelectorAll<HTMLElement>(".btn").forEach((b) => {
  b.addEventListener("pointerenter", (e) => { const r = b.getBoundingClientRect(); b.style.setProperty("--mx", `${e.clientX - r.left}px`); b.style.setProperty("--my", `${e.clientY - r.top}px`); });
});

if (fine && !reduce) {
  const ring = document.createElement("div"); ring.className = "ring";
  const label = document.createElement("div"); label.className = "ring-label";
  document.body.append(ring, label);
  const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
  const lx = gsap.quickTo(label, "x", { duration: 0.45, ease: "power3" }), ly = gsap.quickTo(label, "y", { duration: 0.45, ease: "power3" });
  addEventListener("pointermove", (e) => { ring.style.opacity = "1"; rx(e.clientX); ry(e.clientY); lx(e.clientX); ly(e.clientY); });
  document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => { ring.classList.add("is-big"); label.textContent = el.dataset.cursor!; label.classList.add("on"); });
    el.addEventListener("pointerleave", () => { ring.classList.remove("is-big"); label.classList.remove("on"); });
  });

  // List rows: a preview image follows the pointer
  document.querySelectorAll<HTMLElement>("[data-preview-list]").forEach((list) => {
    const pv = list.querySelector<HTMLElement>(".preview")!;
    const px = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3" }), py = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3" });
    list.addEventListener("pointermove", (e) => { const r = list.getBoundingClientRect(); px(e.clientX - r.left); py(e.clientY - r.top); });
    list.querySelectorAll<HTMLElement>("[data-pv]").forEach((row) => {
      row.addEventListener("pointerenter", () => { pv.querySelectorAll("img").forEach((im, i) => im.classList.toggle("on", String(i) === row.dataset.pv)); pv.classList.add("show"); });
      row.addEventListener("pointerleave", () => pv.classList.remove("show"));
    });
  });

  // Cards: second photo crossfades in on hover is pure CSS; here a gentle tilt
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((c) => {
    const rX = gsap.quickTo(c, "rotationX", { duration: 0.6, ease: "power3" }), rY = gsap.quickTo(c, "rotationY", { duration: 0.6, ease: "power3" });
    gsap.set(c, { transformPerspective: 900 });
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); rY(((e.clientX - r.left) / r.width - 0.5) * 6); rX(((e.clientY - r.top) / r.height - 0.5) * -6); });
    c.addEventListener("pointerleave", () => { rX(0); rY(0); });
  });
}

// Ritual filter on the houses page
const list = document.querySelector<HTMLElement>("[data-filter-list]");
if (list) {
  const chips = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
  const count = document.querySelector("[data-count]");
  chips.forEach((chip) => chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    const f = chip.dataset.filter!; let n = 0;
    list.querySelectorAll<HTMLElement>("[data-tags]").forEach((r) => { const show = f === "all" || r.dataset.tags!.split("|").includes(f); r.hidden = !show; if (show) n++; });
    if (count) count.textContent = String(n).padStart(2, "0");
    ScrollTrigger.refresh();
  }));
}
