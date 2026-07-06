"use client";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";

export default function Navigation() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const sideBarTransition = "200ms cubic-bezier(0.4, 0, 0.2, 1)";

  const handleSidebarEnter = () => setIsSidebarHovered(true);
  const handleSidebarLeave = () => setIsSidebarHovered(false);

  //wires logic
  const wireCanvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRafRef = useRef<number | null>(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const wireColorsRef = useRef({ blue: "white", orange: "white" });
  const connectionElementsRef = useRef<HTMLElement[]>([]);
  const hoveredConnectionRef = useRef<HTMLElement | null>(null);
  const hoverTargetRef = useRef(0);
  const hoverProgressRef = useRef(0);
  const mouseMoveTailUntilRef = useRef(0);
  const HOVER_LERP = 0.22;
  const MOUSE_MOVE_TAIL_MS = 200;

  const updateWireColors = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    wireColorsRef.current = {
      blue: rootStyles.getPropertyValue("--stroke").trim() || "white",
      orange: rootStyles.getPropertyValue("--orange").trim() || "white",
    };
  };

  const refreshConnectionElements = () => {
    connectionElementsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-connection]"),
    );

    if (
      hoveredConnectionRef.current &&
      !connectionElementsRef.current.includes(hoveredConnectionRef.current)
    ) {
      hoveredConnectionRef.current = null;
      hoverProgressRef.current = 0;
      hoverTargetRef.current = 0;
    }
  };

  const resolveWireColor = (connectionType: string | undefined) => {
    const { blue: strokeBlue, orange: strokeOrange } = wireColorsRef.current;

    if (connectionType === "blue") return strokeBlue;
    if (connectionType === "orange") return strokeOrange;
    return "white";
  };

  const drawWirePath = (
    ctx: CanvasRenderingContext2D,
    width: number,
    bottomCurveY: number,
    side: "left" | "right",
  ) => {
    const bottomHandleY = bottomCurveY - 7.163;
    const bottomEdgeY = bottomCurveY - 16;
    const isLeft = side === "left";
    const railX = isLeft ? 0.5 : width - 0.5;
    const innerX = isLeft ? 16.5 : width - 16.5;
    const capX = isLeft ? 16 : width - 16;
    const curveCtrlX = isLeft ? 7.66345 : width - 7.66345;
    const curveCtrlBottomX = isLeft ? 7.66344 : width - 7.66344;
    const midX = width / 2 - 0.5;

    ctx.beginPath();
    ctx.moveTo(midX, 0.5);
    ctx.lineTo(innerX, 0.5);
    ctx.bezierCurveTo(curveCtrlX, 0.5, railX, 7.66345, railX, 16.5);
    ctx.lineTo(railX, bottomEdgeY);
    ctx.bezierCurveTo(
      railX,
      bottomHandleY,
      curveCtrlBottomX,
      bottomCurveY,
      innerX,
      bottomCurveY,
    );
    ctx.lineTo(capX, bottomCurveY);
  };

  const estimateWireLength = (width: number, bottomCurveY: number) =>
    width / 2 + bottomCurveY + 56;

  const drawHoveredWireOverlay = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    const hoveredConnection = hoveredConnectionRef.current;
    const progress = hoverProgressRef.current;
    if (!hoveredConnection || progress <= 0.001) return;

    const connectionRect = hoveredConnection.getBoundingClientRect();
    const connectionMiddle =
      connectionRect.top - 16 + connectionRect.height / 2;
    const connectionNormalized = Math.min(
      Math.max(connectionMiddle, 0),
      height,
    );

    if (connectionNormalized < 32) return;

    const pathLength = estimateWireLength(width, connectionNormalized);
    const drawLength = pathLength * progress;

    ctx.save();
    ctx.strokeStyle = resolveWireColor(hoveredConnection.dataset.connection);
    ctx.lineWidth = 1;
    ctx.setLineDash([drawLength, pathLength]);
    drawWirePath(ctx, width, connectionNormalized, "left");
    ctx.stroke();
    drawWirePath(ctx, width, connectionNormalized, "right");
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  const resizeWireCanvas = () => {
    const canvas = wireCanvasRef.current;
    if (!canvas) return;

    const width = Math.max(window.innerWidth - 32, 1);
    const height = Math.max(window.innerHeight - 32, 1);
    const dpr = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 1;
    canvasSizeRef.current = { width, height };
  };

  const handleScroll = () => {
    const canvas = wireCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvasSizeRef.current;
    if (width <= 0 || height <= 0) return;

    ctx.clearRect(0, 0, width, height);

    const connectionElements = connectionElementsRef.current;
    const rootStyles = window.getComputedStyle(document.documentElement);
    const strokeColor = rootStyles.getPropertyValue("--stroke") || "white";
    const bgColor = rootStyles.getPropertyValue("--background") || "white";
    const baseWireColor = `color-mix(in oklab, ${strokeColor} 15%, ${bgColor})`;

    // Draw from end to start so earlier connections are painted on top.
    for (let index = connectionElements.length - 1; index >= 0; index -= 1) {
      const connection = connectionElements[index];

      const connectionRect = connection.getBoundingClientRect();
      const connectionMiddle =
        connectionRect.top - 16 + connectionRect.height / 2;
      const connectionNormalized = Math.min(
        Math.max(connectionMiddle, 0),
        height,
      );

      if (connectionNormalized < 32) continue;

      const bottomCurveY = connectionNormalized;

      // use --stroke css variable here in js
      ctx.strokeStyle = baseWireColor;

      drawWirePath(ctx, width, bottomCurveY, "left");
      ctx.stroke();
      drawWirePath(ctx, width, bottomCurveY, "right");
      ctx.stroke();
    }

    drawHoveredWireOverlay(ctx, width, height);
  };

  const scheduleWireUpdate = () => {
    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = window.requestAnimationFrame(() => {
      scrollRafRef.current = null;

      const nextProgress =
        hoverProgressRef.current +
        (hoverTargetRef.current - hoverProgressRef.current) * HOVER_LERP;
      hoverProgressRef.current =
        Math.abs(nextProgress - hoverTargetRef.current) < 0.01
          ? hoverTargetRef.current
          : nextProgress;

      if (hoverTargetRef.current === 0 && hoverProgressRef.current === 0) {
        hoveredConnectionRef.current = null;
      }

      handleScroll();

      const isHoverAnimating =
        Math.abs(hoverProgressRef.current - hoverTargetRef.current) > 0.001;
      const hasMouseMoveTail =
        performance.now() < mouseMoveTailUntilRef.current;

      if (isHoverAnimating || hasMouseMoveTail) {
        scheduleWireUpdate();
      }
    });
  };

  const [windowSize, setWindowSize] = useState([0, 0]);

  const hoveredFrameScale =
    1.08712e-10 * windowSize[0] ** 3 -
    4.44574e-7 * windowSize[0] ** 2 +
    0.000629502 * windowSize[0] +
    0.641167;

  const handleResize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    refreshConnectionElements();
    updateWireColors();
    resizeWireCanvas();
    scheduleWireUpdate();
  };

  const [activeColor, setActiveColor] = useState("");

  useEffect(() => {
    const findConnectionElement = (eventTarget: EventTarget | null) => {
      if (!(eventTarget instanceof Element)) return null;
      return eventTarget.closest("[data-connection]") as HTMLElement | null;
    };

    const handleDocumentMouseOver = (event: MouseEvent) => {
      const connection = findConnectionElement(event.target);
      if (!connection) return;

      setActiveColor(resolveWireColor(connection.dataset.connection));
      hoveredConnectionRef.current = connection;
      hoverTargetRef.current = 1;
      scheduleWireUpdate();
    };

    const handleDocumentMouseOut = (event: MouseEvent) => {
      const connection = findConnectionElement(event.target);
      if (!connection || hoveredConnectionRef.current !== connection) return;

      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof Node && connection.contains(relatedTarget)) {
        return;
      }

      setActiveColor("");
      hoverTargetRef.current = 0;
      scheduleWireUpdate();
    };

    const handleWindowScroll = () => {
      // Scrolling should always undraw the hover overlay.
      hoverTargetRef.current = 0;
      scheduleWireUpdate();
    };

    const handleWindowMouseMove = () => {
      mouseMoveTailUntilRef.current = performance.now() + MOUSE_MOVE_TAIL_MS;
      scheduleWireUpdate();
    };

    const mutationObserver = new MutationObserver(() => {
      refreshConnectionElements();
      scheduleWireUpdate();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-connection"],
    });

    refreshConnectionElements();
    updateWireColors();
    handleResize();
    document.addEventListener("mouseover", handleDocumentMouseOver);
    document.addEventListener("mouseout", handleDocumentMouseOut);
    window.addEventListener("mousemove", handleWindowMouseMove, {
      passive: true,
    });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    scheduleWireUpdate();
    return () => {
      mutationObserver.disconnect();
      document.removeEventListener("mouseover", handleDocumentMouseOver);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed z-100 inset-0 w-screen h-screen overflow-hidden pointer-events-none">
      <div
        className="absolute text-(--background)"
        style={{
          inset: isSidebarHovered ? 32 : "0",
          transition: sideBarTransition,
        }}
      >
        <svg
          className="absolute top-6 left-6"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16C8 11.5817 11.5817 8 16 8V0H0V16H8Z"
            fill="currentColor"
          />
        </svg>

        <svg
          className="absolute bottom-6 left-6"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C8 4.41828 11.5817 8 16 8V16H0V0H8Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute bottom-6 right-6"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0C8 4.41828 4.41828 8 0 8V16H16V0H8Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute top-6 right-6"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16C8 11.5817 4.41828 8 0 8V0H16V16H8Z"
            fill="currentColor"
          />
        </svg>
        <div>
          <div
            className="absolute z-1 inset-[0_-32px_auto_-32px] -translate-y-1/2 h-16 bg-(--background) pointer-events-auto"
            data-sidebar="true"
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
          ></div>
          <div
            className="absolute inset-[-32px_0_-32px_auto] translate-x-1/2 w-16 bg-(--background) pointer-events-auto"
            data-sidebar="true"
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
          ></div>
          <div
            className="absolute inset-[auto_-32px_0_-32px] translate-y-1/2 h-16 bg-(--background) pointer-events-auto"
            data-sidebar="true"
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
          >
            <div
              className="absolute inset-[0_32px_auto_32px] flex items-center justify-center gap-4"
              style={{
                height: isSidebarHovered ? "100%" : "50%",
                transition: sideBarTransition,
              }}
            >
              <p
                className="caption text-[12px]!"
                style={{
                  opacity: isSidebarHovered ? 0.8 : 0,
                  transition: sideBarTransition,
                }}
              >
                Fiddle 2026 • changing the way we build software
              </p>
            </div>
          </div>
          <div
            className="absolute inset-[-32px_auto_-32px_0] -translate-x-1/2 w-16 bg-(--background) pointer-events-auto"
            data-sidebar="true"
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
          ></div>
          <div
            className="absolute inset-8 border border-(--stroke)/15 rounded-lg"
            style={{
              backgroundColor: isSidebarHovered
                ? "color-mix(in oklab, var(--background) 50%, transparent)"
                : "transparent",
              transition: sideBarTransition,
            }}
            data-frame="true"
          ></div>
        </div>
      </div>
      <div
        className="absolute z-1 inset-0 p-4 origin-top pointer-events-none"
        style={{
          transform: `scale(${isSidebarHovered ? hoveredFrameScale : 1}) translateY(${isSidebarHovered ? "36px" : "0"})`,
          transition: sideBarTransition,
        }}
      >
        <canvas ref={wireCanvasRef} />
      </div>
      <div
        className="absolute z-1 inset-[0_32px_auto_32px] flex items-center justify-center gap-8"
        style={{
          height: isSidebarHovered ? "64px" : "32px",
          transition: sideBarTransition,
        }}
      >
        <p
          className="caption text-[14px]!"
          style={{
            opacity: isSidebarHovered ? 1 : 0,
            transition: sideBarTransition,
          }}
        >
          Docs
        </p>
        <Logo width={64} color={activeColor} />
        <p
          className="caption text-[14px]!"
          style={{
            opacity: isSidebarHovered ? 1 : 0,
            transition: sideBarTransition,
          }}
        >
          Blog
        </p>
      </div>
    </nav>
  );
}
