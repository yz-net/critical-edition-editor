function setFocusOnFootnote(element: HTMLElement) {
  const footnotes = document.getElementsByClassName(
    'blocktype-footnoteParagraph'
  );

  for (let i = 0; i < footnotes.length; i += 1) {
    const item = footnotes.item(i);
    item?.classList.add('hidden');
  }

  if (element) {
    element.classList.remove('hidden');
    element.focus();
  }
}

export function jumpToNeighboringFootnote(elementID: string, e?: Event) {
  e?.preventDefault();
  const element = document.getElementById(elementID);
  if (!element) {
    return;
  }
  setFocusOnFootnote(element);

  // element.scrollIntoView({ block: "start", behavior: "smooth" });

  // Update the page hash
  window.location.hash = `#${elementID}`;
}

export default function scrollToElementByID(
  elementID: string,
  e?: Event,
  options: ScrollIntoViewOptions = {}
) {
  e?.preventDefault();
  const element = document.getElementById(elementID);
  if (!element) {
    return;
  }
  setFocusOnFootnote(element);

  element.scrollIntoView({ block: 'start', behavior: 'smooth', ...options });

  // Update the page hash
  setTimeout(() => {
    window.location.hash = `#${elementID}`;
  }, 200);
}
