"use client";

import { useState, useEffect, useRef } from "react";
import ascii from "./ascii";
import Connector from "./Connector";
import Highlight from "./Highlight";

export default function Footer() {
  const applyNowRef = useRef<HTMLDivElement>(null);
  const moonAsciiRef = useRef<HTMLPreElement>(null);
  const fiddleAsciiRef = useRef<HTMLPreElement>(null);
  const sfAsciiRef = useRef<HTMLPreElement>(null);
  const moonAscii = ascii.moonAscii;
  const fiddleAscii = ascii.fiddleAscii;
  const sfAscii = ascii.sfAscii;
  const salesforceAscii = ascii.salesforceAscii;
  const transamericaAscii = ascii.transamericaAscii;
  const goldengateAscii = ascii.goldengateAscii;

  useEffect(() => {
    const triggerEl = applyNowRef.current;
    const fiddleEl = fiddleAsciiRef.current;
    const sfEl = sfAsciiRef.current;

    if (!triggerEl || !fiddleEl || !sfEl) {
      return;
    }

    const createAsciiAnimator = (
      el: HTMLPreElement,
      targetText: string,
      initialText?: string,
    ) => {
      let intervalId: number | null = null;
      let mode: "idle" | "dissolve" | "restore" = "idle";
      const rows = targetText.split("\n");
      const height = rows.length;
      const width = rows.reduce((max, row) => Math.max(max, row.length), 0);

      type Particle = {
        char: string;
        homeX: number;
        homeY: number;
        x: number;
        y: number;
        visible: boolean;
      };

      const particles: Particle[] = [];

      for (let y = 0; y < height; y += 1) {
        const row = rows[y] ?? "";
        for (let x = 0; x < row.length; x += 1) {
          const char = row[x];
          if (char !== " " && char !== "\t" && char !== "\r") {
            particles.push({
              char,
              homeX: x,
              homeY: y,
              x,
              y,
              visible: true,
            });
          }
        }
      }

      if (initialText !== undefined) {
        el.textContent = initialText;
        for (const particle of particles) {
          particle.visible = false;
          particle.x = particle.homeX;
          particle.y = particle.homeY;
        }
      }

      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const render = () => {
        const grid = Array.from({ length: height }, () =>
          Array(width).fill(" "),
        );

        for (const particle of particles) {
          if (!particle.visible) {
            continue;
          }

          const x = Math.round(particle.x);
          const y = Math.round(particle.y);
          if (x < 0 || x >= width || y < 0 || y >= height) {
            continue;
          }

          grid[y][x] = particle.char;
        }

        el.textContent = grid.map((row) => row.join("")).join("\n");
      };

      const seedDispersedPosition = (particle: Particle) => {
        particle.x = clamp(
          particle.homeX + Math.floor((Math.random() - 0.5) * 16),
          0,
          Math.max(width - 1, 0),
        );
        particle.y = clamp(
          particle.homeY + Math.floor(Math.random() * 8) - 2,
          0,
          Math.max(height - 1, 0),
        );
      };

      const stop = () => {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
        mode = "idle";
      };

      const step = () => {
        if (mode === "dissolve") {
          let visibleCount = 0;

          for (const particle of particles) {
            if (!particle.visible) {
              continue;
            }

            visibleCount += 1;

            if (Math.random() < 0.12) {
              particle.visible = false;
              continue;
            }

            particle.x = clamp(
              particle.x + Math.floor((Math.random() - 0.5) * 3),
              0,
              Math.max(width - 1, 0),
            );
            particle.y = clamp(
              particle.y +
                (Math.random() < 0.8 ? 1 : 0) +
                (Math.random() < 0.2 ? -1 : 0),
              0,
              Math.max(height - 1, 0),
            );
          }

          render();

          if (visibleCount === 0) {
            stop();
          }
          return;
        }

        let settledCount = 0;

        for (const particle of particles) {
          if (!particle.visible) {
            if (Math.random() < 0.22) {
              particle.visible = true;
              seedDispersedPosition(particle);
            } else {
              continue;
            }
          }

          const dx = particle.homeX - particle.x;
          const dy = particle.homeY - particle.y;

          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            particle.x = particle.homeX;
            particle.y = particle.homeY;
            settledCount += 1;
            continue;
          }

          particle.x += dx * 0.35;
          particle.y += dy * 0.35;
        }

        render();

        if (settledCount === particles.length) {
          render();
          stop();
        }
      };

      const start = (nextMode: "dissolve" | "restore") => {
        mode = nextMode;

        if (nextMode === "restore") {
          for (const particle of particles) {
            if (!particle.visible) {
              seedDispersedPosition(particle);
            }
          }
        }

        if (intervalId === null) {
          intervalId = window.setInterval(step, 15);
        }
      };

      render();

      return { start, stop };
    };

    const createTranslateAnimator = (el: HTMLPreElement) => {
      let intervalId: number | null = null;
      let direction: "idle" | "down" | "up" = "idle";
      let currentStep = 0;
      const stepPercent = 9.2;
      const maxSteps = Math.ceil(40 / stepPercent);

      el.style.willChange = "transform";

      const applyTransform = () => {
        el.style.transform = `translateY(${currentStep * stepPercent}%)`;
      };

      const stop = () => {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
        direction = "idle";
      };

      const step = () => {
        if (direction === "down") {
          currentStep = Math.min(currentStep + 1, maxSteps);
        } else if (direction === "up") {
          currentStep = Math.max(currentStep - 1, 0);
        }

        applyTransform();

        if (
          (direction === "down" && currentStep === maxSteps) ||
          (direction === "up" && currentStep === 0)
        ) {
          stop();
        }
      };

      const start = (nextDirection: "down" | "up") => {
        direction = nextDirection;
        if (intervalId === null) {
          intervalId = window.setInterval(step, 50);
        }
      };

      applyTransform();

      return { start, stop };
    };

    const fiddleAnimator = createAsciiAnimator(fiddleEl, fiddleAscii);
    const fiddleTranslateAnimator = createTranslateAnimator(fiddleEl);
    const sfAnimator = createAsciiAnimator(
      sfEl,
      sfAscii,
      sfAscii.replace(/[^\n\r]/g, " "),
    );

    let isStickyHoverActive = false;

    const highlightEls = Array.from(
      document.querySelectorAll(".ascii.highlight"),
    ) as HTMLPreElement[];

    const runEnterEffects = () => {
      fiddleAnimator.start("dissolve");
      fiddleTranslateAnimator.start("down");
      sfAnimator.start("restore");
      highlightEls.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
    };

    const runLeaveEffects = () => {
      fiddleAnimator.start("restore");
      fiddleTranslateAnimator.start("up");
      sfAnimator.start("dissolve");
      highlightEls.forEach((el) => {
        el.style.pointerEvents = "none";
      });
    };

    const isPointerInsideTrigger = (target: EventTarget | null) =>
      target instanceof Node && triggerEl.contains(target);

    const isPointerBelowTrigger = (clientY: number) =>
      clientY >= triggerEl.getBoundingClientRect().bottom;

    const clearStickyHover = () => {
      if (!isStickyHoverActive) return;
      isStickyHoverActive = false;
      runLeaveEffects();
    };

    const onEnter = () => {
      isStickyHoverActive = true;
      runEnterEffects();
    };

    const onTriggerLeave = (event: MouseEvent) => {
      if (!isStickyHoverActive) return;

      // Keep hover effects active when pointer leaves trigger downward.
      if (
        isPointerInsideTrigger(event.relatedTarget) ||
        isPointerBelowTrigger(event.clientY)
      ) {
        return;
      }

      clearStickyHover();
    };

    const onWindowMouseMove = (event: MouseEvent) => {
      if (!isStickyHoverActive) return;

      // Outside trigger and above trigger bottom should always end hover effects.
      if (
        !isPointerInsideTrigger(event.target) &&
        !isPointerBelowTrigger(event.clientY)
      ) {
        clearStickyHover();
      }
    };

    // highlight hovers

    const buildingHighlight = (
      element: HTMLElement | null,
      variable?: string,
    ) => {
      element ? (element.style.opacity = variable ? "1" : "0") : null;
      const root = document.documentElement;
      const newColor = `color-mix(in oklab, var(--${variable}) 70%, var(--background))`;
      root.style.setProperty("--text", variable ? newColor : "#d5edff");
      root.style.setProperty("--stroke", variable ? newColor : "#78bcff");
      root.style.setProperty("--orange", variable ? newColor : "#ff9900");
    };

    highlightEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        buildingHighlight(el, el.dataset.highlight);
      });
      el.addEventListener("mouseleave", () => {
        buildingHighlight(el);
      });
    });

    triggerEl.addEventListener("mouseenter", onEnter);
    triggerEl.addEventListener("mouseleave", onTriggerLeave);
    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });

    return () => {
      highlightEls.forEach((el) => {
        el.removeEventListener("mouseenter", () => {
          buildingHighlight(el, el.dataset.highlight);
        });
        el.removeEventListener("mouseleave", () => {
          buildingHighlight(el);
        });
      });
      triggerEl.removeEventListener("mouseenter", onEnter);
      triggerEl.removeEventListener("mouseleave", onTriggerLeave);
      window.removeEventListener("mousemove", onWindowMouseMove);
      fiddleAnimator.stop();
      fiddleTranslateAnimator.stop();
      sfAnimator.stop();
    };
  }, [fiddleAscii, sfAscii]);

  // Populate timestamp after mount to avoid SSR/client hydration mismatch.
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatNow = () =>
      `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;

    setCurrentDate(formatNow());
    const intervalId = window.setInterval(() => {
      setCurrentDate(formatNow());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // set additional terminal text
  const [commandText, setCommandText] = useState("");
  const [outputText, setOutputText] = useState("");

  return (
    <section className="">
      <div className="relative h-[450px] md:h-[calc(100dvh-64px)] flex flex-col items-center justify-between pt-16">
        <div className="absolute top-4 left-4">
          <pre className="ascii text-(--stroke)/80!">
            {currentDate || "Logging in..."} <br />
            user@Fiddle.is ~ % {commandText} <br />
            {outputText}
          </pre>
        </div>
        <div className="flex flex-col items-center gap-8">
          <h3 className="w-full max-w-[450px] px-4! text-center">
            We are hiring{" "}
            <a
              className="underline decoration-[0.5px] underline-offset-4 hover:decoration-(--stroke) hover:text-(--stroke) duration-200"
              href="https://thezbook.com/code-first-vs-product-first"
              target="_blank"
              rel="noopener noreferrer"
            >
              product first
            </a>{" "}
            engineers in SF
          </h3>
          <div
            className="group relative"
            data-connection="orange"
            ref={applyNowRef}
            onMouseEnter={() => setCommandText(`npm apply Fiddle`)}
            onMouseLeave={() => setCommandText("")}
          >
            <Connector type="line" />
            <div className="grid grid-cols-[0fr_auto_0fr] group-hover:grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-4 duration-200">
              <a
                className="w-full flex items-center gap-2 overflow-hidden justify-end brightness-100 hover:brightness-200 duration-200"
                href="https://fiddle.is/careers"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCommandText("npm apply Fiddle --email");
                  setOutputText("viba@fiddle.is");
                }}
                onMouseLeave={() => {
                  setOutputText("");
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM19 6L12.5 10.47C12.348 10.5578 12.1755 10.604 12 10.604C11.8245 10.604 11.652 10.5578 11.5 10.47L5 6H19Z"
                    fill="color-mix(in oklab, var(--text) 70%, var(--background))"
                  />
                </svg>
                <p className="caption">email</p>
              </a>
              <div
                className="relative flex items-center justify-center px-4 py-3.5 bg-(--orange)/15 group-hover:bg-transparent rounded-lg cursor-pointer duration-200"
                onMouseEnter={() => setCommandText(`npm apply Fiddle`)}
              >
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="100%"
                  viewBox="0 0 119 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="[stroke-dasharray:44_88] [stroke-dashoffset:176] group-hover:[stroke-dashoffset:88] duration-200"
                    d="M59.5 0.5H8.5C4.08172 0.5 0.5 4.08172 0.5 8.5V26.5"
                    stroke="var(--orange)"
                  />
                  <path
                    className="[stroke-dasharray:44_88] [stroke-dashoffset:176] group-hover:[stroke-dashoffset:88] duration-200"
                    d="M59.5 52.5H8.5C4.08172 52.5 0.5 48.9183 0.5 44.5V26.5"
                    stroke="var(--orange)"
                  />
                  <path
                    className="[stroke-dasharray:44_88] [stroke-dashoffset:176] group-hover:[stroke-dashoffset:88] duration-200"
                    d="M59.5 0.5H110.5C114.918 0.5 118.5 4.08172 118.5 8.5V26.5"
                    stroke="var(--orange)"
                  />
                  <path
                    className="[stroke-dasharray:44_88] [stroke-dashoffset:176] group-hover:[stroke-dashoffset:88] duration-200"
                    d="M59.5 52.5H110.5C114.918 52.5 118.5 48.9183 118.5 44.5V26.5"
                    stroke="var(--orange)"
                  />
                </svg>

                <p className="caption text-(--orange)!">Apply now</p>
              </div>
              <a
                className="w-full flex items-center gap-2 overflow-hidden justify-start brightness-100 hover:brightness-200 duration-200"
                href="https://fiddle.is/careers"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  setCommandText("npm apply Fiddle --twitter");
                  setOutputText("@vibamohan_");
                }}
                onMouseLeave={() => {
                  setOutputText("");
                }}
              >
                <p className="caption">twitter</p>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10V10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.19088 14.4129 4.53008 14.4369 3.89004 14.31C4.16165 15.1625 4.69358 15.9084 5.41106 16.4429C6.12854 16.9775 6.99549 17.2737 7.89004 17.29C6.37371 18.4905 4.49405 19.1394 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"
                    fill="color-mix(in oklab, var(--text) 70%, var(--background))"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="relative w-full origin-bottom scale-160 md:scale-100">
          <div className="absolute inset-[0_0_auto_0] overflow-hidden">
            <pre className="ascii absolute" ref={moonAsciiRef}>
              {moonAscii}
            </pre>
            <pre className="ascii relative" ref={fiddleAsciiRef}>
              {fiddleAscii}
            </pre>
          </div>
          <div className="relative">
            <pre className="ascii" ref={sfAsciiRef}>
              {sfAscii}
            </pre>
            <pre
              className="ascii highlight text-(--goldengate)!"
              data-highlight="goldengate"
              style={{
                top: "calc(var(--ascii-unit) * 14 * 1.25)",
                left: "calc(var(--ascii-unit) * 0 * 1.2473 * 5.66/11.77)",
              }}
            >
              <Highlight
                name="Golden Gate Bridge"
                coords="37.8199°, -122.4783°"
              />
              {goldengateAscii}
            </pre>
            <pre
              className="ascii highlight text-(--salesforce)!"
              data-highlight="salesforce"
              style={{
                top: "calc(var(--ascii-unit) * 6 * 1.25)",
                left: "calc(var(--ascii-unit) * 129 * 1.2473 * 5.66/11.77)",
              }}
            >
              <Highlight
                name="Salesforce Tower"
                coords="37.7897°, -122.3942°"
              />
              {salesforceAscii}
            </pre>
            <pre
              className="ascii highlight text-(--transamerica)!"
              data-highlight="transamerica"
              style={{
                top: "calc(var(--ascii-unit) * 0 * 1.25)",
                left: "calc(var(--ascii-unit) * 186 * 1.2473 * 5.66/11.77)",
              }}
            >
              <Highlight
                name="Transamerica Pyramid"
                coords="37.7952°, -122.4028°"
              />
              {transamericaAscii}
            </pre>
            {/* <div
              className="absolute top-0 left-0 bg-yellow-300"
              style={{
                top: "calc(var(--ascii-unit) * 18 * 1.248)",
                left: "calc(var(--ascii-unit) * 60 * 1.248 * 5.66/11.77)",
                width: "calc(var(--ascii-unit) * 1 * 1.25 * 5.66/11.77)",
                height: "calc(var(--ascii-unit) * 1 * 1.25)",
              }}
            ></div>
            <pre className="ascii absolute">a</pre> */}
          </div>
        </div>
      </div>
    </section>
  );
}
