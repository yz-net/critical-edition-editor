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
    const blockquote = wrapper?.querySelector(
      "div[data-paragraph-type='blockquote']",
    );

    return {
      icon: "P",
      label: !blockquote ? "Paragraph (active)" : "Paragraph",
      isDisabled: !blockquote,
      closeOnActivate: true,
      onActivate: blockquote
        ? () => {
            blockquote.setAttribute("data-paragraph-type", "paragraph");
            blockquote.classList.replace(styles.blockquote!, styles.paragraph!);
          }
        : null,
    };
  }
}
