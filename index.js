let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let loggedInUser = null;

// Function to generate a random account number
function generateAccountNumber() {
  return Math.floor(Math.random() * 1000000000);
}

// Function to save user data to local storage
function saveUserData() {
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
}

// Function to load user data from local storage
function loadUserData() {
  const userData = localStorage.getItem("loggedInUser");
  if (userData) {
    loggedInUser = JSON.parse(userData);
    updateUIAfterLogin();
  }
}
// Function to create an account
function createAccount() {
  const accountNumber = generateAccountNumber();
  const initialBalance = Math.floor(Math.random() * 10000);
  loggedInUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    accountNumber: accountNumber,
    balance: initialBalance,
  };
  saveUserData();
  alert(
    "Account created successfully! Your account number is: " + accountNumber
  );
}
// Function to handle the signup button click
signupBtn.onclick = function () {
  createAccount();
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};

// Function to handle the signin button click
signinBtn.onclick = function () {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (
    loggedInUser &&
    loggedInUser.email === email &&
    loggedInUser.password === password
  ) {
    alert("Login successful!");
    updateUIAfterLogin();
  } else {
    alert("Invalid email or password!");
  }
};

// Function to update the UI after successful login
function updateUIAfterLogin() {
  // Hide the signup form
  document.querySelector(".form-box").style.display = "none";

  // Create elements for account details and actions
  const accountDetails = document.createElement("div");
  accountDetails.innerHTML = `
      <h2>Welcome, ${loggedInUser.name}!</h2>
      <p>Account Number: ${loggedInUser.accountNumber}</p>
      <p>Balance: $${loggedInUser.balance}</p>
    `;
  document.querySelector(".container").appendChild(accountDetails);
  const actions = document.createElement("div");
  actions.innerHTML = `
      <h3>Actions:</h3>
      <button onclick="depositMoney()">Deposit Money</button>
      <button onclick="withdrawMoney()">Withdraw Money</button>
      <button onclick="transferMoney()">Transfer Money</button>
      <button onclick="buyRechargeCard()">Buy Recharge Card</button>
      <button onclick="deleteAccount()">Delete Account</button>
      <button onclick="logout()">Logout</button>
    `;
  document.querySelector(".container").appendChild(actions);
}

// Function to deposit money
function depositMoney() {
  const amount = parseFloat(prompt("Enter the amount to deposit:"));
  if (!isNaN(amount) && amount > 0) {
    loggedInUser.balance += amount;
    saveUserData();
    alert("Money deposited successfully!");
    updateUIAfterLogin();
  } else {
    alert("Invalid amount!");
  }
}

// Function to withdraw money
function withdrawMoney() {
  const amount = parseFloat(prompt("Enter the amount to withdraw:"));
  if (!isNaN(amount) && amount > 0 && amount <= loggedInUser.balance) {
    loggedInUser.balance -= amount;
    saveUserData();
    alert("Money withdrawn successfully!");
    updateUIAfterLogin();
  } else {
    alert("Invalid amount or insufficient balance!");
  }
}
// Function to transfer money
function transferMoney() {
  const amount = parseFloat(prompt("Enter the amount to transfer:"));
  const accountNumber = parseInt(
    prompt("Enter the recipient's account number:")
  );
  if (!isNaN(amount) && amount > 0 && accountNumber) {
    // Perform transfer logic
    // You can implement the transfer logic as per your requirements (e.g., checking recipient's account, deducting amount from sender's account, etc.)
    alert(
      `Successfully transferred $${amount} to account number ${accountNumber}!`
    );
    updateUIAfterLogin();
  } else {
    alert("Invalid amount or account number!");
  }
}

// Function to buy recharge card
function buyRechargeCard() {
  // Implement recharge card functionality as per your requirements
  alert("Recharge card functionality coming soon!");
}
// Function to delete account
function deleteAccount() {
  if (confirm("Are you sure you want to delete your account?")) {
    localStorage.removeItem("loggedInUser");
    loggedInUser = null;
    alert("Account deleted successfully!");
    location.reload();
  }
}

// Function to logout
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedInUser");
    loggedInUser = null;
    location.reload();
  }
}
// Load user data from local storage on page load
loadUserData();

/*signinBtn.onclick = function () {
  nameField.style.maxHeight = "0";
  title.innerHTML = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
};

signupBtn.onclick = function () {
  nameField.style.maxHeight = "60px";
  title.innerHTML = "Sign up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
};*/
