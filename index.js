const rechargeOptionsArray = [
  {
    "text": "60 UC",
    "price": "₹75.00"
  },
  {
    "text": "300 + 25 UC",
    "price": "₹380.00"
  },
  {
    "text": "600 + 60 UC",
    "price": "₹750.00"
  },
  {
    "text": "1500 + 300 UC",
    "price": "₹1900.00"
  },
  {
    "text": "3000 + 850 UC",
    "price": "₹3800.00"
  },
  {
    "text": "6000 + 2100 UC",
    "price": "₹7500.00"
  }
];

let menuOpen = false;
var rechargeOption = "60 UC";
var paymentOption = "";
var userId = "";
var userEmail = "";
var amount = "75.00";

const menuIcon = document.querySelector(".menuIcon");
const menuDiv = document.querySelector("#menuDiv");
const allRechargeOptions = document.querySelectorAll(".rechargeOptionDiv");
const allPaymentOptions = document.querySelectorAll(".eachPaymentDiv");
const errorMessage = document.querySelectorAll(".errorMsg");
const userIdInput = document.querySelector(".userIdInput");
const emailInput = document.querySelector(".emailInput");
const idErrorElement = document.querySelector(".idError");
const emailErrorElement = document.querySelector(".emailError");
const rechargeAmountElements = document.querySelectorAll(".rechargeAmt");

function closeMenu() {
  if(menuOpen) {
    menuDiv.classList.remove("visibleMenuDiv");
    menuOpen = false;
  }
}

window.addEventListener("click", function(event) {
  closeMenu();
});

menuIcon.addEventListener("click", function(event) {
  if(!menuOpen) {
    menuDiv.classList.add("visibleMenuDiv");
    menuOpen = true;
    event.stopPropagation();
  }else {
    closeMenu();
  }
});

// to stop menu from closing if clicked on menu
// remove this code if you don't want this functionality
menuDiv.addEventListener("click", function(event) {
  event.stopPropagation();
});

allRechargeOptions.forEach((option) => {
  option.addEventListener("click", function(event) {
    // remove selected class from all elements
    [].forEach.call(allRechargeOptions, function(el) {
      el.classList.remove("rechargeOptionDivSelected");
    });
    
    const idValue = option.getAttribute("id");
    amount = rechargeOptionsArray.filter((recharge) => recharge.text === idValue).price;
    rechargeAmountElements.forEach(element => {
      element.innerHTML = amount;
    });
    document.getElementById(idValue).classList.add("rechargeOptionDivSelected");
    rechargeOption = idValue;
  });
});

allPaymentOptions.forEach((option) => {
  option.addEventListener("click", function(event) {
    // remove selected class from all elements
    [].forEach.call(allPaymentOptions, function(el) {
      el.classList.remove("selectedPaymentDiv");
      el.querySelector(".paymentSubtext").style.display = "none";
    });
    
    const idValue = option.getAttribute("id");
    paymentOption = idValue;
    document.getElementById(idValue).classList.add("selectedPaymentDiv");
    document.getElementById(idValue).querySelector(".paymentSubtext").style.display = "block";
    rechargeOption = idValue;
  });
});

function handleBuyButton() {
  userId = userIdInput.value;
  userEmail = emailInput.value;
  const idBlock = document.getElementById("userIdBlock");
  const emailBlock = document.getElementById("userEmailBlock");

  if(!userId) {
    idErrorElement.style.display = "block";
    idBlock.scrollIntoView();
    return;
  }else {
    idErrorElement.style.display = "none";
  }

  if(!userEmail) {
    emailErrorElement.style.display = "block";
    emailBlock.scrollIntoView();
    return;
  }else {
    emailErrorElement.style.display = "none";
  }

  window.open(`https://test.com?am=${amount.replace("₹", "")}&email=${userEmail}&mode=${paymentOption}`, "_blank")
}