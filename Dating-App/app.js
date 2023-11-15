/// Selectors

const userList = document.querySelector(".users");
const chatHeader = document.querySelector(".chat-head");
const chatBody = document.querySelector(".chat-body");
const leftMessage = document.querySelector(".sent-left");
const rightMessage = document.querySelector(".sent-right");
const messageInput = document.querySelector(".write-message");
const chatForm = document.querySelector(".chat-write");
const registrationForm = document.querySelector(".reg-form");
const userCount = document.querySelector(".numberUsers");
const returnButton = document.querySelector(".return");
const registrationFormm = document.querySelector(".reg-form");
const volumeImages = document.querySelectorAll(".volImg");
const volumeButton = document.querySelector(".volBtn");
const messageElements = document.querySelectorAll(".messages");

// Variables

let selectedUser = null;
const nameRegex = /^[A-Za-z -]{2,}$/;
const countryRegex = /^[A-Za-z -]{2,}$/;
const ageRegex = /^[1-9][0-9]*$/;

let userListData = [];

// Functions

function refreshOnlineUsers() {
  userList.innerHTML = "";
  const userData = JSON.parse(localStorage.getItem("usersData"));
  userData &&
    userData.forEach((user) => {
      userList.innerHTML += `<li ondblclick="deleteElement(${user.id})" onclick="selectUser(${user.id})" data-id='${user.id}' class="user">
    <span class="circle"></span><span class="${user.gender}">${user.name} ${user.age}</span
    ><span class="flag">${user.country}</span>
  </li>`;
    });
  userData && (userCount.textContent = `Online users (${userData.length})`);
}

const selectUser = (id) => {
  const userData = JSON.parse(localStorage.getItem("usersData"));

  userData.forEach((user) => {
    if (user.id === id) {
      selectedUser = user;
      chatForm.classList.remove("dNone");
      chatHeader.classList.remove("dNone");
      chatBody.classList.remove("dNone");
    }
  });
  displaySelectedUser();
  leftMessage.addEventListener("click", addLeftMessage);
  rightMessage.addEventListener("click", addRightMessage);
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

function displaySelectedUser() {
  chatHeader.innerHTML = `
  <a href="index.html">X</a>
  <h1 class='${selectedUser.gender}'>${selectedUser.name}</h1>
  <span>${selectedUser.age} years old ${selectedUser.country}</span>`;
  chatBody.innerHTML = "";
  selectedUser.message.forEach((message) => {
    if (message.left) {
      chatBody.innerHTML += `<div class="left-message message">
                <img src="" alt="" />
                <p>${message.left}
                <span class="date">${message.time}</span>
                </p>
                <h3></h3>
              </div>`;
    }
    if (message.right) {
      chatBody.innerHTML += `
                <div class="right-message message">
                <h3></h3>
                <p>${message.right}
                <span class="date">${message.time}</span>
                </p>
                <img src="" alt="" />
              </div>`;
    }
  });
}

const addLeftMessage = () => {
  const date = new Date();
  const newMessage = {
    left: messageInput.value,
    time: date.getHours() + ":" + date.getMinutes(),
  };

  let userData = JSON.parse(localStorage.getItem("usersData"));
  userData.forEach((user) => {
    if (user.id === selectedUser.id) {
      user.message.push(newMessage);
    }
  });
  localStorage.setItem("usersData", JSON.stringify(userData));
  selectedUser.message.push(newMessage);
  displaySelectedUser();
  messageInput.textContent = "";
};

const addRightMessage = () => {
  const date = new Date();
  const newMessage = {
    right: messageInput.value,
    time: date.getHours() + ":" + date.getMinutes(),
  };

  let userData = JSON.parse(localStorage.getItem("usersData"));
  userData.forEach((user) => {
    if (user.id === selectedUser.id) {
      user.message.push(newMessage);
    }
  });
  localStorage.setItem("usersData", JSON.stringify(userData));
  selectedUser.message.push(newMessage);
  displaySelectedUser();
  messageInput.value = "";
};

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.querySelector(".name");
  const countryInput = document.querySelector(".country");
  const ageInput = document.querySelector(".age");
  const genderInput = document.querySelector('input[name="gender"]:checked');

  const name = nameInput.value;
  const country = countryInput.value.slice(0, 2);
  const age = ageInput.value;
  const gender = genderInput ? genderInput.value : "";
  let isValid = true;

  if (!nameRegex.test(name)) {
    nameInput.classList.add("invalid-input");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid-input");
  }

  if (!countryRegex.test(country)) {
    countryInput.classList.add("invalid-input");
    isValid = false;
  } else {
    countryInput.classList.remove("invalid-input");
  }

  if (!ageRegex.test(age)) {
    ageInput.classList.add("invalid-input");
    isValid = false;
  } else {
    ageInput.classList.remove("invalid-input");
  }

  if (!gender) {
    isValid = false;
  }

  if (!isValid) {
    alert("Please fill in all fields correctly.");
    return;
  }
  const date = new Date();

  let newUser = {
    id: date.getTime(),
    name: name,
    age: age,
    gender: gender,
    country: country,
    message: [],
  };

  if (localStorage.getItem("usersData")) {
    let userData = JSON.parse(localStorage.getItem("usersData"));
    userData.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(userData));
  } else {
    localStorage.setItem("usersData", JSON.stringify([newUser]));
  }
  refreshOnlineUsers();
});

function deleteElement(id) {
  let userData = JSON.parse(localStorage.getItem("usersData"));
  userData = userData.filter((user) => {
    return user.id !== id;
  });
  localStorage.setItem("usersData", JSON.stringify(userData));
  refreshOnlineUsers();
}
refreshOnlineUsers();

volumeButton.addEventListener("click", () => {
  console.log('sdf')
  volumeImages.forEach((img) => img.classList.toggle("dNone"));
});
