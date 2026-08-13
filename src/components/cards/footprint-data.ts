export interface Footprint {
  left: number;
  top: number;
  width: number;
  height: number;
  candle: string;
  cells: string[];
  values: string[];
}

// Extracted from Figma (Card 2, Group 624547). Left/right columns render the
// same color sequence mirrored, so one cells/values array drives both.
// Values are randomized (fixed at build time, not per-render, so server and
// client agree) — same "###.#k" format as the source design, just varied
// instead of every cell reading "594.5k".
export const FOOTPRINTS: Footprint[] = [
  {
    left: 143.05,
    top: 27.54,
    width: 54.737,
    height: 115.655,
    candle: '#ff5971',
    cells: ['rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(4,40,136,0.5)', 'rgba(201,30,55,0.5)', 'rgba(242,171,78,0.5)', 'rgba(98,138,248,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(201,30,55,0.5)', 'rgba(4,40,136,0.5)'],
    values: ['50.8k', '611.6k', '934.0k', '860.6k', '879.7k', '941.0k', '567.1k', '906.3k', '216.3k', '783.6k'],
  },
  {
    left: 21.21,
    top: 29.31,
    width: 54.737,
    height: 105.06,
    candle: '#ff5971',
    cells: ['rgba(52,93,205,0.5)', 'rgba(247,69,96,0.5)', 'rgba(127,28,43,0.5)', 'rgba(201,30,55,0.5)', 'rgba(4,40,136,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(201,30,55,0.5)', 'rgba(127,28,43,0.5)'],
    values: ['77.5k', '343.6k', '298.1k', '698.3k', '638.5k', '714.2k', '538.2k', '96.3k', '229.4k'],
  },
  {
    left: 264.88,
    top: 38.36,
    width: 57.358,
    height: 139.051,
    candle: '#45ffb5',
    cells: ['rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(127,28,43,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)', 'rgba(4,40,136,0.5)', 'rgba(52,93,205,0.5)', 'rgba(4,40,136,0.5)'],
    values: ['96.6k', '199.4k', '180.8k', '565.5k', '711.3k', '200.6k', '186.6k', '719.6k', '732.6k', '719.2k', '358.1k', '326.6k'],
  },
  {
    left: 203.96,
    top: 107.88,
    width: 54.737,
    height: 68.863,
    candle: '#ff5971',
    cells: ['rgba(127,28,43,0.5)', 'rgba(247,69,96,0.5)', 'rgba(127,28,43,0.5)', 'rgba(247,69,96,0.5)', 'rgba(201,30,55,0.5)', 'rgba(242,171,78,0.5)'],
    values: ['265.2k', '593.2k', '545.0k', '132.8k', '794.5k', '524.0k'],
  },
  {
    left: 82.13,
    top: 100.82,
    width: 54.737,
    height: 68.863,
    candle: '#45ffb5',
    cells: ['rgba(4,40,136,0.5)', 'rgba(4,40,136,0.5)', 'rgba(98,138,248,0.5)', 'rgba(242,171,78,0.5)', 'rgba(98,138,248,0.5)', 'rgba(4,40,136,0.5)'],
    values: ['741.5k', '639.0k', '902.9k', '624.5k', '461.5k', '469.5k'],
  },
];
