/* eslint-disable */

import styles from "~/components/EditorJS/plugins/blocks/typedParagraph/styles.module.scss";

export default class BlockTuneBlockquote {
  api: any;
  block: any;

  constructor({ api, block }: any) {
    this.api = api;
    this.block = block;
  }

  static get isTune() {
    return true;
  }

  render() {
    const wrapper = document.querySelector(`div[data-id="${this.block.id}"]`);
    const paragraph = wrapper?.querySelector(
      "div[data-paragraph-type='paragraph']",
    );

    return {
      icon: "B",
      label: !paragraph ? "Blockquote (active)" : "Blockquote",
      isDisabled: !paragraph,
      closeOnActivate: true,
      onActivate: paragraph
        ? () => {
            paragraph.setAttribute("data-paragraph-type", "blockquote");
            paragraph.classList.replace(styles.paragraph!, styles.blockquote!);
          }
        : null,
    };
  }
}
