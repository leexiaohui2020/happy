// eslint-disable-next-line import/prefer-default-export
export function scrollTo(parent, selector, horizontal) {
  const child = parent.querySelector(selector);
  console.info(child);
  if (child) {
    if (horizontal) {
      parent.scrollTo(child.offsetLeft, parent.scrollTop);
    } else {
      parent.scrollTo(parent.scrollLeft, child.offsetTop);
    }
  }
}
