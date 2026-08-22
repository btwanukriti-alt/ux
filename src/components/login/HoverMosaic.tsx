// Exact vector export of the "Form Hover Effect" mosaic (Figma node
// 3316:307889), used as-is rather than hand-rebuilt in React/CSS — it
// carries its own real fills, gradients, and background-blur defs, so it's
// the source of truth for what this layer should look like. Rendered via
// <object> (not <img>) so its internal <foreignObject>/backdrop-filter
// blur layers actually render, and so the parent's CSS mask-image still
// applies to it as a normal replaced element.
export function HoverMosaic() {
  return (
    <object
      data="/figma/login/form-hover-effect.svg"
      type="image/svg+xml"
      aria-label=""
      className="block h-[826px] w-[682px]"
    />
  );
}
