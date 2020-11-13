import DebugLogger from "./DebugLogger";

const logger = new DebugLogger("scrollToELementByID: ")
export default function scrollToElementByID(elementID: string, e?: Event) {
    const element = document.getElementById(elementID);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
        e?.preventDefault();
    } else {
        logger.warn("Trying to scroll to nonexistent element: " + elementID)
    }
}