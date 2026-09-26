import { describe, expect, it, vi } from "vitest";
import {
  unique,
  groupBy,
  chunk,
  deepClone,
  memoize,
  counter,
} from "../src/functions.js";

describe("unique", () => {
  it("removes duplicate values", () => {
    expect(unique([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("returns an empty array", () => {
    expect(unique([])).toEqual([]);
  });

  it("throws for an incorrect type", () => {
    expect(() => unique("text")).toThrow(TypeError);
  });
});

describe("groupBy", () => {
  it("groups objects by a calculated key", () => {
    const users = [
      { name: "Ali", age: 20 },
      { name: "Dana", age: 21 },
      { name: "Dias", age: 20 },
    ];

    expect(groupBy(users, ({ age }) => age)).toEqual({
      20: [
        { name: "Ali", age: 20 },
        { name: "Dias", age: 20 },
      ],
      21: [{ name: "Dana", age: 21 }],
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(groupBy([], (item) => item)).toEqual({});
  });

  it("throws when keyFn is not a function", () => {
    expect(() => groupBy([], "age")).toThrow(TypeError);
  });
});

describe("chunk", () => {
  it("splits an array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5],
    ]);
  });

  it("returns an empty array for an empty array", () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it("throws when size is zero", () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError);
  });
});

describe("deepClone", () => {
  it("creates independent objects, arrays and dates", () => {
    const original = {
      user: { name: "Dias" },
      skills: ["JavaScript"],
      createdAt: new Date("2026-09-26"),
    };

    const copy = deepClone(original);

    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy.user).not.toBe(original.user);
    expect(copy.skills).not.toBe(original.skills);
    expect(copy.createdAt).not.toBe(original.createdAt);
  });
});

describe("memoize", () => {
  it("caches the result using a closure", () => {
    const calculate = vi.fn((number) => number * 2);
    const cachedCalculate = memoize(calculate);

    expect(cachedCalculate(5)).toBe(10);
    expect(cachedCalculate(5)).toBe(10);
    expect(calculate).toHaveBeenCalledTimes(1);
  });

  it("throws for an incorrect type", () => {
    expect(() => memoize(10)).toThrow(TypeError);
  });
});

describe("counter", () => {
  it("changes and remembers its private value", () => {
    const count = counter();

    expect(count.value()).toBe(0);
    expect(count.inc()).toBe(1);
    expect(count.inc()).toBe(2);
    expect(count.dec()).toBe(1);
    expect(count.value()).toBe(1);
  });
});
