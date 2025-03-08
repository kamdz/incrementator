export interface IncrementatorConfig {
  /**
   * Initial value to start iteration from
   */
  start: number;
  /**
   * Either a specific stop value or a function that determines when to stop
   */
  stop: number | ((currentValue: number) => boolean);
  /**
   * Either a fixed step value or a function to calculate the next value
   */
  step: number | ((currentValue: number) => number);
}

/**
 * Result type for the incrementator callback function
 * Keys correspond to the configuration keys, and values are numbers
 */
export type IncrementatorResult<T extends Record<string, IncrementatorConfig>> = {
  [K in keyof T]: number;
};

function generateSequence({ start, stop, step }: IncrementatorConfig): number[] {
  const sequence: number[] = [];
  const isStop = typeof stop === 'function' ? stop : (value: number) => (start <= stop ? value <= stop : value >= stop);
  const getNext = (value: number) => (typeof step === 'number' ? value + step : step(value));

  for (let value = start; isStop(value); value = getNext(value)) {
    sequence.push(value);
    if (value === getNext(value)) break;
  }

  return sequence;
}

/**
 * Iterates through combinations of different parameters with specified steps
 *
 * @param config - Object with parameters configuration.
 *                 Each parameter has start, stop, and step properties.
 * @param callback - Function called for each combination of parameter values
 *
 * @example
 * ```typescript
 * incrementator(
 *   {
 *     x: { start: 0, stop: 2, step: 1 },
 *     y: { start: 5, stop: 3, step: -0.5 }
 *   },
 *   ({ x, y }) => console.log(`x=${x}, y=${y}`)
 * );
 * // Output:
 * // x=0, y=5
 * // x=0, y=4.5
 * // x=0, y=4
 * // x=0, y=3.5
 * // x=0, y=3
 * // x=1, y=5
 * // ...and so on for all combinations
 * ```
 */
function incrementator<T extends Record<string, IncrementatorConfig>>(
  config: T,
  callback: (values: IncrementatorResult<T>) => void
): void {
  const keys = Object.keys(config);
  if (!keys.length) return;

  const sequences = keys.map(key => generateSequence(config[key]));
  if (sequences.some(seq => seq.length === 0)) return;

  const indices = new Array(keys.length).fill(0);
  const sizes = sequences.map(seq => seq.length);
  const result = {} as IncrementatorResult<T>;

  do {
    keys.forEach((key, i) => (result[key as keyof T] = sequences[i][indices[i]]));
    callback({ ...result });
  } while (incrementIndices(indices, sizes));
}

function incrementIndices(indices: number[], sizes: number[]): boolean {
  for (let i = indices.length - 1; i >= 0; i--) {
    if (++indices[i] < sizes[i]) return true;
    indices[i] = 0;
  }
  return false;
}

export default incrementator;
