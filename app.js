// Hello world
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Function to update the date and time display
  function updateDateTime() {
      const now = new Date(); // Get the current date and time
      
      // Format the date as Day, YYYY-MM-DD
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = days[now.getDay()]; // Get the day name (e.g., "Monday")
      const year = now.getFullYear(); // Get the full year
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero
      const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with leading zero
      const formattedDate = `${ dayName}, ${day}-${month}-${year }`; // Format date with day name
      
      // Format the time as HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0'); // Get hours and pad with leading zero
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero
      const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds and pad with leading zero
      const formattedTime = `${hours}:${minutes}:${seconds}`; // Format time
      
      // Set the text content of the date and clock elements
      document.getElementById('date').textContent = formattedDate; // Update date display
      document.getElementById('clock').textContent = formattedTime; // Update time display
  }

  updateDateTime(); // Call the function immediately to display the correct date and time right away
  setInterval(updateDateTime, 1000); // Update the date and time every second (1000 milliseconds)
});

//End........


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
   
    if (select.name === "from" && currCode === "SAR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateExchangeRate = async () => {
  const amtVal = document.querySelector(".amount input").value || 1;
  const fromCurrency = fromCurr.value;
  const toCurrency = toCurr.value;
  // If else for if cus type 0 or - value it will be default 1
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
   //up 
//    if (fromCurr === toCurr) {
//     // Iterate over the target currency options
//     for (let i = 0; i < toCurrSelect.options.length; i++) {
//         const option = toCurrSelect.options[i];
//         if (option.value !== fromCurr) {
//           toCurrSelect.value = option.value;
//             break;
//         }
//     }
// }
  //down
  const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amtVal}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '81c1d4594emsh03b8588e8bebdbbp1f28d2jsn48b81f313a44', // Replace with your API key
        'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
      }
    });
    const { result: finalAmount } = await response.json();
    msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
  } catch (error) {
    msg.innerText = "Error fetching the exchange rate.";
  }
};
	
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});