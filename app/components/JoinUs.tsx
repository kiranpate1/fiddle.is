"use client";
import { useRef, useEffect } from "react";
import Connector from "./Connector";

export default function JoinUs() {
  const bgSquaresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgSquares = bgSquaresRef.current;
    if (!bgSquares) return;

    const bgSquaresChildren = Array.from(
      bgSquares.children,
    ) as HTMLDivElement[];
    let activeSquare: HTMLDivElement | null = null;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const containerRect = bgSquares.getBoundingClientRect();
      const insideContainer =
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;

      if (!insideContainer) {
        if (activeSquare) {
          activeSquare.style.backgroundColor = "";
          activeSquare = null;
        }
        return;
      }

      let nextActive: HTMLDivElement | null = null;
      for (const square of bgSquaresChildren) {
        const rect = square.getBoundingClientRect();
        const isInsideSquare =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInsideSquare) {
          nextActive = square;
          break;
        }
      }

      if (activeSquare === nextActive) {
        return;
      }

      if (activeSquare) {
        activeSquare.style.backgroundColor = "";
      }

      if (nextActive) {
        nextActive.style.backgroundColor =
          "color-mix(in oklab, var(--stroke) 2.5%, transparent)";
      }

      activeSquare = nextActive;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      if (activeSquare) {
        activeSquare.style.backgroundColor = "";
      }
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  return (
    <section className="relative border-t border-b border-(--stroke)/10 overflow-hidden">
      <div
        className="absolute inset-[-1px_-1px_auto_-1px] h-full grid grid-cols-16 gap-0"
        ref={bgSquaresRef}
      >
        {[...Array(16 * 6)].map((_, i) => (
          <div
            key={i}
            className="w-full aspect-square border-[0.5px] border-(--stroke)/10 duration-200"
          ></div>
        ))}
      </div>
      <div className="relative flex flex-col items-center justify-start py-20 gap-10">
        <h2 className="">Join us if you:</h2>
        <div className="w-full max-w-[500px] flex flex-col items-stretch">
          <div
            className="relative grid grid-cols-1 grid-rows-[auto_auto_0fr] hover:grid-rows-[auto_auto_1fr] py-2 duration-200"
            data-connection="blue"
          >
            <Connector type="dot" />
            <p className="caption">
              1 - didn’t like school but still did phenomenally well at your
              jobs
            </p>
            <div className="overflow-hidden">
              <div className="pt-2">
                <p className="text-(--text)/50!">
                  This is a test of body content and what it might look like
                  when a bullet point is expanded out.
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative grid grid-cols-1 grid-rows-[auto_auto_0fr] hover:grid-rows-[auto_auto_1fr] py-2 duration-200"
            data-connection="blue"
          >
            <Connector type="dot" />
            <p className="caption">2 - are uncomfortable with “good enough”</p>
            <div className="overflow-hidden">
              <div className="pt-2">
                <p className="text-(--text)/50!">
                  This is a test of body content and what it might look like
                  when a bullet point is expanded out.
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative grid grid-cols-1 grid-rows-[auto_auto_0fr] hover:grid-rows-[auto_auto_1fr] py-2 duration-200"
            data-connection="blue"
          >
            <Connector type="dot" />
            <p className="caption">
              3 - have strong opinions but have changed your mind in the last
              quarter
            </p>
            <div className="overflow-hidden">
              <div className="pt-2">
                <p className="text-(--text)/50!">
                  This is a test of body content and what it might look like
                  when a bullet point is expanded out.
                </p>
              </div>
            </div>
          </div>
          <div
            className="relative grid grid-cols-1 grid-rows-[auto_auto_0fr] hover:grid-rows-[auto_auto_1fr] py-2 duration-200"
            data-connection="blue"
          >
            <Connector type="dot" />
            <p className="caption">4 - are a high functioning workaholic</p>
            <div className="overflow-hidden">
              <div className="pt-2">
                <p className="text-(--text)/50!">
                  This is a test of body content and what it might look like
                  when a bullet point is expanded out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
