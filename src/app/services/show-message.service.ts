import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor() { }

  showInfo(
    cssClass: string,
    inputText: string,
    typeOfMessage: string,
    statusCode?: number,
    errorText?: string) 
    
    {

      let element = document.querySelector('.blank') as HTMLElement;

      if (element.classList.item(1)) element.classList.remove(element.classList.item(1) as string);

      element.classList.add(cssClass);

      switch (typeOfMessage) {
        case 'add':
          element.innerHTML = "You have successfully added genre <b>" + inputText + "</b>";
          break;
        case 'edit':
          element.innerHTML = "New name of selected genre is <b>" + inputText + "</b>";
          break;
        case 'error-empty':
          element.innerHTML = "Input field cannot be empty!";
          break;
        case 'add-author':
          element.innerHTML = "New author has been successfully added!";
          break;
        case 'edit-author':
          element.innerHTML = "The author has been successfully edited!";
          break;
        case 'error-status-code':
          element.innerHTML = "Error! Status code: " + statusCode;
          break;
        case 'error-blank':
          element.innerHTML = 'Error! ' + errorText;
          break;
    }

      element.style.display = "block";

      window.setTimeout(this.hideElement, 2500, element);
  }

  hideElement(element: HTMLDivElement) {
    element.style.display = "none";
  }

}
