/* eslint-disable */
import Header from "@editorjs/header";

import styles from "./styles.module.scss";

export default class CustomHeader extends Header {
  constructor({
    data,
    config,
    api,
    readOnly,
  }: {
    data: any;
    config: any;
    api: any;
    readOnly: boolean;
  }) {
    super({ data, config, api, readOnly });
    this._CSS.wrapper = "title";
    /**
     * Main Block wrapper
     *
     * @type {HTMLElement}
     * @private
     */
    this._element = this.getTag();
  }

  renderSettings() {
    const settings: any[] = [
      // {
      //   icon: "Paragraph",
      //   onclick: () => {
      //     setParagraphType(reverseParagraphType(getParagraphType()));
      //     const currentBlock = this.api.blocks.getBlockByIndex(
      //       this.api.blocks.getCurrentBlockIndex(),
      //     );
      //     this.api.blocks.update(currentBlock.id);
      //   },
      // },
    ];
    const wrapper = document.createElement("div");

    settings.forEach((tune) => {
      let button = document.createElement("div");
      button.classList.add("cdx-settings-button");
      button.innerHTML = tune.icon;
      wrapper.appendChild(button);
      button.onclick = tune.onclick;
    });

    return wrapper;
  }

  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    const tag = super.getTag();
    tag.classList.add(styles.header);

    return tag;
  }
}
