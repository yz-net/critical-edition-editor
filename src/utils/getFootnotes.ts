import { ParagraphBlockData } from '../CriticalEditionData';

export default function getFootnotes(data: ParagraphBlockData) {
  const temp = document.createElement('div');
  temp.innerHTML = data.text || '';
  const ret: Array<string> = [];

  const links = temp.getElementsByTagName('a');
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    const href = link.getAttribute('href') || '';

    if (href.startsWith('#')) {
      ret.push(href.slice(1));
    }
  }

  temp.remove();

  return ret;
}
