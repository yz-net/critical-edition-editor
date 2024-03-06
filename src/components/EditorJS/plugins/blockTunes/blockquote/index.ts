export default class BlockTuneBlockquote {
  constructor({ api }) {
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
