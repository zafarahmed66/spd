export const removeBorder = () => {
  const element = document.querySelector(".selected");

  if (element) {
    element.classList.remove("selected");
  }
};
