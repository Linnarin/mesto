export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;// создание и отрисовка данных на странице
    this._container = container;//куда добавляем элемент
  }

  //вставляем в разметку
  addItem(element) {
    this._container.append(element);//вставляем в конец
  }
  addItemStart(element) {
    this._container.prepend(element);//вставляем в начало
  }
//массив данных ждем извне(!)
  rendererItems(items) {
    items.forEach((item, index) => {
				this._renderer(item);
    });
  }
}