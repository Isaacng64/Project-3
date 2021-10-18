import { createElement } from "lwc";
import CommonUtils from "c/commonUtils";
import Autoplayer from "c/autoplayer";

describe("c-autoplayer", () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

    it("Display Update Tests", () => {
      const element = createElement("c-autoplayer", {
        is: Autoplayer
      });

      document.body.appendChild(element);

      let inputTextList = element.shadowRoot.querySelectorAll("lightning-input");

      expect(inputTextList.length).toBe(1);


    });


    

});
