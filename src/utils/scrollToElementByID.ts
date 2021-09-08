import DebugLogger from "./DebugLogger";

const logger = new DebugLogger("scrollToELementByID: ")
export default function scrollToElementByID(elementID: string, e?: Event, options: ScrollIntoViewOptions = {}) {

    e?.preventDefault();

    const footnotes = document.getElementsByClassName("blocktype-footnoteParagraph")
    for (let i = 0; i < footnotes.length; i += 1) {
        const item = footnotes.item(i)
        item?.classList.add("hidden")
    }

    const element = document.getElementById(elementID);
    if (element) {
        element.classList.remove("hidden");

        element.scrollIntoView({ block: "start", behavior: "smooth", ...options });
        element.focus();

        // Update the page hash
        setTimeout(() => { window.location.hash = `#${elementID}`; }, 200);


    } else {
        logger.warn(`Trying to scroll to nonexistent element: ${elementID}`, element)
    }
}