export default class Section {
  constructor({ items, renderer }, containerSelector) { 
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  /* Отрисовка элементов */

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  };
  
  /* Добавить элемент на страницу */
  
  //новую карточку добавляем в начало
  addNewItem(element) {
    this._container.prepend(element);
  };
  
  //по списку initialCards с начала
  addItem(element) {
    this._container.append(element);
  };
};