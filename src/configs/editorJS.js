// @ts-nocheck
// import CheckList from "@editorjs/checklist";
// import Code from "@editorjs/code";
// import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
// import Link from "@editorjs/link";
import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import SimpleImage from "@editorjs/simple-image";
// import Paragraph from "@editorjs/paragraph";
// import Header from "@editorjs/header";

import FootnoteMaker from "~/components/EditorJS/plugins/inline/footenoteMaker";
import Footnote from "~/components/EditorJS/plugins/blocks/footnote";
import TypedParagraph from "~/components/EditorJS/plugins/blocks/typedParagraph";
import BlockTuneBlockquote from "~/components/EditorJS/plugins/tunes/blockquote";
import CustomHeader from "~/components/EditorJS/plugins/blocks/header";
import BlockTuneParagraph from "~/components/EditorJS/plugins/tunes/paragraph";

export const EDITOR_TOOLS = {
  // code: Code,
  header: CustomHeader,
  // paragraph: { class: Paragraph, inlineToolbar: ["bold", "italic"] },
  // checklist: CheckList,
  embed: { class: Embed, inlineToolbar: true },
  image: Image,
  inlineCode: InlineCode,
  // link: Link,
  list: List,
  // quote: Quote,
  // simpleImage: SimpleImage,
  // delimiter: Delimiter,
  footnoteParagraph: {
    class: Footnote,
    inlineToolbar: ["link", "bold", "italic"], // don't allow footnotes to add footnotes
  },
  paragraph: {
    // class: Paragraph,
    class: TypedParagraph,
    inlineToolbar: ["link", "bold", "italic", "inlineToolFootnoteMaker"],
    tunes: ["blockTuneBlockquote", "blockTuneParagraph"],
  },
  inlineToolFootnoteMaker: FootnoteMaker,
  blockTuneBlockquote: BlockTuneBlockquote,
  blockTuneParagraph: BlockTuneParagraph,
};
