// eventListeners();

// function eventListeners() {
// Instead of a regular function that is invoked as eventListeners
// I defined it as an IIFE

(function() {
  const ui = new UI();

  // pleloader
  window.addEventListener("load", () => {
    ui.hidePreloader();
  });

  // nav btn toggle
  document.querySelector(".navBtn").addEventListener("click", () => {
    ui.showNav();
  });

  //control the video
  document.querySelector(".video__switch").addEventListener("click", () => {
    ui.videoControls();
  });

  // submit the form
  document.querySelector(".drink-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector(".input-name").value;
    const lastName = document.querySelector(".input-lastName").value;
    const email = document.querySelector(".input-email").value;

    let value = ui.checkEmpty(name, lastName, email);
    let customer = new Customer(name, lastName, email);
    if (value) {
      ui.addCustomer(customer);
      ui.showFeedback("customer added to list", "success");
      ui.clearFields();
    } else {
      ui.showFeedback("some value are empty", "error");
    }
  });

  // show work modal
  document.querySelectorAll(".work-item__icon").forEach(item => {
    item.addEventListener("click", event => {
      ui.showModal(event);
    });
  });

  // close modal
  document.querySelector(".work-modal__close").addEventListener("click", () => {
    ui.closeModal();
  });
})();

// constructor function of UI
function UI() {}

// hide preloader
UI.prototype.hidePreloader = function() {
  document.querySelector(".preloader").style.display = "none";
};

// show nav
UI.prototype.showNav = function() {
  document.querySelector(".nav").classList.toggle("nav--show");
};

// play/pause
UI.prototype.videoControls = function() {
  let btn = document.querySelector(".video__switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video__item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video__item").play();
  }
};

// check for empty values
UI.prototype.checkEmpty = function(name, lastName, email) {
  let result;
  if (name === "" || lastName === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

// check if feedback true/false
UI.prototype.showFeedback = function(text, type) {
  let feedback = document.querySelector(".drink-form__feedback");
  if (type === "success") {
    feedback.classList.add("success");
    feedback.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    feedback.classList.add("error");
    feedback.innerText = text;
    this.removeAlert("error");
  }
};

// remove alert
UI.prototype.removeAlert = function(type) {
  setTimeout(function() {
    document.querySelector(".drink-form__feedback").classList.remove(type);
  }, 2000);
};

// add customer
UI.prototype.addCustomer = function(customer) {
  const img = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * img.length);
  const cardList = document.querySelector(".drink-card__list");
  const div = document.createElement("div");

  div.classList.add("person");

  div.innerHTML = `<img src="./img/person-${random}.jpeg" alt="person" class="person_thumbnail">
      <h4 class="person__name">${customer.name}</h4>
      <h4 class="person__last-name">${customer.lastName}</h4>`;
  cardList.appendChild(div);
};

//clear fields
UI.prototype.clearFields = function() {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastName").value = "";
  document.querySelector(".input-email").value = "";
};

// show modal
UI.prototype.showModal = function(event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item__icon")) {
    // let id = event.target.parentElement.dataset.id;

    const id = event.target.parentElement.getAttribute("data-id");
    console.log(id);

    const modal = document.querySelector(".work-modal");
    const modalItem = document.querySelector(".work-modal__item");

    modal.classList.add("work-modal--show");
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};

UI.prototype.closeModal = function() {
  document.querySelector(".work-modal").classList.remove("work-modal--show");
};

// function constructor
function Customer(name, lastName, email) {
  this.name = name;
  this.lastName = lastName;
  this.email = email;
}
