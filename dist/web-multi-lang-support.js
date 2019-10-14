/*!
 * Web Multiple Launguage Support Version 1.0.1
 * Author: Vicky Kumar
 * MIT License

  Copyright (c) 2019 Vicky Kumar

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 */
var newStyle = "";

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
  document
    .querySelector(".goog-logo-link")
    .setAttribute("style", "display: none");
  document
    .querySelector(".goog-te-gadget")
    .setAttribute("style", "font-size: 0");
  setInterval(() => {
    const header = document.querySelector(".skiptranslate iframe");
    if (header) {
      header.style.display = "none";
    }
    document.body.style.top = "2rem";
  }, 500);
  const defaultStyle = `
        width: 15rem;
        height: 2rem;
        line-height: 2rem;
        background: #2c3e50;
        overflow: hidden;
        outline: none;
        padding: 0 0.5em;
        color: #fff;
        cursor: pointer;
        position: fixed;
        z-index: 99999;
        top: 0;
        right: 0;
  `;
  setLanguageDropdownStyle(defaultStyle);
  if (newStyle) {
    setLanguageDropdownStyle(newStyle);
  }
}

function setLanguageDropdownStyle(style) {
  const styleMap = {};
  if (style && typeof style === "string") {
    const styles = style.split(";");
    styles.map(el => {
      let styleList = el ? el.split(":") : [];
      if (styleList[0] && styleList[1]) {
        styleMap[styleList[0].trim()] = styleList[1].trim();
      }
    });
  }
  const dropdown = document.querySelector(".goog-te-combo");
  if (dropdown) {
    for (let prop in styleMap) {
      dropdown.style[prop] = styleMap[prop];
    }
  }
}

class WebMultiLanguageSupport extends HTMLElement {
  static get observedAttributes() {
    return ["style"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "style":
        if (newVal) {
          newStyle = newVal;
        }
        break;
    }
  }

  connectedCallback() {
    let script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.getElementsByTagName("head")[0].appendChild(script);
    let host = this.shadow.getRootNode().host;
    let translateDiv = document.createElement("div");
    translateDiv.setAttribute("id", "google_translate_element");
    if (host) {
      host.insertAdjacentElement("beforebegin", translateDiv);
    }
  }
}

window.customElements.define("web-multi-lang-support", WebMultiLanguageSupport);
