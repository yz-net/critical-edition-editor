import { API, InlineTool } from "@editorjs/editorjs";

import { generateID } from "../../../utils/generateID";

export default class FootnoteMaker implements InlineTool {
  api: API;
  button?: HTMLButtonElement;
  state: boolean;
  footnoteRefInput?: HTMLInputElement;

  static get isInline() {
    return true;
  }
  static get shortcut() {
    return "Ctrl+F";
  }
  static get title() {
    return "Footnote Maker";
  }

  // static get sanitize() { }

  constructor(args: { api: API }) {
    const { api } = args;

    this.api = api;
    this.state = false;

    this.render = this.render.bind(this);
    this.surround = this.surround.bind(this);
  }

  checkState(selection: Selection): boolean {
    // console.log("checkState", selection);
    let element = selection.focusNode;
    if (element?.nodeName === "#text") {
      element = element?.parentElement;
    }

    let isFootnoteRef = false;
    if (
      element?.nodeName === "A" &&
      element?.parentElement?.nodeName === "SUP"
    ) {
      isFootnoteRef = true;
    }
    if (element?.nodeName === "SUP" && element?.firstChild?.nodeName === "A") {
      isFootnoteRef = true;
      element = element.firstChild;
    }

    if (isFootnoteRef) {
      this.button?.classList.add(this.api.styles.inlineToolButtonActive);
    } else {
      this.button?.classList.remove(this.api.styles.inlineToolButtonActive);
    }

    if (this.footnoteRefInput) {
      this.footnoteRefInput.hidden = !isFootnoteRef;
      if (isFootnoteRef) {
        this.footnoteRefInput.value = element?.textContent ?? "";
        this.footnoteRefInput.oninput = (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            element!.setAttribute("href", `#fn-${e.target.value}`);
            element!.textContent = e.target.value;
          }
        };
      }
    }

    return isFootnoteRef;
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "F";
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  renderActions() {
    this.footnoteRefInput = document.createElement("input");
    return this.footnoteRefInput;
  }

  surround(range: Range) {
    // console.log("surround", range);
    let element = range.endContainer;
    if (element.nodeName !== "SUP") {
      element = element.parentNode as Node;
    }

    let isFootnoteRef = false;

    if (element?.nodeName === "A" && element?.parentNode?.nodeName === "SUP") {
      isFootnoteRef = true;
    }
    if (element?.nodeName === "SUP" && element?.firstChild?.nodeName === "A") {
      isFootnoteRef = true;
      element = element.firstChild;
    }

    if (!isFootnoteRef) {
      const id = "footnote";
      const mark = document.createElement("sup");
      mark.className = "footnote-ref";
      mark.id = `fnref-${id}`;

      mark.onclick = () => {
        const range = document.createRange();
        range.selectNodeContents(mark);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        this.api.selection.expandToTag(mark);
      };

      const link = document.createElement("a");
      link.href = "#fn-" + id;
      link.textContent = id;

      // const text = range.cloneContents();
      // link.appendChild(text);
      mark.appendChild(link);

      const endRange = range.cloneRange();
      endRange.collapse(false);
      endRange.insertNode(mark);
    } else {
      element?.parentElement?.remove();
    }

    this.api.inlineToolbar.close();
  }
}
