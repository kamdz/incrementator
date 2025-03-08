import incrementator from '@@';

describe('incrementator', () => {
  it('should iterate through a single parameter with numeric step', () => {
    const results: { x: number }[] = [];

    incrementator({ x: { start: 1, stop: 5, step: 1 } }, values => {
      results.push({ ...values });
    });

    expect(results).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 5 }]);
  });

  it('should handle descending ranges', () => {
    const results: { x: number }[] = [];

    incrementator({ x: { start: 5, stop: 1, step: -1 } }, values => {
      results.push({ ...values });
    });

    expect(results).toEqual([{ x: 5 }, { x: 4 }, { x: 3 }, { x: 2 }, { x: 1 }]);
  });

  it('should handle function-based stop condition', () => {
    const results: { x: number }[] = [];

    incrementator(
      {
        x: {
          start: 1,
          stop: val => val < 5,
          step: 1
        }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }]);
  });

  it('should handle function-based step', () => {
    const results: { x: number }[] = [];

    incrementator({ x: { start: 1, stop: 8, step: n => n * 2 } }, values => {
      results.push({ ...values });
    });

    expect(results).toEqual([{ x: 1 }, { x: 2 }, { x: 4 }, { x: 8 }]);
  });

  it('should iterate through multiple parameters with numeric steps', () => {
    const results: { x: number; y: number }[] = [];

    incrementator(
      {
        x: { start: 1, stop: 3, step: 1 },
        y: { start: 10, stop: 12, step: 1 }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toEqual([
      { x: 1, y: 10 },
      { x: 1, y: 11 },
      { x: 1, y: 12 },
      { x: 2, y: 10 },
      { x: 2, y: 11 },
      { x: 2, y: 12 },
      { x: 3, y: 10 },
      { x: 3, y: 11 },
      { x: 3, y: 12 }
    ]);
  });

  it('should iterate through parameters with mixed ascending and descending ranges', () => {
    const results: { up: number; down: number }[] = [];

    incrementator(
      {
        up: { start: 1, stop: 3, step: 1 },
        down: { start: 3, stop: 1, step: -1 }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toEqual([
      { up: 1, down: 3 },
      { up: 1, down: 2 },
      { up: 1, down: 1 },
      { up: 2, down: 3 },
      { up: 2, down: 2 },
      { up: 2, down: 1 },
      { up: 3, down: 3 },
      { up: 3, down: 2 },
      { up: 3, down: 1 }
    ]);
  });

  it('should handle complex combinations with different parameter types', () => {
    const results: { a: number; b: number; c: number }[] = [];

    incrementator(
      {
        a: { start: 0, stop: 1, step: 1 },
        b: { start: 10, stop: 20, step: 5 },
        c: { start: 100, stop: 10, step: n => n / 2 }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toEqual([
      { a: 0, b: 10, c: 100 },
      { a: 0, b: 10, c: 50 },
      { a: 0, b: 10, c: 25 },
      { a: 0, b: 10, c: 12.5 },
      { a: 0, b: 15, c: 100 },
      { a: 0, b: 15, c: 50 },
      { a: 0, b: 15, c: 25 },
      { a: 0, b: 15, c: 12.5 },
      { a: 0, b: 20, c: 100 },
      { a: 0, b: 20, c: 50 },
      { a: 0, b: 20, c: 25 },
      { a: 0, b: 20, c: 12.5 },
      { a: 1, b: 10, c: 100 },
      { a: 1, b: 10, c: 50 },
      { a: 1, b: 10, c: 25 },
      { a: 1, b: 10, c: 12.5 },
      { a: 1, b: 15, c: 100 },
      { a: 1, b: 15, c: 50 },
      { a: 1, b: 15, c: 25 },
      { a: 1, b: 15, c: 12.5 },
      { a: 1, b: 20, c: 100 },
      { a: 1, b: 20, c: 50 },
      { a: 1, b: 20, c: 25 },
      { a: 1, b: 20, c: 12.5 }
    ]);
  });

  it('should handle floating point steps', () => {
    const results: { x: number }[] = [];
    incrementator({ x: { start: 1, stop: 2, step: 0.5 } }, values => {
      results.push({ ...values });
    });

    expect(results).toEqual([{ x: 1 }, { x: 1.5 }, { x: 2 }]);
  });

  it('should do nothing with empty configuration object', () => {
    const callback = jest.fn();
    incrementator({}, callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle parameters with different step types', () => {
    const results: { linear: number; exponential: number }[] = [];

    incrementator(
      {
        linear: { start: 0, stop: 4, step: 1 },
        exponential: { start: 1, stop: 8, step: val => val * 2 }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toEqual([
      { linear: 0, exponential: 1 },
      { linear: 0, exponential: 2 },
      { linear: 0, exponential: 4 },
      { linear: 0, exponential: 8 },
      { linear: 1, exponential: 1 },
      { linear: 1, exponential: 2 },
      { linear: 1, exponential: 4 },
      { linear: 1, exponential: 8 },
      { linear: 2, exponential: 1 },
      { linear: 2, exponential: 2 },
      { linear: 2, exponential: 4 },
      { linear: 2, exponential: 8 },
      { linear: 3, exponential: 1 },
      { linear: 3, exponential: 2 },
      { linear: 3, exponential: 4 },
      { linear: 3, exponential: 8 },
      { linear: 4, exponential: 1 },
      { linear: 4, exponential: 2 },
      { linear: 4, exponential: 4 },
      { linear: 4, exponential: 8 }
    ]);
  });

  it('should handle zero step without infinite loop', () => {
    const results: { x: number }[] = [];

    incrementator({ x: { start: 5, stop: 10, step: 0 } }, values => {
      results.push({ ...values });
    });

    expect(results).toEqual([{ x: 5 }]);
  });

  it('should handle function-based stop condition that is immediately false', () => {
    const results: { x: number }[] = [];

    incrementator(
      {
        x: {
          start: 1,
          stop: () => false,
          step: 1
        }
      },
      values => {
        results.push({ ...values });
      }
    );

    expect(results).toHaveLength(0);
  });
});
