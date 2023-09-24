const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm");
const errorMessage = document.querySelector(".errorMessage");

const inputs = [email, phone, password, confirmPassword]; //Array of inputs

//focusin - Runs when a focus event occurs on the element, or any elements inside it, if it's focused on
inputs.forEach((item) => {
  item.addEventListener("focusin", () => {
    errorMessage.textContent = ""; //If there's an error message we'll clear it
    item.classList.remove("error"); //Removes token(s) from list
    if (item == password || item == confirmPassword) {
      password.classList.remove("error");
      confirmPassword.classList.remove("error");
    }
  });
});

const submit = (e) => { //take in an event
  e.preventDefault(); //prevents page from being refreshed
  if (password.value !== confirmPassword.value) { //validate Passwords match
    password.classList.add("error");
    confirmPassword.classList.add("error");
    errorMessage.textContent = "Passwords do not match";
    return;
  }
  if (
    !phone.value.match( //validate phone number
        /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/ //See https://www.abstractapi.com/guides/validate-phone-number-javascript 
    )
  ) {
    phone.classList.add("error");
    errorMessage.textContent = "Phone number needs to be exactly 10 numbers";
    return;
  }
  if (password.value.length < 7) { //validate password
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to be at least 7 characters long.";
    return;
  }
  if (!password.value.match(/[A-Z]/)) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to have at least 1 upper case letter.";
    return;
  }
  if (!password.value.match(/\d+/g)) { // /\d+/g will match [123,456,7890123] See: 
    //https://stackoverflow.com/questions/38110419/is-there-a-difference-between-d-and-d#:~:text=%2F%5Cd%2B%2Fg%20will,which%20means%200%20or%20more.
    password.classList.add("error");
    errorMessage.textContent = "Password needs to have at least 1 number.";
    return;
  }
  errorMessage.textContent = "Form added successfully";
  setTimeout(() => { //Refresh page
    window.location.reload();
  }, 5000); //5k ms
};

const form = document.querySelector("form");
form.addEventListener("submit", submit);