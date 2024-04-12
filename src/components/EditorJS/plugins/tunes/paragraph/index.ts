/* eslint-disable */

import styles from "~/components/EditorJS/plugins/blocks/typedParagraph/styles.module.scss";

export default class BlockTuneParagraph {
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
    const paragraph = wrapper?.querySelector("div[data-paragraph-type]");
    if (!paragraph) {
      return null;
    }

    return {
      icon: "P",
      label: "Transform to paragraph",
      onActivate: () => {
        paragraph.setAttribute("data-paragraph-type", "paragraph");
        paragraph.classList.replace(styles.blockquote!, styles.paragraph!);
      },
    };
  }
}
