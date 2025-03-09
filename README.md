# 🔂 incrementator  

A lightweight TypeScript utility for iterating over multiple numeric parameters with flexible control. 

The `incrementator` utility can be seen as a replacement for traditional nested loops.
Using `incrementator` simplifies the iteration process, especially when working with multiple parameters and dynamic step functions.

## 🚀 Features  

- Iterate over multiple parameters simultaneously  
- Support for dynamic step functions  
- Flexible stop conditions (fixed or function-based)  
- Efficient iteration without unnecessary computations  

## 🛠️ Installation  

```sh
npm install incrementator
```

## 📖 Usage

```typescript
import incrementator from "incrementator";

incrementator(
  {
    x: { start: 0, stop: 2, step: 1 },
    y: { start: 5, stop: 3, step: -0.5 },
  },
  ({ x, y }) => console.log(`x=${x}, y=${y}`)
);
// Output:
// x=0, y=5
// x=0, y=4.5
// x=0, y=4
// x=0, y=3.5
// x=0, y=3
// x=1, y=5

// Equivalent code with for loops
// for (let x = 0; x < 2; x++) {
//   for (let y = 5; y >= 3; y -= 0.5) {
//     console.log(`x=${x}, y=${y}`);
//   }
// }

incrementator(
  {
    a: { start: 1, stop: 10, step: (current) => current * 2 },
  },
  ({ a }) => console.log(`a=${a}`)
);
// Output:
// a=1
// a=2
// a=4
// a=8

// Equivalent code with while loop
// let a = 1;
// while (a < 10) {
//   console.log(`a=${a}`);
//   a *= 2;
// }
```

## 🔧 API  

### `incrementator(config, callback)`

Iterates over multiple numeric parameters, calling `callback` for each combination.  

- `config: Record<string, IncrementatorConfig>` – Configuration object where each key defines a parameter and its value is an object with the following properties:
    - `start: number` – Initial value.  
    - `stop: number | (current: number) => boolean` – Fixed stop value or a function to determine when to stop.  
    - `step: number | (current: number) => number` – Fixed step value or a function to compute the next value.
- `callback: (values: Record<string, number>) => void` – Function executed for each combination of values.  
