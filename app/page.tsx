"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const applyNowRef = useRef<HTMLDivElement>(null);
  const moonAsciiRef = useRef<HTMLPreElement>(null);
  const fiddleAsciiRef = useRef<HTMLPreElement>(null);
  const sfAsciiRef = useRef<HTMLPreElement>(null);

  const moonAscii = `








                                                                   .+
                                                                +++
                                                             .++++
                                                            ,+++++
                                                           .++++++
                                                           +++++++
                                                           ++++++++
                                                           +++++++++ 
                                                           ‘++++++++++              +’
                                                            ‘+++++++++++++       +++’
                                                             ‘+++++++++++++++++++++’
                                                                +++++++++++++++++
                                                                   ‘+++++++++’`;
  const fiddleAscii = `






                                                                                                   +++++++++++                      +++++                  +++++      +++
                                                                                                ++++++    ++++++                  +++++++                +++++++  +++++++
                                                                     ++++++++.                ++++++        +++++                   +++++                 ++++++   ++++++
                                                                   ++++++++++++++             +++++          ++++                   +++++                 ++++++    +++++
                                                                  +++++++++++++++++.          +++++                                 +++++                 ++++++    +++++
                                                                  ++++++++++++++++++,     +++++++++++++++    -++++       ++++++++++++++++       ++++++++++++++++    +++++       ++++++++++++
                                                                  +++++++++++++++++++.        +++++        +++++++     +++++      +++++++     ++++-     ++++++++    +++++     +++++     +++++-
                                                                  ++++++++++++++++++++        +++++         ++++++   ++++++        ++++++   +++++         ++++++    +++++    ++++        +++++
                                                                   +++++++++++++++++++        +++++         ++++++   +++++          +++++  ++++++         ++++++    +++++   +++++       ++++++
                                                                    ++++++++++++++++++        +++++         ++++++  -+++++          +++++  ++++++         ++++++    +++++  ++++++     +++++++
                                                                      +++++++++++++++         +++++         ++++++  ++++++          +++++  ++++++         ++++++    +++++  +++++++++++++++
                                                                          +++++++             +++++         ++++++   ++++++         +++++  ++++++-        ++++++    +++++   ++++++           ++
                                                                                              +++++         ++++++   +++++++       -+++++   ++++++        ++++++    +++++    +++++++       ++++
                                                                                             ++++++-        +++++++    +++++++    ++++++++    ++++++    +++++++++  +++++++    ++++++++++++++++
                                                                                            +++++++++      +++++++++      +++++++++ +++++++      +++++++++ ++++++-+++++++++      ++++++++++








                                                                                            `;
  const sfAscii = `
                                                                                                                                                                                                /\\
                                                                                                                                                                                                @@
                                                                                                                                                                                                @@
                                                                                                                                                                                                @@
                                                                                                                                                                                               %@@%
                                                                                                                                                                                               @@@@
                                                                                                                                                                                               @@@@
                                                                                                                                                                                               @@@@
                                                                                                                                                                                             #@@@@@@#
                                                                                                                                                                                             #@@@@@@#
                                                                                                                                                                                             #@@@@@@#
                                                                                                                                                                                             #@@@@@@#
                                                                                                                                                                                    *        #@@@@@@#           ##
                                                                                                                                                       ====                         *        #@@@@@@#           *#
                        %     @                                                                                                                        ====              =================== #@@@@@@#           **
                       %@@@@@@@%                                                                                                                     -======-            =================== %@@@@@@%     ==============
                    %%%%@@@@@@@@%                                                                                                        =          ========-=           =================== %@@@@@@%     =-==========-=
                 %%%##%%@@ @%%@@#%%                                                                                                 ======-=    ****+=======-=           =================== %@@@@@@%     =-==========-=                      *******
              %%%%#%%%##@@ #%%@@# %%                                                                                                ======-=    *****=======-=   +++*    ==============++=== %@@@@@@% **  =-==========-=                    ***********
           %%%%#%%% **##@@@@@@@%# ##%                                                                                               ======-=    *****=======-=   *********+===========+@@=== @@@@@@@@*****=-==========-=                    ***********
        %%%%#%%% #* **##@@   %@%% ###%%                                             *  *                                            ======-=    *****=======-=   **********==========*%@@%==+@@@@@@@@*****=-==========-=                    ***********
     %%%# %%%# * ** **##@@   @@@#%%#*##%                                            *****                                           ======-=    *****=====+**+*+-**********==========*@@@@++*@@@@@@@@*****=-==========-=                    ***********
  %@#* #%%# #* * ** **##@@%@@@@@# #%####%@                                          *****                                           ======-=++  *****=====******-**********==========*@@@%++*@@@@@@@@*****=-==========-=        *#          ***********
+ +#%% ***# *+ * ** +**#@@@@%@@@* *#%%#*##%                                         *****        +==++                       ===========+****** *****=====******-**********========*@@@@@@++*@@@@@@@@*****@%==========-=      ******=====   ***********
#%#++* ***# *+ * #* +**#@@   @@@* *#*#@## #%@                                       ****+        ===========                 ==-======-=+****** *****=====******-**********========+@@@@@@++#@@@@@@@@#***@@@%-====+++++=      #*****===-=   ***********
+ ++*+ +++# ** * ** *+##@@   @@%* ****#%%###%@                                      ****+        ===========                 ==-======-=+****** *****=====*****+-**********========+@@@@@@**#@@@@@@@@#**#@@@@+-==+********#   %*****===-=   ***********
+ +++* +++# ** * ** *+*#@@   @@%* ****##%%%#*#%%                                    *****        ===========            #*****=-======-=+****** *****=====*****+-*********#%*+=====+@@@@@@#*@@@@@@@@@%**#@@@@+===********** #@@%****===-=   ***********
+ +=++ +++# *+ * ** *+*#@@@@@@@%* ****#*#*#%%#*#%%                       @@@@       ****+        ===========  @%+=======#*****=-======-=+****** *****=====******+********#%@@@@%+==*@@@@@@%#@@@@@@@@@%**#@@@@+===********** @@@@#***===-=   ***********
+ =++* *+*# *+ * ** +**#@@   @@@* *#**#** #*#%%* #%%                    %%%%%@      ****+ *****  =========== @@@#=======#*****=-======-=+****** *****=====******+********#%@@@@%***%@@@@@@%#@@@@@@@@@%**#@@@@+===********** %@@@#***===*+*+ ***********
+ +++* ***# *+ * ** ***#@@   @@@* *#**#** #**##%%#*#%%                 %%%%%%%      ****+***********========#@@@@+-=====#*****=-======-=+****** *****=====******+**@@@@@@@@@@@@@@@#%@@@@@@%%@@@@@@@@@@**#@@@@*===********** @@@@***********************
* **** *+*# #* * ** **##@@   @@@* ****#*###**##* #%%##%%%  #*****    %%#%#%%#*%     ****+***********========%@@@@#-=====#*****=-+++*++-=+*****#####**=====*#####***@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@#*#@@@@*===***********@@@@***********************
%#%%%%@%%%%%%%%%%%%%%%%%@@%%%%@%%%%%%%%%%%#**#**#*#*#%%%#%%%##### %%%%%#*##*@*#%    ****#@@@@@#*****+*+****#@@@@@@******#*****=-@@@@@@-=+*****@@@@@#*=====*@@@@@@**@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@%+***********@@@@***********************
%@@%@@%@@@%@@%@%%%%%%%%%@%%%%%@%%%%%%%%#%############%%%%%%%%@%%%%%%%##**##*%#*%    *%@@@@@@@@@@@%**@@@@@@@@@@@@@@@@@@@@@@#*@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@%%#@@@#%@##%@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%
@@@@@@@@@@@@@@@@        @@@@@@@@ %  #%%%#######****+++++*##**###%%%%%%%%%%@%%%%#%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@%@@@%@@@@@@@@@@@@@%%%%%%%%%%@%@%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`;
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

    const onEnter = () => {
      fiddleAnimator.start("dissolve");
      fiddleTranslateAnimator.start("down");
      sfAnimator.start("restore");
    };

    const onLeave = () => {
      fiddleAnimator.start("restore");
      fiddleTranslateAnimator.start("up");
      sfAnimator.start("dissolve");
    };

    triggerEl.addEventListener("mouseenter", onEnter);
    triggerEl.addEventListener("mouseleave", onLeave);

    return () => {
      triggerEl.removeEventListener("mouseenter", onEnter);
      triggerEl.removeEventListener("mouseleave", onLeave);
      fiddleAnimator.stop();
      fiddleTranslateAnimator.stop();
      sfAnimator.stop();
    };
  }, [fiddleAscii, sfAscii]);

  return (
    <main className="flex flex-col items-stretch">
      <section className="relative">
        <div className="absolute inset-[0_0_auto_0] grid grid-cols-16 gap-0">
          {[...Array(16 * 6)].map((_, i) => (
            <div key={i} className="w-full aspect-square"></div>
          ))}
        </div>
        <div className="relative flex flex-col items-center justify-start py-32 gap-10">
          <h2 className="">Join us if you:</h2>
          <div className="w-full max-w-[500px] flex flex-col items-stretch gap-6">
            <p className="caption">
              1 - didn’t like school but still did phenomenally well at your
              jobs
            </p>
            <p className="caption">2 - are uncomfortable with “good enough”</p>
            <p className="caption">
              3 - have strong opinions but have changed your mind in the last
              quarter
            </p>
            <p className="caption">4 - are a high functioning workaholic</p>
          </div>
        </div>
      </section>
      <section className="">
        <div className="relative flex flex-col items-center justify-start gap-20 pt-32">
          <div className="w-full max-w-[510px] flex flex-col items-center gap-8">
            <h2 className="text-center">
              We are hiring product engineers in SF
            </h2>
            <div
              className="flex items-center justify-center px-4 py-3.5 text-[#FF9900] bg-[#FF9900]/15 rounded-lg cursor-pointer"
              ref={applyNowRef}
            >
              <p className="caption">Apply now</p>
            </div>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-[0_0_auto_0]">
              <pre className="ascii absolute" ref={moonAsciiRef}>
                {moonAscii}
              </pre>
              <pre className="ascii absolute" ref={fiddleAsciiRef}>
                {fiddleAscii}
              </pre>
            </div>
            <div className="relative">
              <pre className="ascii" ref={sfAsciiRef}>
                {sfAscii}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
