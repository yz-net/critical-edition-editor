// @ts-ignore
import CheckList from "@editorjs/checklist";
// @ts-ignore
import Code from "@editorjs/code";
// @ts-ignore
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import Embed from "@editorjs/embed";
// @ts-ignore
import Image from "@editorjs/image";
// @ts-ignore
import InlineCode from "@editorjs/inline-code";
// @ts-ignore
import Link from "@editorjs/link";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Quote from "@editorjs/quote";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import {
  Footnote,
  FootnoteMaker,
} from "~/components/EditorJS/plugins/footnote-jake";

export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  paragraph: Paragraph,
  checklist: CheckList,
  embed: Embed,
  image: Image,
  inlineCode: InlineCode,
  link: Link,
  list: List,
  quote: Quote,
  simpleImage: SimpleImage,
  delimiter: Delimiter,
  FootnoteMaker,
  footnoteParagraph: Footnote,
  // footnoteParagraph: {
  //   class: Footnote,
  //   inlineToolbar: ["link", "bold", "italic"], // don't allow footnotes to add footnotes
  // }
};
