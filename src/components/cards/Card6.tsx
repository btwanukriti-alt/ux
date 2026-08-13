"use client";

import { GradientBorder } from "./GradientBorder";

interface PetalProps {
  rotate: number;
  gradientPos: { left: number; top: number; width: number; height: number };
  gradientColor: string;
  gradientStop: number;
  gradientDuration: number;
  plainPos: { left: number; top: number; width: number; height: number };
  plainDuration: number;
  icons: { src: string; left: number; top: number }[];
}

function Petal({
  rotate,
  gradientPos,
  gradientColor,
  gradientStop,
  gradientDuration,
  plainPos,
  plainDuration,
  icons,
}: PetalProps) {
  return (
    <>
      <div
        className="absolute flex items-center justify-center"
        style={{ left: gradientPos.left, top: gradientPos.top, width: gradientPos.width, height: gradientPos.height }}
      >
        <div
          className="relative h-[64.187px] w-[206.884px] shrink-0 rounded-[44px]"
          style={{
            transform: `rotate(${rotate}deg)`,
            backgroundImage: `linear-gradient(90deg, ${gradientColor} 0%, rgba(255,255,255,0) ${gradientStop}%, rgba(255,255,255,0) ${100 - gradientStop}%, ${gradientColor} 100%)`,
          }}
        >
          <GradientBorder
            color="191,236,255"
            duration={gradientDuration}
            baseOpacity={0.05}
            sweepOpacity={1}
            restColor="191,195,255"
            restOpacity={0.228}
          />
        </div>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ left: plainPos.left, top: plainPos.top, width: plainPos.width, height: plainPos.height }}
      >
        <div className="relative h-[74.186px] w-[216.136px] shrink-0 rounded-[44px]" style={{ transform: `rotate(${rotate}deg)` }}>
          <GradientBorder
            color="191,236,255"
            duration={plainDuration}
            baseOpacity={0.05}
            sweepOpacity={1}
            restColor="191,203,255"
            restOpacity={0.12}
          />
        </div>
      </div>
      {icons.map((icon, i) => (
        <img key={i} src={icon.src} alt="" className="absolute size-4" style={{ left: icon.left, top: icon.top }} />
      ))}
    </>
  );
}

// Fixed to the exact Figma frame size (358.23 x 340.45), matching Card 1's
// canvas. See node 2376:222059.
export function Card6() {
  return (
    <div className="relative h-[340px] w-[358px] overflow-hidden rounded-[22px] bg-[rgba(86,79,154,0.04)] backdrop-blur-[4.65px]">
      <GradientBorder
        color="167,191,255"
        duration={4.2}
        baseOpacity={0.14}
        sweepOpacity={0.42}
        restColor="167,191,255"
        restOpacity={0.4}
      />

      <h3 className="absolute left-[24px] top-[28px] text-lg font-semibold leading-6 text-[#f3f4ff]">
        Describe. Test. Repeat.
      </h3>
      <p className="absolute left-[24px] top-[56px] w-[299px] text-sm font-medium leading-5 text-[#a8aac7]">
        Say your strategy out loud. Jaadu builds it, tests it, keeps looking.
      </p>

      {/* Every ring below sweeps on its own slightly-different duration, all starting
          together at mount — the desync (rather than one shared loop) is what gives
          the "several independent things glowing at once" lab-equipment feel. */}
      <div className="absolute left-[0.39px] top-[107.59px] h-[232px] w-[358px]">
        <div className="absolute left-[65.76px] top-0 h-[216.758px] w-[226.476px]">
          <Petal
            rotate={89.51}
            gradientPos={{ left: 145.59 - 65.76, top: 4.67, width: 65.942, height: 207.422 }}
            gradientColor="rgba(159,95,255,0.32)"
            gradientStop={30}
            gradientDuration={3.8}
            plainPos={{ left: 140.99 - 65.76, top: 0, width: 76.019, height: 216.758 }}
            plainDuration={4.6}
            icons={[
              { src: "/figma/card6/finance-icon.svg", left: 169.41 - 65.76, top: 179.78 },
              { src: "/figma/card6/history-icon.svg", left: 169.45 - 65.76, top: 20.36 },
            ]}
          />
          <Petal
            rotate={-153.24}
            gradientPos={{ left: 72.38 - 65.76, top: 32.76, width: 213.628, height: 150.458 }}
            gradientColor="rgba(129,255,205,0.32)"
            gradientStop={30}
            gradientDuration={4.4}
            plainPos={{ left: 65.8 - 65.76, top: 26.6, width: 226.392, height: 163.553 }}
            plainDuration={3.4}
            icons={[
              { src: "/figma/card6/library-icon.svg", left: 243.4 - 65.76, top: 136.06 },
              { src: "/figma/card6/ai-search-icon.svg", left: 99.41 - 65.76, top: 64.58 },
            ]}
          />
          <Petal
            rotate={-26.6}
            gradientPos={{ left: 72.33 - 65.76, top: 33.76, width: 213.726, height: 150.028 }}
            gradientColor="rgba(62,120,255,0.28)"
            gradientStop={30}
            gradientDuration={3.6}
            plainPos={{ left: 65.76 - 65.76, top: 26.82, width: 226.476, height: 163.112 }}
            plainDuration={5.0}
            icons={[
              { src: "/figma/card6/bulb-icon.svg", left: 241.31 - 65.76, top: 63.04 },
              { src: "/figma/card6/stack-icon.svg", left: 103.08 - 65.76, top: 136.28 },
            ]}
          />
        </div>

        <div className="absolute left-[151.04px] top-[80.42px] size-[55.918px]">
          <div className="absolute inset-0 rounded-[29px]">
            <GradientBorder
              color="191,236,255"
              duration={3.2}
              baseOpacity={0.05}
              sweepOpacity={1}
              restColor="191,203,255"
              restOpacity={0.12}
            />
          </div>
          <div className="absolute left-[3.43px] top-[3.77px] h-[48.381px] w-[49.069px] rounded-[29px]">
            <GradientBorder
              color="191,236,255"
              duration={4.0}
              baseOpacity={0.05}
              sweepOpacity={1}
              restColor="191,195,255"
              restOpacity={0.228}
            />
          </div>
          <div className="absolute left-[7px] top-[6.96px] flex size-[42px] items-center justify-center rounded-[25px] border border-[rgba(78,87,111,0.45)]">
            <img src="/figma/card6/spark-icon.svg" alt="" className="size-[17.3px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
