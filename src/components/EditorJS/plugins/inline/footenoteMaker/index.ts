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

  constructor(args: { api: API }) {
    const { api } = args;

    this.api = api;
    this.state = false;

    this.render = this.render.bind(this);
    this.surround = this.surround.bind(this);
  }

  checkState(selection: Selection): boolean {
    const text = selection.anchorNode;

    if (!text) {
      return false;
    }

    const anchorElement = text instanceof Element ? text : text.parentElement;

    this.state = !!anchorElement?.closest("MARK");

    return this.state;
  }

  clear() {
    console.log("Clear called");
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "F";
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: Range) {
    // TODO - Check to see if there are any <mark> elements inside
    // the selectedText. If so, don't allow a footnote to be created.
    // however, this will require us to create a "delete" footnote
    // button. Or we could automatically broaden a footnote when
    // the user selects beyond either end of a mark, or srhink the
    // footnote when the user selects within it.
    // The way link handles it is if any part of an existing link is
    // selected, the icon changes to a delete link icon. this is
    // probably a good solution.
    // https://github.com/codex-team/editor.js/blob/next/src/components/inline-tools/inline-tool-link.ts

    if (!!(range.endContainer.parentNode?.nodeName.toLowerCase() === "a")) {
      // If highlights is already applied, do nothing for now
      return;
    }

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

    // add a footnote block now
    // this.api.blocks.insert(
    //   "footnoteParagraph",
    //   { id },
    //   undefined,
    //   undefined,
    //   true,
    // );

    // console.log(
    //   this.api.blocks
    //     .getBlockByIndex(this.api.blocks.getCurrentBlockIndex())
    //     .save()
    //     .then((d) => console.log(d))
    // );

    this.api.inlineToolbar.close();

    // this.api.focus(this.api.blocks.getCurrentBlockIndex() + 1)
  }
}
