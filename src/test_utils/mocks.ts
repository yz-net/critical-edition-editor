export const fixMutedVideoBug = () => {
  Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: () => { },
  });
}

export function fixMissingScrollTo() {
  window.scrollTo = () => { }
}

export const doAllMocks = () => {
  fixMissingScrollTo();
  fixMutedVideoBug();
}