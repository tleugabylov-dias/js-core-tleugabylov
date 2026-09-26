export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr) || typeof keyFn !== "function") {
    throw new TypeError("Expected an array and a function");
  }

  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    groups[key] = [...(groups[key] ?? []), item];
    return groups;
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError("Size must be a positive integer");
  }

  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, index) => arr.slice(index * size, index * size + size)
  );
}

export function deepClone(value) {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, deepClone(item)])
    );
  }

  return value;
}

export function memoize(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function");
  }

  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
}

export function counter(initialValue = 0) {
  let count = initialValue;

  return {
    inc: () => ++count,
    dec: () => --count,
    value: () => count,
  };
}