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
    let embedCodeLabel = this.wrapper.querySelector(
      "." + styles.embedCodeLabel,
    );
    let embedCode = this.wrapper.querySelector("." + styles.embedCode);
    let embedCodePreview = this.wrapper.querySelector(
      "." + styles.embedPreview,
    );

    if (!embedCodeLabel) {
      embedCodeLabel = document.createElement("div");
      embedCodeLabel.classList.add(styles.embedCodeLabel);
      embedCodeLabel.classList.add(styles.barLabel);
      embedCodeLabel.innerHTML = "Embed code";
      this.wrapper.appendChild(embedCodeLabel);
    }

    if (!embedCode) {
      embedCode = document.createElement("textarea");
      embedCode.value = this.data.embedCode || "";
      embedCode.classList.add(styles.embedCode);
      embedCode.addEventListener("change", this.renderEmbedCode);
      embedCode.addEventListener("keyup", this.renderEmbedCode);
      this.wrapper.appendChild(embedCode);
    }

    if (!embedCodePreview) {
      embedCodePreview = document.createElement("div");
      embedCodePreview.classList.add(styles.embedPreview);

      embedCodePreview.innerHTML = embedCode.value;
      this.wrapper.appendChild(embedCodePreview);
    }

    embedCodePreview.innerHTML = embedCode.value;
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
    const content = blockContent.querySelector("." + styles.contentArea);
    const text = content ? content.innerHTML : "";

    const id = blockContent
      .querySelector("." + styles.idField)
      .getAttribute("data-id");

    const label = blockContent.querySelector(".label-field").textContent;

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
    const wrapper = document.createElement("div");
    wrapper.classList.add(styles.footnoteBlock);

    const footnoteId = document.createElement("div");
    footnoteId.classList.add(styles.idField);
    footnoteId.classList.add(styles.barLabel);
    footnoteId.setAttribute("data-id", this.data.id);
    footnoteId.setAttribute("contenteditable", "true");
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
    footnoteId.innerHTML = this.data.label ?? "-";
    wrapper.appendChild(footnoteId);

    const contentLabel = document.createElement("div");
    contentLabel.classList.add(styles.barLabel);
    contentLabel.innerHTML = "footnote body";
    wrapper.appendChild(contentLabel);

    const contentArea = document.createElement("div");
    contentArea.classList.add(styles.contentArea);
    contentArea.classList.add(styles.textInput);

    contentArea.classList.add("ce-paragraph");
    contentArea.innerHTML = this.data.text;
    contentArea.contentEditable = "true";
    wrapper.appendChild(contentArea);

    contentArea.addEventListener("keyup", this.onKeyUp);

    this.wrapper = wrapper;

    this.renderEmbedCode();

    return wrapper;
  }
}
