import DebugLogger from "./DebugLogger";

const logger = new DebugLogger("scrollToELementByID: ")
export default function scrollToElementByID(elementID: string, e?: Event) {
    const footnotes = document.getElementsByClassName("blocktype-footnoteParagraph")
    for (let i = 0; i < footnotes.length; i++) {
        const item = footnotes.item(i)
        item?.classList.add("hidden")
        // console.log("hiding", item)
    }

    const element = document.getElementById(elementID);
    if (element) {
        element.classList.remove("hidden");
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
        e?.preventDefault();

        // Update the page hash
        const location = window.location;
        window.location.hash = "#" + elementID;


    } else {
        logger.warn("Trying to scroll to nonexistent element: " + elementID)
    }
}