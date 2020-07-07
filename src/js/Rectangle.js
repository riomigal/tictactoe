class Rectangle {
  #width;

  #height;

  #order;

  #posY;

  #posX;

  #checked;

  #value;

  constructor(width, height, order, posY, posX) {
    this.#width = width;
    this.#height = height;
    this.#order = order;
    this.#posY = posY;
    this.#posX = posX;
    this.#checked = false;
    this.#value = '';
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getOrder() {
    return this.#order;
  }

  getPosY() {
    return this.#posY;
  }

  getPosX() {
    return this.#posX;
  }

  getChecked() {
    return this.#checked;
  }

  getValue() {
    return this.#value;
  }

  setChecked(status) {
    this.#checked = status;
  }

  setValue(value) {
    this.#value = value;
  }
}

export default Rectangle;
