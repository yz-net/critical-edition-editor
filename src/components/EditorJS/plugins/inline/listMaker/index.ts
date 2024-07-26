/* eslint-disable */
import {
  API,
  InlineTool,
  InlineToolConstructorOptions,
  SanitizerConfig,
} from "@editorjs/editorjs";

export default class ListMaker implements InlineTool {
  private api: API;
  private button: HTMLButtonElement | null;
  private tag: string;
  private state: boolean;

  static isInline = true;

  constructor({ api }: InlineToolConstructorOptions) {
    this.api = api;
    this.button = null;
    this.tag = "UL";
    this.state = false;
  }

  static get shortcut() {
    return "Ctrl+L";
  }

  static get title() {
    return "List Maker";
  }

  render(): HTMLButtonElement {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML = "List";
    this.button.classList.add("inline-tool-button");
    return this.button;
  }

  surround(range: Range): void {
    if (this.state) {
      this.unwrap(range);
    } else {
      this.wrap(range);
    }
  }

  private wrap(range: Range): void {
    const selectedText = range.extractContents();
    const listItem = document.createElement("li");
    listItem.appendChild(selectedText);

    const list = document.createElement(this.tag);
    list.appendChild(listItem);

    range.insertNode(list);

    console.log("AYOOO", this.button);
    this.button?.classList.add("active");
  }

  private unwrap(range: Range): void {
    // Get the nearest parent Element if startContainer is not an Element
    const startContainer = range.startContainer;
    const startContainerElement =
      startContainer.nodeType === Node.ELEMENT_NODE
        ? (startContainer as Element)
        : startContainer.parentElement;

    // Ensure startContainerElement is defined and an Element before calling closest
    if (startContainerElement) {
      const list = startContainerElement.closest(this.tag);
      if (list) {
        const listItems = list.querySelectorAll("li");
        listItems.forEach((item) => {
          while (item.firstChild) {
            list.parentNode?.insertBefore(item.firstChild, list);
          }
          item.remove();
        });
        list.remove();
      }
    }

    this.button?.classList.remove("active");
  }

  checkState(selection: Selection): boolean {
    const anchor = selection.anchorNode;
    const currentElement =
      anchor?.nodeType === Node.ELEMENT_NODE
        ? (anchor as Element)
        : anchor?.parentElement;
    const currentList = currentElement
      ? currentElement.closest(this.tag)
      : null;
    this.state = !!currentList;
    if (this.button) {
      this.button.classList.toggle("active", this.state);
    }
    return this.state;
  }

  static get sanitize(): SanitizerConfig {
    return {
      ul: {},
      li: {},
    };
  }
}
