/* eslint-disable */
export default class BlockTuneBlockquote {
  api: any;

  constructor({ api }: { api: any }) {
    this.api = api;
  }

  static get isTune() {
    return true;
  }

  render() {
    return {
      // icon: '<svg>...</svg>',
      label: "Blockquote",
      onActivate: () => {
        alert("TODO");
      },
    };
  }
}
