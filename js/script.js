var siteNameInput = document.getElementById("sitename");
var siteUrlInput = document.getElementById("siteurl");
var sbmitBtn = document.getElementById("sbmtBtn");
var closeBtn = document.getElementById("closeBtn");
var errorCard = document.querySelector(".errorCard");

var bookmarksList = [];
if (localStorage.getItem("bookmarks") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks")); //bn parse 3shan hwa b2a string ta7t, 3ayzen nshel el string da
  displayList();
}
console.log(siteNameInput.value);

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

sbmitBtn.addEventListener("click", function () {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid")
  ) {
    //1- create bookmark
    var bookmark = {
      name: capitalizeFirstLetter(siteNameInput.value),
      url: siteUrlInput.value,
    };

    //2- push bookmark to list
    bookmarksList.push(bookmark);
    //3- set bookmark list at local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));

    //4- clear input
    clearInput();

    //5- display list
    displayList();
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
  } else {
    errorCard.classList.remove("d-none");
  }
});
function clearInput() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
function displayList() {
  var cartona = ``;
  for (var i = 0; i < bookmarksList.length; i++) {
    cartona += `<tr><td>${i + 1}</td>
          <td>${bookmarksList[i].name}</td>
          <td><button class="visitBtn" onclick="window.open('${
            bookmarksList[i].url
          }');">
          <i class="fa-solid fa-eye pe-1"></i>
          Visit
          </button></td>
          <td>
          <button onclick="deleteProduct(${i})" class="deleteBtn">
          <i class="fa-solid fa-trash-can pe-1"></i>
          Delete
          </button></td></tr>
        `;
  }
  document.getElementById("tBody").innerHTML = cartona;
}
function deleteProduct(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  displayList();
}

var urlRegularExp = new RegExp(
  "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
);
var nameRegularExp = new RegExp(".{3,}");

function validate(check, regex) {
  // var testRegex = regex;
  if (regex.test(check.value)) {
    check.classList.add("is-valid");
    check.classList.remove("is-invalid");
  } else {
    check.classList.add("is-invalid");
    check.classList.remove("is-valid");
  }
}
siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegularExp);
});

siteUrlInput.addEventListener("input", function () {
  validate(siteUrlInput, urlRegularExp);
});

//! close the error card
function closeCard() {
  errorCard.classList.add("d-none");
}
//close the card by clicking on x icon
closeBtn.addEventListener("click", function () {
  closeCard();
});
//close the card by clicking outside the card
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("errorCard")) { //to close only if the target now is the card
    closeCard();
  }
});
