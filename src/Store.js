export class Store {
  #items = [];

  constructor(items = []) {
    items.forEach((item) => this.add(item));
  }

  static isValidItem(item) {
    return (
      item !== null &&
      typeof item === "object" &&
      typeof item.name === "string" &&
      item.name.trim() !== "" &&
      typeof item.price === "number" &&
      item.price >= 0 &&
      Number.isInteger(item.qty) &&
      item.qty >= 0
    );
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }

  add(item) {
    if (!Store.isValidItem(item)) {
      throw new TypeError("Invalid store item");
    }

    const existingItem = this.#items.find(
      ({ name }) => name === item.name
    );

    if (existingItem) {
      existingItem.qty += item.qty;
    } else {
      this.#items.push({ ...item });
    }

    return this;
  }

  remove(name) {
    const index = this.#items.findIndex((item) => item.name === name);

    if (index === -1) {
      return false;
    }

    this.#items.splice(index, 1);
    return true;
  }

  find(name) {
    const item = this.#items.find((item) => item.name === name);
    return item ? { ...item } : undefined;
  }

  total() {
    return this.#items.reduce(
      (sum, { price, qty }) => sum + price * qty,
      0
    );
  }

  list() {
    return this.items;
  }
}

export class SortedStore extends Store {
  list() {
    return super
      .list()
      .sort((first, second) => first.name.localeCompare(second.name));
  }
}