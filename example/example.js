// Example QuickJS script demonstrating QuickJS-ng features

const greet = (name) => {
  return `Hello, ${name}! Welcome to QuickJS-ng.`;
};

const fibonacci = (n) => {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

console.log(greet("World"));
console.log("Fibonacci(20):", fibonacci(20));

const arr = [1, 2, 3, 4, 5];
const evens = arr.filter(x => x % 2 === 0);
console.log("Even numbers:", evens);

const sum = arr.reduce((acc, x) => acc + x, 0);
console.log("Sum:", sum);

print("Script completed successfully!");