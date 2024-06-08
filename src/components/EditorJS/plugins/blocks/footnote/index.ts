/* eslint-disable */
import { API, BlockToolData, EditorConfig } from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";

import { generateID } from "../../../utils/generateID";

import styles from "./styles.module.scss";

export interface TuneSetting {
  name: string;
  icon: string;
  active: boolean;
  handleClick: () => void;
}

export default class Footnote extends Paragraph {
  private _data: any;
  data: any;
  wrapper: any;

  constructor(opts: { data: BlockToolData; config: EditorConfig; api: API }) {
    const { data, config, api } = opts;
    super({ data, config, api });

    // if no ID is set, set one
    if (!data.id) {
      const initialID = generateID();
      this._data.id = initialID;
    }

    // if not text is set, set it
    if (!data.text) {
      this._data.text = "";
    }

    this.save = this.save.bind(this);
    this.render = this.render.bind(this);
    this.renderEmbedCode = this.renderEmbedCode.bind(this);
  }

  static get toolbox() {
    return {
      icon: "F",
      title: "Footnote",
    };
  }

  renderEmbedCode(e?: any) {
    e?.preventDefault();
    let embedCode = this.wrapper.querySelector("." + styles.embedCode);
    let embedCodePreview = this.wrapper.querySelector(
      "." + styles.embedPreview,
    );

    if (!embedCode) {
      embedCode = document.createElement("textarea");
      embedCode.setAttribute("placeholder", "Embed code...");
      embedCode.classList.add(styles.embedCode);
      embedCode.value = this.data.embedCode || "";
      embedCode.addEventListener("change", this.renderEmbedCode);
      embedCode.addEventListener("keyup", this.renderEmbedCode);
      this.wrapper.appendChild(embedCode);
    }

    if (embedCode?.value && !embedCodePreview) {
      embedCodePreview = document.createElement("div");
      embedCodePreview.setAttribute("placeholder", "Empty embed");
      embedCodePreview.classList.add(styles.embedPreview);

      embedCodePreview.innerHTML = embedCode.value;
      this.wrapper.appendChild(embedCodePreview);
    } else if (!embedCode?.value && embedCodePreview) {
      embedCodePreview.remove();
    } else if (embedCodePreview) {
      embedCodePreview.innerHTML = embedCode.value;
    }
  }

  static get sanitize() {
    return {
      id: false,
      label: false, // TODO - Is this right?
      text: { i: true, a: true, b: true },
      embedCode: true,
    };
  }

  save(blockContent: BlockToolData) {
    const label =
      blockContent.querySelector(`div[data-id="${this.data.id}"]`)
        ?.textContent ?? "";
    const id = `fn-${label}`;

    const content = blockContent.querySelector("." + styles.contentArea);
    const text = content ? content.innerHTML : "";

    const embedCode = blockContent.querySelector("." + styles.embedCode).value;

    const ret = {
      id,
      label,
      text,
      embedCode,
    };

    return ret;
  }

  render() {
    const footnote = document.createElement("div");
    footnote.classList.add(styles.footnoteBlock!);

    const footnoteId = document.createElement("div");
    footnoteId.classList.add(styles.idField!);
    footnoteId.classList.add(styles.barLabel!);
    footnoteId.setAttribute("data-id", this.data.id);
    footnoteId.setAttribute("contenteditable", "true");
    footnoteId.setAttribute("placeholder", "Footnote ID");
    footnoteId.addEventListener("input", (e) => {
      const target = e.target as HTMLElement;
      const value = target.innerHTML ?? "";
      footnoteId.innerHTML = value;
      footnoteId.setAttribute("data-id", `fn-${value}`);
      // place caret at end
      var range = document.createRange();
      range.selectNodeContents(target);
      range.collapse(false);
      var sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
    // idBar.innerHTML = "[ #" + this.data.id + " ]";
    footnoteId.innerHTML = this.data.label ?? "";
    footnote.appendChild(footnoteId);

    const contentArea = document.createElement("div");
    contentArea.setAttribute("contenteditable", "true");
    contentArea.setAttribute("placeholder", "Footnote content...");
    contentArea.classList.add(styles.contentArea!);
    contentArea.classList.add(styles.textInput!);
    contentArea.classList.add("ce-paragraph");
    contentArea.innerHTML = this.data.text;
    contentArea.addEventListener("paste", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const pastedData = e.clipboardData?.getData("Text");
      if (!pastedData) {
        return;
      }
      contentArea.innerHTML += pastedData;
    });
    footnote.appendChild(contentArea);

    contentArea.addEventListener("keyup", this.onKeyUp);

    this.wrapper = footnote;

    this.renderEmbedCode();

    return footnote;
  }
}
