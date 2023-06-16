let createButton = document.getElementById("createButton");
let modalContainer = document.getElementById("modal-container");
let closeModalIcon = document.getElementById("close-modal");
let modalForm = document.getElementById("modal-form");
let inputHeading = document.getElementById("heading");
let mainInputBox = document.getElementById("textarea");
let resourcesSection = document.getElementById("resources-section");

function revealModalContainer() {
  modalContainer.classList.remove("modal-container");
  modalContainer.classList.add("modal-container-visible");
  inputHeading.focus();
}

createButton.addEventListener("click", revealModalContainer);

function closeBackModalContainer() {
  if (modalContainer.classList.contains("modal-container-visible")) {
    modalContainer.classList.remove("modal-container-visible");
    modalContainer.classList.add("modal-container");
  }
}

closeModalIcon.addEventListener("click", closeBackModalContainer);

let resources = [];

function printResourcesOnUI() {
  resourcesSection.textContent = "";

  resources.forEach(function (resource) {
    let printinputHeading = resource.inputHeading;
    let printmainInputBox = resource.mainInputBox;

    let resourceDiv = document.createElement("div");
    resourceDiv.classList.add("resource");

    let nameOfHeadingDiv = document.createElement("div");
    nameOfHeadingDiv.classList.add("name-of-website");

    let nameOfHeadingText = document.createElement("h3");
    nameOfHeadingText.textContent = printinputHeading;
    nameOfHeadingText.addEventListener("click", function () {
      revealEditModal(printinputHeading, printmainInputBox);
    });

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.addEventListener("click", function () {
      deleteResource(printinputHeading);
    });

    let mainNoteDiv = document.createElement("div");
    mainNoteDiv.classList.add("description-of-website");

    let mainNote = document.createElement("p");
    mainNote.textContent = printmainInputBox;


    mainNoteDiv.append(mainNote);
    nameOfHeadingDiv.append(nameOfHeadingText, deleteIcon);
    resourceDiv.append(nameOfHeadingDiv, mainNoteDiv);
    resourcesSection.append(resourceDiv);
  });
}

function revealEditModal(heading, mainInput) {
  inputHeading.value = heading;
  mainInputBox.value = mainInput;
  revealModalContainer();
}

function deleteResource(printinputHeading) {
  const index = resources.findIndex(
    (resource) => resource.inputHeading === printinputHeading
  );

  if (index !== -1) {
    resources.splice(index, 1);
    localStorage.setItem("myResource", JSON.stringify(resources));
    printResourcesOnUI();
  }
}


function editResource(printinputHeading) {
    let resourceToEdit;
  
    resources.forEach(resource => {
      if (resource.inputHeading === printinputHeading) {
        resourceToEdit = resource;
      }
    });
  
    if (resourceToEdit) {
      inputHeading.value = resourceToEdit.inputHeading;
      mainInputBox.value = resourceToEdit.mainInput;
  
      deleteResource();
    }
  }
  

function fetchResources() {
  if (localStorage.getItem("myResource")) {
    resources = JSON.parse(localStorage.getItem("myResource"));
  }
  printResourcesOnUI();
}
fetchResources();

modalForm.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();
  let heading = inputHeading.value;
  let mainInput = mainInputBox.value;

  const existingResource = resources.find(
    (resource) => resource.inputHeading === heading
  );

  if (existingResource) {
    existingResource.mainInputBox = mainInput;
  } else {
    const aCreatedResource = {
      inputHeading: heading,
      mainInputBox: mainInput,
    };

    resources.push(aCreatedResource);
  }

  localStorage.setItem("myResource", JSON.stringify(resources));
  fetch

  modalForm.reset();
  closeBackModalContainer();
}
