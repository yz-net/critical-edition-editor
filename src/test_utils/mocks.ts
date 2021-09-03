export const fixMutedVideoBug = () => {
  Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: () => { },
  });
}

export const fixMissingScrollTo = () =>
  window.scrollTo = () => { }

export const doAllMocks = () => {
  fixMissingScrollTo();
  fixMutedVideoBug();
}