"use client";

import { useEffect, useRef } from "react";

const MAX_LINES = 7; // cap on simultaneous connector lines, for visual clarity + perf

/**
 * Interactive circuit-board background. The board itself is static — hover
 * does not touch any of the ambient traces. The only reaction: the cursor
 * connects to every nearby node (via/pad junction) with a thin glowing line,
 * like a small hub forming wherever you hover. Perf rule: only a fixed pool
 * of pre-allocated line/dot elements have their attributes and opacity
 * touched per frame; geometry is read once at mount, so there's no layout
 * thrash.
 */
export function CircuitBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const hubDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const group = groupRef.current;
    const hubDot = hubDotRef.current;
    if (!wrap || !svg || !group || !hubDot) return;

    const NODE_RADIUS = 210; // px, SVG user-space — nodes within this of the cursor light up
    const LERP_IN = 0.28;
    const LERP_OUT = 0.12;

    type Node = { x: number; y: number; intensity: number };

    let nodes: Node[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;
    let rafRunning = false;
    let wrapRect: DOMRect | null = null;
    let rafId = 0;
    let hubOpacity = 0;

    function readGeometry() {
      // "Nodes" are the circuit's junction points (vias + pads) — the traces
      // between them are edges, not connection targets.
      const els = svg!.querySelectorAll<SVGElement>(".ct-via, .ct-pad");
      nodes = [];
      els.forEach((el) => {
        const isVia = el.classList.contains("ct-via");
        let x: number, y: number;
        if (isVia) {
          x = parseFloat(el.getAttribute("cx") || "0") || 0;
          y = parseFloat(el.getAttribute("cy") || "0") || 0;
        } else {
          const px = parseFloat(el.getAttribute("x") || "0") || 0;
          const py = parseFloat(el.getAttribute("y") || "0") || 0;
          const pw = parseFloat(el.getAttribute("width") || "0") || 0;
          const ph = parseFloat(el.getAttribute("height") || "0") || 0;
          x = px + pw / 2;
          y = py + ph / 2;
        }
        nodes.push({ x, y, intensity: 0 });
      });
    }

    function updateRect() {
      wrapRect = wrap!.getBoundingClientRect();
    }

    function tick() {
      const localX = (mouseX - wrapRect!.left) * (1440 / wrapRect!.width);
      const localY = (mouseY - wrapRect!.top) * (900 / wrapRect!.height);

      let anyActive = false;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let target = 0;
        if (mouseActive) {
          const d = Math.hypot(localX - n.x, localY - n.y);
          target = d >= NODE_RADIUS ? 0 : 1 - d / NODE_RADIUS;
          target = target * target; // ease falloff
        }
        const lerp = target > n.intensity ? LERP_IN : LERP_OUT;
        n.intensity += (target - n.intensity) * lerp;
        if (n.intensity < 0.004) n.intensity = 0;
        if (n.intensity > 0.001) anyActive = true;
      }

      // Pick the MAX_LINES brightest active nodes and assign them to the pooled elements.
      const active = nodes
        .filter((n) => n.intensity > 0.001)
        .sort((a, b) => b.intensity - a.intensity)
        .slice(0, MAX_LINES);

      for (let i = 0; i < MAX_LINES; i++) {
        const line = lineRefs.current[i];
        const dot = dotRefs.current[i];
        if (!line || !dot) continue;
        const n = active[i];
        if (n) {
          line.setAttribute("x1", localX.toFixed(1));
          line.setAttribute("y1", localY.toFixed(1));
          line.setAttribute("x2", n.x.toFixed(1));
          line.setAttribute("y2", n.y.toFixed(1));
          const op = Math.min(1, n.intensity * 1.15).toFixed(3);
          line.style.opacity = op;
          dot.setAttribute("cx", n.x.toFixed(1));
          dot.setAttribute("cy", n.y.toFixed(1));
          dot.style.opacity = op;
        } else {
          line.style.opacity = "0";
          dot.style.opacity = "0";
        }
      }

      const hubTarget = active.length > 0 ? 1 : 0;
      hubOpacity += (hubTarget - hubOpacity) * (hubTarget > hubOpacity ? LERP_IN : LERP_OUT);
      if (hubOpacity < 0.004) hubOpacity = 0;
      if (hubOpacity > 0) {
        hubDot!.setAttribute("cx", localX.toFixed(1));
        hubDot!.setAttribute("cy", localY.toFixed(1));
      }
      group!.style.opacity = hubOpacity.toFixed(3);

      if (anyActive || hubOpacity > 0 || mouseActive) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafRunning = false;
      }
    }

    function ensureLoop() {
      if (!rafRunning) {
        rafRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      ensureLoop();
    }
    function onLeave() {
      mouseActive = false;
      ensureLoop();
    }

    window.addEventListener("resize", updateRect);
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("blur", onLeave);

    readGeometry();
    updateRect();

    return () => {
      window.removeEventListener("resize", updateRect);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="bg-circuit-wrap" ref={wrapRef}>
      <svg
        ref={svgRef}
        className="circuit-svg"
        preserveAspectRatio="none"
        style={{ display: "block" }}
        width={1440}
        height={900}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="circuit-traces-g" clipPath="url(#clip0_0_40840)" filter="url(#ctAlphaBoost)">
          <rect className="ct-pad" id="pad" x="178" y="478" width="4" height="4" stroke="white" strokeOpacity="0.121135" />
          <rect className="ct-trace" id="trace" x="180" y="480" width="1" height="220" fill="white" fillOpacity="0.0711352" />
          <circle className="ct-via" id="via" cx="180" cy="700" r="2" fill="white" fillOpacity="0.131135" />
          <rect className="ct-trace" id="trace_2" x="180" y="700" width="100" height="1" fill="white" fillOpacity="0.0711352" />
          <circle className="ct-via" id="via_2" cx="280" cy="700" r="2" fill="white" fillOpacity="0.131135" />
          <rect className="ct-trace" id="trace_3" x="280" y="700" width="1" height="140" fill="white" fillOpacity="0.0711352" />
          <circle className="ct-via" id="via_3" cx="280" cy="840" r="2" fill="white" fillOpacity="0.131135" />
          <rect className="ct-trace" id="trace_4" x="280" y="840" width="160" height="1" fill="white" fillOpacity="0.0711352" />
          <rect className="ct-pad" id="pad_2" x="438" y="838" width="4" height="4" stroke="white" strokeOpacity="0.121135" />
          <rect className="ct-pad" id="pad_3" x="1378" y="678" width="4" height="4" stroke="white" strokeOpacity="0.104005" />
          <rect className="ct-trace" id="trace_5" x="1380" y="580" width="1" height="100" fill="white" fillOpacity="0.0540051" />
          <circle className="ct-via" id="via_4" cx="1380" cy="580" r="2" fill="white" fillOpacity="0.114005" />
          <rect className="ct-trace" id="trace_6" x="1260" y="580" width="120" height="1" fill="white" fillOpacity="0.0540051" />
          <rect className="ct-pad" id="pad_4" x="1258" y="578" width="4" height="4" stroke="white" strokeOpacity="0.104005" />
          <rect className="ct-pad" id="pad_5" x="1258" y="378" width="4" height="4" stroke="white" strokeOpacity="0.142349" />
          <rect className="ct-trace" id="trace_7" x="1260" y="380" width="80" height="1" fill="white" fillOpacity="0.0923488" />
          <circle className="ct-via" id="via_5" cx="1340" cy="380" r="2" fill="white" fillOpacity="0.152349" />
          <rect className="ct-trace" id="trace_8" x="1340" y="200" width="1" height="180" fill="white" fillOpacity="0.0923488" />
          <rect className="ct-trace" id="trace_9" x="1340" y="200" width="100" height="1" fill="white" fillOpacity="0.0923488" />
          <rect className="ct-trace" id="trace_10" x="1440" y="200" width="1" height="120" fill="white" fillOpacity="0.0923488" />
          <rect className="ct-pad" id="pad_6" x="1438" y="318" width="4" height="4" stroke="white" strokeOpacity="0.142349" />
          <rect className="ct-pad" id="pad_7" x="38" y="578" width="4" height="4" stroke="white" strokeOpacity="0.108661" />
          <rect className="ct-trace" id="trace_11" x="40" y="580" width="60" height="1" fill="white" fillOpacity="0.0586606" />
          <circle className="ct-via" id="via_6" cx="100" cy="580" r="2" fill="white" fillOpacity="0.118661" />
          <rect className="ct-trace" id="trace_12" x="100" y="440" width="1" height="140" fill="white" fillOpacity="0.0586606" />
          <rect className="ct-pad" id="pad_8" x="98" y="438" width="4" height="4" stroke="white" strokeOpacity="0.108661" />
          <rect className="ct-pad" id="pad_9" x="638" y="418" width="4" height="4" stroke="white" strokeOpacity="0.13161" />
          <rect className="ct-trace" id="trace_13" x="640" y="420" width="1" height="220" fill="white" fillOpacity="0.0816102" />
          <rect className="ct-trace" id="trace_14" x="640" y="640" width="120" height="1" fill="white" fillOpacity="0.0816102" />
          <circle className="ct-via" id="via_7" cx="760" cy="640" r="2" fill="white" fillOpacity="0.14161" />
          <rect className="ct-trace" id="trace_15" x="760" y="500" width="1" height="140" fill="white" fillOpacity="0.0816102" />
          <rect className="ct-trace" id="trace_16" x="580" y="500" width="180" height="1" fill="white" fillOpacity="0.0816102" />
          <rect className="ct-pad" id="pad_10" x="578" y="498" width="4" height="4" stroke="white" strokeOpacity="0.13161" />
          <rect className="ct-pad" id="pad_11" x="1178" y="58" width="4" height="4" stroke="white" strokeOpacity="0.122912" />
          <rect className="ct-trace" id="trace_17" x="1180" y="60" width="1" height="200" fill="white" fillOpacity="0.0729124" />
          <rect className="ct-trace" id="trace_18" x="1000" y="260" width="180" height="1" fill="white" fillOpacity="0.0729124" />
          <rect className="ct-trace" id="trace_19" x="1000" y="260" width="1" height="200" fill="white" fillOpacity="0.0729124" />
          <rect className="ct-trace" id="trace_20" x="1000" y="460" width="160" height="1" fill="white" fillOpacity="0.0729124" />
          <rect className="ct-pad" id="pad_12" x="1158" y="458" width="4" height="4" stroke="white" strokeOpacity="0.122912" />
          <rect className="ct-pad" id="pad_13" x="678" y="318" width="4" height="4" stroke="white" strokeOpacity="0.137111" />
          <rect className="ct-trace" id="trace_21" x="680" y="320" width="260" height="1" fill="white" fillOpacity="0.0871106" />
          <circle className="ct-via" id="via_8" cx="940" cy="320" r="2" fill="white" fillOpacity="0.147111" />
          <rect className="ct-trace" id="trace_22" x="940" y="320" width="1" height="240" fill="white" fillOpacity="0.0871106" />
          <rect className="ct-trace" id="trace_23" x="840" y="560" width="100" height="1" fill="white" fillOpacity="0.0871106" />
          <rect className="ct-pad" id="pad_14" x="838" y="558" width="4" height="4" stroke="white" strokeOpacity="0.137111" />
          <rect className="ct-pad" id="pad_15" x="918" y="678" width="4" height="4" stroke="white" strokeOpacity="0.123462" />
          <rect className="ct-trace" id="trace_24" x="780" y="680" width="140" height="1" fill="white" fillOpacity="0.0734622" />
          <rect className="ct-trace" id="trace_25" x="780" y="580" width="1" height="100" fill="white" fillOpacity="0.0734622" />
          <rect className="ct-pad" id="pad_16" x="778" y="578" width="4" height="4" stroke="white" strokeOpacity="0.123462" />
          <rect className="ct-pad" id="pad_17" x="458" y="178" width="4" height="4" stroke="white" strokeOpacity="0.113961" />
          <rect className="ct-trace" id="trace_26" x="460" width="1" height="180" fill="white" fillOpacity="0.0639609" />
          <rect className="ct-trace" id="trace_27" x="300" width="160" height="1" fill="white" fillOpacity="0.0639609" />
          <circle className="ct-via" id="via_9" cx="300" r="2" fill="white" fillOpacity="0.123961" />
          <rect className="ct-trace" id="trace_28" x="300" width="1" height="160" fill="white" fillOpacity="0.0639609" />
          <rect className="ct-trace" id="trace_29" x="300" y="160" width="140" height="1" fill="white" fillOpacity="0.0639609" />
          <rect className="ct-pad" id="pad_18" x="438" y="158" width="4" height="4" stroke="white" strokeOpacity="0.113961" />
          <rect className="ct-pad" id="pad_19" x="558" y="698" width="4" height="4" stroke="white" strokeOpacity="0.143966" />
          <rect className="ct-trace" id="trace_30" x="560" y="700" width="240" height="1" fill="white" fillOpacity="0.0939658" />
          <rect className="ct-trace" id="trace_31" x="800" y="640" width="1" height="60" fill="white" fillOpacity="0.0939658" />
          <rect className="ct-pad" id="pad_20" x="798" y="638" width="4" height="4" stroke="white" strokeOpacity="0.143966" />
          <rect className="ct-pad" id="pad_21" x="978" y="318" width="4" height="4" stroke="white" strokeOpacity="0.142505" />
          <rect className="ct-trace" id="trace_32" x="980" y="240" width="1" height="80" fill="white" fillOpacity="0.0925053" />
          <rect className="ct-trace" id="trace_33" x="980" y="240" width="200" height="1" fill="white" fillOpacity="0.0925053" />
          <rect className="ct-trace" id="trace_34" x="1180" y="60" width="1" height="180" fill="white" fillOpacity="0.0925053" />
          <circle className="ct-via" id="via_10" cx="1180" cy="60" r="2" fill="white" fillOpacity="0.152505" />
          <rect className="ct-trace" id="trace_35" x="1100" y="60" width="80" height="1" fill="white" fillOpacity="0.0925053" />
          <rect className="ct-pad" id="pad_22" x="1098" y="58" width="4" height="4" stroke="white" strokeOpacity="0.142505" />
          <rect className="ct-pad" id="pad_23" x="1098" y="178" width="4" height="4" stroke="white" strokeOpacity="0.107729" />
          <rect className="ct-trace" id="trace_36" x="1100" y="180" width="240" height="1" fill="white" fillOpacity="0.0577289" />
          <circle className="ct-via" id="via_11" cx="1340" cy="180" r="2" fill="white" fillOpacity="0.117729" />
          <rect className="ct-trace" id="trace_37" x="1340" y="180" width="1" height="240" fill="white" fillOpacity="0.0577289" />
          <circle className="ct-via" id="via_12" cx="1340" cy="420" r="2" fill="white" fillOpacity="0.117729" />
          <rect className="ct-trace" id="trace_38" x="1160" y="420" width="180" height="1" fill="white" fillOpacity="0.0577289" />
          <rect className="ct-trace" id="trace_39" x="1160" y="200" width="1" height="220" fill="white" fillOpacity="0.0577289" />
          <rect className="ct-pad" id="pad_24" x="1158" y="198" width="4" height="4" stroke="white" strokeOpacity="0.107729" />
          <rect className="ct-pad" id="pad_25" x="778" y="818" width="4" height="4" stroke="white" strokeOpacity="0.125255" />
          <rect className="ct-trace" id="trace_40" x="660" y="820" width="120" height="1" fill="white" fillOpacity="0.0752547" />
          <rect className="ct-trace" id="trace_41" x="660" y="820" width="1" height="80" fill="white" fillOpacity="0.0752547" />
          <circle className="ct-via" id="via_13" cx="660" cy="900" r="2" fill="white" fillOpacity="0.135255" />
          <rect className="ct-trace" id="trace_42" x="580" y="900" width="80" height="1" fill="white" fillOpacity="0.0752547" />
          <rect className="ct-pad" id="pad_26" x="578" y="898" width="4" height="4" stroke="white" strokeOpacity="0.125255" />
          <rect className="ct-pad" id="pad_27" x="1258" y="178" width="4" height="4" stroke="white" strokeOpacity="0.1224" />
          <rect className="ct-trace" id="trace_43" x="1100" y="180" width="160" height="1" fill="white" fillOpacity="0.0724" />
          <rect className="ct-trace" id="trace_44" x="1100" width="1" height="180" fill="white" fillOpacity="0.0724" />
          <circle className="ct-via" id="via_14" cx="1100" r="2" fill="white" fillOpacity="0.1324" />
          <rect className="ct-trace" id="trace_45" x="860" width="240" height="1" fill="white" fillOpacity="0.0724" />
          <circle className="ct-via" id="via_15" cx="860" r="2" fill="white" fillOpacity="0.1324" />
          <rect className="ct-trace" id="trace_46" x="860" width="1" height="220" fill="white" fillOpacity="0.0724" />
          <rect className="ct-pad" id="pad_28" x="858" y="218" width="4" height="4" stroke="white" strokeOpacity="0.1224" />
          <rect className="ct-pad" id="pad_29" x="798" y="598" width="4" height="4" stroke="white" strokeOpacity="0.124485" />
          <rect className="ct-trace" id="trace_47" x="800" y="600" width="260" height="1" fill="white" fillOpacity="0.0744851" />
          <circle className="ct-via" id="via_16" cx="1060" cy="600" r="2" fill="white" fillOpacity="0.134485" />
          <rect className="ct-trace" id="trace_48" x="1060" y="600" width="1" height="180" fill="white" fillOpacity="0.0744851" />
          <rect className="ct-pad" id="pad_30" x="1058" y="778" width="4" height="4" stroke="white" strokeOpacity="0.124485" />
          <rect className="ct-pad" id="pad_31" x="198" y="858" width="4" height="4" stroke="white" strokeOpacity="0.118925" />
          <rect className="ct-trace" id="trace_49" x="200" y="860" width="240" height="1" fill="white" fillOpacity="0.0689252" />
          <rect className="ct-trace" id="trace_50" x="440" y="620" width="1" height="240" fill="white" fillOpacity="0.0689252" />
          <rect className="ct-pad" id="pad_32" x="438" y="618" width="4" height="4" stroke="white" strokeOpacity="0.118925" />
          <rect className="ct-pad" id="pad_33" x="978" y="318" width="4" height="4" stroke="white" strokeOpacity="0.121288" />
          <rect className="ct-trace" id="trace_51" x="980" y="220" width="1" height="100" fill="white" fillOpacity="0.0712884" />
          <rect className="ct-trace" id="trace_52" x="980" y="220" width="240" height="1" fill="white" fillOpacity="0.0712884" />
          <circle className="ct-via" id="via_17" cx="1220" cy="220" r="2" fill="white" fillOpacity="0.131288" />
          <rect className="ct-trace" id="trace_53" x="1220" y="220" width="1" height="80" fill="white" fillOpacity="0.0712884" />
          <rect className="ct-pad" id="pad_34" x="1218" y="298" width="4" height="4" stroke="white" strokeOpacity="0.121288" />
          <rect className="ct-pad" id="pad_35" x="538" y="158" width="4" height="4" stroke="white" strokeOpacity="0.121755" />
          <rect className="ct-trace" id="trace_54" x="540" y="160" width="140" height="1" fill="white" fillOpacity="0.0717548" />
          <rect className="ct-trace" id="trace_55" x="680" y="20" width="1" height="140" fill="white" fillOpacity="0.0717548" />
          <rect className="ct-pad" id="pad_36" x="678" y="18" width="4" height="4" stroke="white" strokeOpacity="0.121755" />
          <rect className="ct-pad" id="pad_37" x="618" y="858" width="4" height="4" stroke="white" strokeOpacity="0.128472" />
          <rect className="ct-trace" id="trace_56" x="620" y="760" width="1" height="100" fill="white" fillOpacity="0.0784717" />
          <circle className="ct-via" id="via_18" cx="620" cy="760" r="2" fill="white" fillOpacity="0.138472" />
          <rect className="ct-trace" id="trace_57" x="620" y="760" width="100" height="1" fill="white" fillOpacity="0.0784717" />
          <rect className="ct-pad" id="pad_38" x="718" y="758" width="4" height="4" stroke="white" strokeOpacity="0.128472" />
          <rect className="ct-pad" id="pad_39" x="658" y="678" width="4" height="4" stroke="white" strokeOpacity="0.102125" />
          <rect className="ct-trace" id="trace_58" x="660" y="540" width="1" height="140" fill="white" fillOpacity="0.0521252" />
          <rect className="ct-trace" id="trace_59" x="660" y="540" width="260" height="1" fill="white" fillOpacity="0.0521252" />
          <rect className="ct-pad" id="pad_40" x="918" y="538" width="4" height="4" stroke="white" strokeOpacity="0.102125" />
          <rect className="ct-pad" id="pad_41" x="558" y="498" width="4" height="4" stroke="white" strokeOpacity="0.130172" />
          <rect className="ct-trace" id="trace_60" x="560" y="500" width="160" height="1" fill="white" fillOpacity="0.0801721" />
          <circle className="ct-via" id="via_19" cx="720" cy="500" r="2" fill="white" fillOpacity="0.140172" />
          <rect className="ct-trace" id="trace_61" x="720" y="340" width="1" height="160" fill="white" fillOpacity="0.0801721" />
          <rect className="ct-pad" id="pad_42" x="718" y="338" width="4" height="4" stroke="white" strokeOpacity="0.130172" />
          <rect className="ct-pad" id="pad_43" x="898" y="118" width="4" height="4" stroke="white" strokeOpacity="0.129203" />
          <rect className="ct-trace" id="trace_62" x="760" y="120" width="140" height="1" fill="white" fillOpacity="0.0792026" />
          <rect className="ct-trace" id="trace_63" x="760" y="120" width="1" height="60" fill="white" fillOpacity="0.0792026" />
          <rect className="ct-trace" id="trace_64" x="760" y="180" width="120" height="1" fill="white" fillOpacity="0.0792026" />
          <rect className="ct-pad" id="pad_44" x="878" y="178" width="4" height="4" stroke="white" strokeOpacity="0.129203" />
          <rect className="ct-pad" id="pad_45" x="418" y="278" width="4" height="4" stroke="white" strokeOpacity="0.108857" />
          <rect className="ct-trace" id="trace_65" x="420" y="280" width="180" height="1" fill="white" fillOpacity="0.0588571" />
          <circle className="ct-via" id="via_20" cx="600" cy="280" r="2" fill="white" fillOpacity="0.118857" />
          <rect className="ct-trace" id="trace_66" x="600" y="140" width="1" height="140" fill="white" fillOpacity="0.0588571" />
          <rect className="ct-trace" id="trace_67" x="360" y="140" width="240" height="1" fill="white" fillOpacity="0.0588571" />
          <rect className="ct-pad" id="pad_46" x="358" y="138" width="4" height="4" stroke="white" strokeOpacity="0.108857" />
          <rect className="ct-pad" id="pad_47" x="18" y="238" width="4" height="4" stroke="white" strokeOpacity="0.113425" />
          <rect className="ct-trace" id="trace_68" x="20" y="80" width="1" height="160" fill="white" fillOpacity="0.063425" />
          <rect className="ct-trace" id="trace_69" y="80" width="20" height="1" fill="white" fillOpacity="0.063425" />
          <circle className="ct-via" id="via_21" cy="80" r="2" fill="white" fillOpacity="0.123425" />
          <rect className="ct-trace" id="trace_70" y="80" width="1" height="80" fill="white" fillOpacity="0.063425" />
          <circle className="ct-via" id="via_22" cy="160" r="2" fill="white" fillOpacity="0.123425" />
          <rect className="ct-trace" id="trace_71" y="160" width="240" height="1" fill="white" fillOpacity="0.063425" />
          <rect className="ct-pad" id="pad_48" x="238" y="158" width="4" height="4" stroke="white" strokeOpacity="0.113425" />
          <rect className="ct-pad" id="pad_49" x="138" y="338" width="4" height="4" stroke="white" strokeOpacity="0.125454" />
          <rect className="ct-trace" id="trace_72" y="340" width="140" height="1" fill="white" fillOpacity="0.0754544" />
          <rect className="ct-trace" id="trace_73" y="340" width="1" height="120" fill="white" fillOpacity="0.0754544" />
          <circle className="ct-via" id="via_23" cy="460" r="2" fill="white" fillOpacity="0.135454" />
          <rect className="ct-trace" id="trace_74" y="460" width="100" height="1" fill="white" fillOpacity="0.0754544" />
          <rect className="ct-pad" id="pad_50" x="98" y="458" width="4" height="4" stroke="white" strokeOpacity="0.125454" />
          <rect className="ct-pad" id="pad_51" x="658" y="538" width="4" height="4" stroke="white" strokeOpacity="0.10083" />
          <rect className="ct-trace" id="trace_75" x="660" y="540" width="180" height="1" fill="white" fillOpacity="0.05083" />
          <rect className="ct-trace" id="trace_76" x="840" y="540" width="1" height="100" fill="white" fillOpacity="0.05083" />
          <rect className="ct-trace" id="trace_77" x="720" y="640" width="120" height="1" fill="white" fillOpacity="0.05083" />
          <rect className="ct-pad" id="pad_52" x="718" y="638" width="4" height="4" stroke="white" strokeOpacity="0.10083" />
          {/* Additional fragments filling out sparse regions of the board (top edge, left-middle strip, bottom-right quadrant, bottom-left corner). */}
          <rect className="ct-pad" id="pad_100" x="298" y="38" width="4" height="4" stroke="white" strokeOpacity="0.121135" />
          <rect className="ct-trace" id="trace_100" x="300" y="40" width="120" height="1" fill="white" fillOpacity="0.071135" />
          <circle className="ct-via" id="via_100" cx="420" cy="40" r="2" fill="white" fillOpacity="0.131135" />
          <rect className="ct-trace" id="trace_101" x="420" y="40" width="1" height="90" fill="white" fillOpacity="0.071135" />
          <rect className="ct-pad" id="pad_101" x="418" y="128" width="4" height="4" stroke="white" strokeOpacity="0.121135" />
          <rect className="ct-pad" id="pad_102" x="758" y="28" width="4" height="4" stroke="white" strokeOpacity="0.104005" />
          <rect className="ct-trace" id="trace_102" x="760" y="30" width="1" height="100" fill="white" fillOpacity="0.054005" />
          <circle className="ct-via" id="via_102" cx="760" cy="130" r="2" fill="white" fillOpacity="0.114005" />
          <rect className="ct-trace" id="trace_103" x="760" y="130" width="140" height="1" fill="white" fillOpacity="0.054005" />
          <rect className="ct-pad" id="pad_103" x="898" y="128" width="4" height="4" stroke="white" strokeOpacity="0.104005" />
          <rect className="ct-pad" id="pad_104" x="998" y="48" width="4" height="4" stroke="white" strokeOpacity="0.142349" />
          <rect className="ct-trace" id="trace_104" x="1000" y="50" width="130" height="1" fill="white" fillOpacity="0.092349" />
          <circle className="ct-via" id="via_104" cx="1130" cy="50" r="2" fill="white" fillOpacity="0.152349" />
          <rect className="ct-trace" id="trace_105" x="1130" y="50" width="1" height="80" fill="white" fillOpacity="0.092349" />
          <rect className="ct-pad" id="pad_105" x="1128" y="128" width="4" height="4" stroke="white" strokeOpacity="0.142349" />
          <rect className="ct-pad" id="pad_106" x="1258" y="38" width="4" height="4" stroke="white" strokeOpacity="0.108661" />
          <rect className="ct-trace" id="trace_106" x="1260" y="40" width="1" height="110" fill="white" fillOpacity="0.058661" />
          <circle className="ct-via" id="via_106" cx="1260" cy="150" r="2" fill="white" fillOpacity="0.118661" />
          <rect className="ct-trace" id="trace_107" x="1260" y="150" width="100" height="1" fill="white" fillOpacity="0.058661" />
          <rect className="ct-pad" id="pad_107" x="1358" y="148" width="4" height="4" stroke="white" strokeOpacity="0.108661" />
          <rect className="ct-pad" id="pad_108" x="158" y="258" width="4" height="4" stroke="white" strokeOpacity="0.13161" />
          <rect className="ct-trace" id="trace_108" x="160" y="260" width="1" height="140" fill="white" fillOpacity="0.08161" />
          <circle className="ct-via" id="via_108" cx="160" cy="400" r="2" fill="white" fillOpacity="0.14161" />
          <rect className="ct-trace" id="trace_109" x="160" y="400" width="90" height="1" fill="white" fillOpacity="0.08161" />
          <rect className="ct-pad" id="pad_109" x="248" y="398" width="4" height="4" stroke="white" strokeOpacity="0.13161" />
          <rect className="ct-pad" id="pad_110" x="278" y="468" width="4" height="4" stroke="white" strokeOpacity="0.122912" />
          <rect className="ct-trace" id="trace_110" x="280" y="470" width="110" height="1" fill="white" fillOpacity="0.072912" />
          <circle className="ct-via" id="via_110" cx="390" cy="470" r="2" fill="white" fillOpacity="0.132912" />
          <rect className="ct-trace" id="trace_111" x="390" y="470" width="1" height="120" fill="white" fillOpacity="0.072912" />
          <rect className="ct-pad" id="pad_111" x="388" y="588" width="4" height="4" stroke="white" strokeOpacity="0.122912" />
          <rect className="ct-pad" id="pad_112" x="158" y="588" width="4" height="4" stroke="white" strokeOpacity="0.137111" />
          <rect className="ct-trace" id="trace_112" x="160" y="590" width="1" height="120" fill="white" fillOpacity="0.087111" />
          <circle className="ct-via" id="via_112" cx="160" cy="710" r="2" fill="white" fillOpacity="0.147111" />
          <rect className="ct-trace" id="trace_113" x="160" y="710" width="100" height="1" fill="white" fillOpacity="0.087111" />
          <rect className="ct-pad" id="pad_113" x="258" y="708" width="4" height="4" stroke="white" strokeOpacity="0.137111" />
          <rect className="ct-pad" id="pad_114" x="898" y="438" width="4" height="4" stroke="white" strokeOpacity="0.123462" />
          <rect className="ct-trace" id="trace_114" x="900" y="440" width="140" height="1" fill="white" fillOpacity="0.073462" />
          <circle className="ct-via" id="via_114" cx="1040" cy="440" r="2" fill="white" fillOpacity="0.133462" />
          <rect className="ct-trace" id="trace_115" x="1040" y="440" width="1" height="100" fill="white" fillOpacity="0.073462" />
          <rect className="ct-pad" id="pad_115" x="1038" y="538" width="4" height="4" stroke="white" strokeOpacity="0.123462" />
          <rect className="ct-pad" id="pad_116" x="1138" y="578" width="4" height="4" stroke="white" strokeOpacity="0.113961" />
          <rect className="ct-trace" id="trace_116" x="1140" y="580" width="1" height="100" fill="white" fillOpacity="0.063961" />
          <circle className="ct-via" id="via_116" cx="1140" cy="680" r="2" fill="white" fillOpacity="0.123961" />
          <rect className="ct-trace" id="trace_117" x="1140" y="680" width="130" height="1" fill="white" fillOpacity="0.063961" />
          <rect className="ct-pad" id="pad_117" x="1268" y="678" width="4" height="4" stroke="white" strokeOpacity="0.113961" />
          <rect className="ct-pad" id="pad_118" x="978" y="758" width="4" height="4" stroke="white" strokeOpacity="0.143966" />
          <rect className="ct-trace" id="trace_118" x="980" y="760" width="120" height="1" fill="white" fillOpacity="0.093966" />
          <circle className="ct-via" id="via_118" cx="1100" cy="760" r="2" fill="white" fillOpacity="0.153966" />
          <rect className="ct-trace" id="trace_119" x="1100" y="760" width="1" height="90" fill="white" fillOpacity="0.093966" />
          <rect className="ct-pad" id="pad_119" x="1098" y="848" width="4" height="4" stroke="white" strokeOpacity="0.143966" />
          <rect className="ct-pad" id="pad_120" x="1278" y="698" width="4" height="4" stroke="white" strokeOpacity="0.142505" />
          <rect className="ct-trace" id="trace_120" x="1280" y="700" width="1" height="110" fill="white" fillOpacity="0.092505" />
          <circle className="ct-via" id="via_120" cx="1280" cy="810" r="2" fill="white" fillOpacity="0.152505" />
          <rect className="ct-trace" id="trace_121" x="1280" y="810" width="100" height="1" fill="white" fillOpacity="0.092505" />
          <rect className="ct-pad" id="pad_121" x="1378" y="808" width="4" height="4" stroke="white" strokeOpacity="0.142505" />
          <rect className="ct-pad" id="pad_122" x="38" y="738" width="4" height="4" stroke="white" strokeOpacity="0.107729" />
          <rect className="ct-trace" id="trace_122" x="40" y="740" width="100" height="1" fill="white" fillOpacity="0.057729" />
          <circle className="ct-via" id="via_122" cx="140" cy="740" r="2" fill="white" fillOpacity="0.117729" />
          <rect className="ct-trace" id="trace_123" x="140" y="740" width="1" height="110" fill="white" fillOpacity="0.057729" />
          <rect className="ct-pad" id="pad_123" x="138" y="848" width="4" height="4" stroke="white" strokeOpacity="0.107729" />
        </g>
        <defs>
          <clipPath id="clip0_0_40840">
            <rect width="1440" height="900" fill="white" />
          </clipPath>
          {/* Uniformly boosts every trace/via/pad's alpha ~1.8x at rest, preserving their relative variation. */}
          <filter id="ctAlphaBoost" x="-20%" y="-20%" width="140%" height="140%">
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.8" intercept="0" />
            </feComponentTransfer>
          </filter>
        </defs>
        <g ref={groupRef} id="ct-connector-g" style={{ opacity: 0 }}>
          {Array.from({ length: MAX_LINES }).map((_, i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="ct-connector-line"
              x1={0}
              y1={0}
              x2={0}
              y2={0}
              stroke="#a8c8ff"
              strokeWidth={1.2}
              strokeLinecap="round"
              style={{ opacity: 0 }}
            />
          ))}
          {Array.from({ length: MAX_LINES }).map((_, i) => (
            <circle
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="ct-connector-dot"
              cx={0}
              cy={0}
              r={2.2}
              fill="#e2ecff"
              style={{ opacity: 0 }}
            />
          ))}
          <circle ref={hubDotRef} className="ct-connector-hub" cx={0} cy={0} r={3} fill="#f0f6ff" />
        </g>
      </svg>
    </div>
  );
}
