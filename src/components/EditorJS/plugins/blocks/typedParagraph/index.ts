/* eslint-disable */
import Paragraph from "@editorjs/paragraph";
import { API, BlockToolData, EditorConfig } from "@editorjs/editorjs";

import styles from "./styles.module.scss";

export default class TypedParagraph extends Paragraph {
  constructor(opts: { data: BlockToolData; config: EditorConfig; api: API }) {
    const { data, config, api } = opts;
    super({ data, config, api });
    this.api = api;

    // if no paragraph type is set, set one
    if (!data.paragraphType) {
      this.data.paragraphType = "paragraph";
    }

    this.clear = this.clear.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.save = this.save.bind(this);
    this.render = this.render.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
  }

  static get sanitize() {
    return {
      url: true,
      sup: true,
      a: true,
    };
  }

  static get toolbox() {
    return {
      icon: "P",
      title: "Paragraph",
    };
  }

  clear() {
    console.log("Clearing");
    super.clear();
  }

  render() {
    const ret = super.render();
    ret.addEventListener("paste", (event: ClipboardEvent) => {
      if (!event.clipboardData) {
        return;
      }
      // TODO paste footnote marker?
      console.log("paste", event);
      console.log("paste data", event.clipboardData?.getData("text/html"));
      // console.log(event.clipboardData.getData("text/html"))

      let s = "";
      try {
        s = event.clipboardData?.getData("text/html");
        // console.log("Loaded text/html")
      } catch {
        console.log("Falling back to plain text");
        s = event.clipboardData?.getData("text/plain");
      }
      // s = s.replace(/<!--StartFragment-->([^<]*(?:<(?!!--(?:Start|End)Fragment-->)[^<]*)*)<!--EndFragment-->/g, '$1');
      // var arr = [s]
      if (s.indexOf("<!--StartFragment-->") < 0) {
        console.log("Not MS Word Content", s);
        return;
      }

      if (!window.confirm("Use MS Word super-pasting black magic?")) {
        return;
      }
      console.log("MS Word Content");
      event.preventDefault();

      var rx =
        /<!--StartFragment-->([^<]*(?:<(?!!--(?:Start|End)Fragment-->)[^<]*)*)<!--EndFragment-->/g;
      var arr = rx.exec(s);
      if (!arr) {
        return;
      }
      arr.forEach((item, index) => {
        console.log(`arr [${index + 1} / ${arr!.length}]: ${item}`);
      });

      ret.innerHTML = "";
      const tmp = document.createElement("div");
      tmp.innerHTML = s;
      const paragraphs = tmp.getElementsByTagName("p");
      for (let i = 0; i < paragraphs.length; i++) {
        const p = paragraphs.item(i);
        if (!p) {
          continue;
        }
        const isFootnote = p.classList.contains("MsoFootnoteText");
        const blockContent = this.api.sanitizer.clean(p.innerHTML, {
          i: true,
          a: { href: true },
          b: true,
        });

        let blockData: { text: string; id?: string; label?: string } = {
          text: blockContent,
        };

        let blockType = "paragraph";

        if (isFootnote) {
          const anchors = p.getElementsByTagName("a");
          if (anchors.length < 1) {
            console.log("ruh-roh no anchors found. can't get footnote id", p);
            continue;
          }
          const firstLink = anchors[0]!;

          // remove the reundent first link
          p.removeChild(firstLink);

          blockData["text"] = this.api.sanitizer.clean(p.innerHTML, {
            i: true,
            a: { href: true },
            b: true,
          });
          const footnoteID = firstLink.getAttribute("name") ?? "";
          const footnoteLabel = firstLink.innerText
            .replace("[", "")
            .replace("]", "")
            .trim();
          console.log("footnoteLabel Text", footnoteLabel);
          blockType = "footnoteParagraph";
          blockData["id"] = footnoteID;
          blockData["label"] = footnoteLabel;
        }

        console.log("inserting parsed-paragraph", isFootnote, p);
        this.api.blocks.insert(blockType, blockData);
      }

      // if (s && s.length > 0) {
      // console.log('arr.length', arr.length, 'arr[1]', arr[1])
      // ret.innerHTML = arr[1]
      const cleaned = this.api.sanitizer.clean(s, {
        i: true,
        a: { href: true, name: true },
        b: true,
        p: {},
      });

      console.log("cleaned", cleaned);
      // ret.innerHTML = cleaned
    });

    // const currentParagraphType: ParagraphType = this._data.paragraphType === "paragraph" ? "paragraph" : "blockquote"
    // console.log("currentParagraphType", this.data.paragraphType);
    const currentParagraphType = this.data.paragraphType || "paragraph";
    // const currentParagraphType = "paragraph"

    // console.log("154: currentParagraphType:", currentParagraphType)
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-paragraph-type", currentParagraphType);
    if (currentParagraphType === "blockquote") {
      wrapper.classList.add(styles.blockquote!);
    } else if (currentParagraphType === "paragraph") {
      wrapper.classList.add(styles.paragraph!);
    }

    // wrapper.oninput = (e) => {
    //   const footnoteButton = document.querySelector(
    //     'button[id="footnote-button"]',
    //   );
    //   console.log("INPUT", footnoteButton);
    //   if (footnoteButton) {
    //     footnoteButton.remove();
    //   }
    // };
    // document.onclick = (e) => {
    //   console.log("ONCLICK", e.target);
    //   if (e.target !== wrapper) {
    //     document.querySelector('button[id="footnote-button"]')?.remove();
    //   }
    // };
    // wrapper.onclick = (e) => {
    //   const target = e.target;
    //   let footnoteButton = document.querySelector(
    //     'button[id="footnote-button"]',
    //   );
    //   if (footnoteButton) {
    //     footnoteButton.remove();
    //   }

    //   if ((target as Element)?.parentElement?.nodeName === "SUP") {
    //     return;
    //   }
    //   const selection = window.getSelection();
    //   if (selection && selection.anchorOffset !== selection.focusOffset) {
    //     return;
    //   }

    //   footnoteButton = document.createElement("button");
    //   footnoteButton.setAttribute("id", "footnote-button");
    //   footnoteButton.setAttribute(
    //     "style",
    //     `
    //       position: fixed;
    //       z-index: 50;
    //       width: 50px;
    //       height: 50px;
    //       left:${e.clientX}px;
    //       top: ${e.clientY + 20}px;
    //       background-color: white;
    //       border-radius: 5px;
    //       border: 1px solid #e8e8e8;
    //     `,
    //   );
    //   (footnoteButton as HTMLElement).onclick = (e) => {
    //     alert("AYO", e.target);
    //   };
    //   footnoteButton.innerHTML = "F";
    //   document.body.appendChild(footnoteButton);
    // };

    const footnotes: HTMLElement[] = ret.querySelectorAll("sup");
    footnotes.forEach((footnote) => {
      footnote.onclick = () => {
        const range = document.createRange();
        range.selectNodeContents(footnote);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        this.api.selection.expandToTag(footnote);
      };
    });

    this.wrapper = wrapper;
    wrapper.appendChild(ret);
    return wrapper;
  }

  renderSettings() {
    // const getParagraphType = (): ParagraphType => {
    //   const paragraphTypeAttribute = this.wrapper.getAttribute(
    //     "data-paragraph-type",
    //   );
    //   return paragraphTypeAttribute === "paragraph"
    //     ? "paragraph"
    //     : "blockquote";
    // };

    // const reverseParagraphType = (p: ParagraphType): ParagraphType => {
    //   return p === "paragraph" ? "blockquote" : "paragraph";
    // };

    // const setParagraphType = (newParagraphType: ParagraphType) => {
    //   this.wrapper.setAttribute("data-paragraph-type", newParagraphType);
    //   // toggleTypeButton.innerHTML = newParagraphType === "paragraph" ? "P" : "B"
    // };

    const settings = [
      {
        icon: "Typed Paragraph",
        onclick: () => {
          // setParagraphType(reverseParagraphType(getParagraphType()));
          // const currentBlock = this.api.blocks.getBlockByIndex(
          //   this.api.blocks.getCurrentBlockIndex(),
          // );
          // this.api.blocks.update(currentBlock.id);
        },
      },
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

  save(blockContent: BlockToolData) {
    const innerBlock = blockContent.querySelector(".ce-paragraph");
    const paragraphType = blockContent.getAttribute("data-paragraph-type");

    const pattern = /<sup[^>]*>(<a[^>]*><\/a>)*<\/sup>/g;
    const text = innerBlock.innerHTML.replace(pattern, "");

    return {
      paragraphType,
      // ...ret,
      text,
    };
  }
}
