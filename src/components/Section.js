export default class Section {
  constructor({renderer}, containerSelector) { 
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  /* Отрисовка элементов */

  renderItems(items){
    items.forEach((element) => {
      this._renderer(element)
    });
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