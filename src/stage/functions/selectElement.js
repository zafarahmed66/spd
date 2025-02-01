const selectElement = (element) => {
  const prevSelectedElement = document.querySelector(".delete-mark");
  if (prevSelectedElement !== null) {
    prevSelectedElement.classList.remove("selected", "delete-mark");
  }
  if(element.id.includes("tr-")){
    document.getElementById("add-input-button").innerText = "Modify Input";
  }else {
    document.getElementById("add-input-button").innerText = "Add Input";
  }

  element.classList.add("delete-mark");

  if (element.classList.contains("text-mark")) return;

  element.classList.add("selected");
};

export default selectElement;

