import { createElement } from "lwc";
import CommonUtils from "c/commonUtils";
import autoplayer from "c/autoplayer";

describe("c-autoplayer", () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    });

});
