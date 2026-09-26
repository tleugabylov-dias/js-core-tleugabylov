import { describe, expect, it } from "vitest";
import { Store, SortedStore } from "../src/Store.js";

describe("Store", () => {
  it("starts empty with a zero total", () => {
    const store = new Store();

    expect(store.items).toEqual([]);
    expect(store.total()).toBe(0);
  });

  it("adds and finds an item", () => {
    const store = new Store();

    store.add({ name: "Keyboard", price: 12000, qty: 2 });

    expect(store.find("Keyboard")).toEqual({
      name: "Keyboard",
      price: 12000,
      qty: 2,
    });
  });

  it("combines quantities of items with the same name", () => {
    const store = new Store();

    store.add({ name: "Mouse", price: 5000, qty: 2 });
    store.add({ name: "Mouse", price: 5000, qty: 3 });

    expect(store.find("Mouse").qty).toBe(5);
  });

  it("removes an existing item", () => {
    const store = new Store([
      { name: "Monitor", price: 80000, qty: 1 },
    ]);

    expect(store.remove("Monitor")).toBe(true);
    expect(store.find("Monitor")).toBeUndefined();
  });

  it("returns false when removing a missing item", () => {
    const store = new Store();

    expect(store.remove("Missing")).toBe(false);
  });

  it("calculates the total price", () => {
    const store = new Store([
      { name: "Keyboard", price: 12000, qty: 2 },
      { name: "Mouse", price: 5000, qty: 3 },
    ]);

    expect(store.total()).toBe(39000);
  });

  it("rejects an invalid item", () => {
    const store = new Store();

    expect(() =>
      store.add({ name: "Broken", price: -1, qty: 1 })
    ).toThrow(TypeError);
  });

  it("validates items with a static method", () => {
    expect(
      Store.isValidItem({ name: "Mouse", price: 5000, qty: 0 })
    ).toBe(true);

    expect(Store.isValidItem({ name: "", price: 5000, qty: 1 })).toBe(
      false
    );
  });
});

describe("SortedStore", () => {
  it("returns items sorted by name using an overridden method", () => {
    const store = new SortedStore([
      { name: "Mouse", price: 5000, qty: 1 },
      { name: "Keyboard", price: 12000, qty: 1 },
    ]);

    expect(store.list().map(({ name }) => name)).toEqual([
      "Keyboard",
      "Mouse",
    ]);
  });
});
