const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

function calculate() {
  const currOne = currencyOne.value;
  const currTwo = currencyTwo.value;
  console.log(currOne);
  fetch(`https://api.exchangerate-api.com/v4/latest/${currOne}`)
    .then((res) => res.json())
    .then((data) => {
      var rate = data.rates[currTwo];
      var oneValue = (rate * amountOne.value).toFixed(2);
      amountTwo.placeholder = `${oneValue}`;
    });
}
function swapCur() {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
}

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", swapCur);
