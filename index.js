// File input field
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  printFileElements(file);
});

// File Drop
const dropArea = document.defaultView;
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const file = event.dataTransfer.files[0];
  printFileElements(file);
});
// Prevent default drag and drop behavior
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

const printFileElements = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);

  reader.addEventListener("load", () => {
    // let data = reader.result.split("\n");h
    const fileLinks = extractLinks(reader.result);
    fileLinks.forEach((message) => {
      const newElement = document.createElement("li");
      createLink(newElement, message);
      const fullChat = document.getElementById("full-chat");
      fullChat.appendChild(newElement);
    });
  });
};

const createLink = (element, message) => {
  const a = document.createElement("a");
  const linkText = document.createTextNode(message);
  a.appendChild(linkText);
  a.href = message;
  element.appendChild(a);
};

function extractLinks(text) {
  const urlRegex =
    /([http]?s?:?\/?\/?[www]?\.?[^\s]+\.(com|org|edu|gov|uk|net|ca|de|jp|fr|au|us|ru|ch|it|nl|se|no|es|mil)[^\s]*)/gi;
  return text.match(urlRegex);
}

const csvDownload = () => {
  const csvButtonEl = document.querySelector("csv-download");
  csvButtonEl.addEventListener("click", () => {
    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
  });
};
