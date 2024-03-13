import { API, InlineTool } from "@editorjs/editorjs";

import { generateID } from "../../../utils/generateID";

export default class FootnoteMaker implements InlineTool {
  api: API;
  button?: HTMLButtonElement;
  state: boolean;

  static get isInline() {
    return true;
  }
  static get shortcut() {
    return "Ctrl+F";
  }
  static get title() {
    return "Footnote Maker";
  }

  static get sanitize() {
    return {};
  }

  constructor(args: { api: API }) {
    const { api } = args;

    this.api = api;
    this.state = false;

    this.render = this.render.bind(this);
    this.surround = this.surround.bind(this);
  }

  checkState(selection: Selection): boolean {
    const element = selection.focusNode;
    const parentElement = element?.parentElement;

    const isFootnoteRef =
      parentElement?.nodeName === "A" &&
      parentElement?.parentElement?.nodeName === "SUP";

    if (isFootnoteRef) {
      this.button?.classList.add(this.api.styles.inlineToolButtonActive);
    } else {
      this.button?.classList.remove(this.api.styles.inlineToolButtonActive);
    }

    return isFootnoteRef;
  }

  // clear() { }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "F";
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: Range) {
    const lastElement = range.endContainer.parentElement;
    const isFootnoteRef =
      lastElement?.nodeName === "A" &&
      lastElement?.parentElement?.nodeName === "SUP";

    if (!isFootnoteRef) {
      const id = generateID();
      const mark = document.createElement("sup");
      mark.className = "footnote-ref";
      mark.id = `fnref-${id}`;
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
      lastElement?.parentElement?.remove();
    }

    this.api.inlineToolbar.close();
  }
}
