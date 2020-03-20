//Async try...catch function to get JSON data
async function getAPIData() {
  try {
    const response = await fetch("/Unit10/hotel.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//Isolate hotel data in JSON from extranious metadata
let hotelData = {};
getAPIData().then(data => (hotelData = data));

//Take hotel info and assign to needed DOM area
function hotelInfo(event) {
  let hotelChoice = hotelData.hotels.find(hotel => {
    return event.target.id === hotel.name.toLowerCase();
  });
  console.log(hotelChoice);
  let hotelName = document.querySelector("#hotelName");
  hotelName.textContent = `${hotelChoice.name} Hotel`;
  hotelName.style.textDecoration = "underline";
  document.querySelector("#address").textContent = hotelChoice.address;
  document.querySelector("#rooms").textContent = hotelChoice.rooms;
  document.querySelector("#gym").textContent = hotelChoice.gym;
  document.querySelector("#type").textContent = hotelChoice.roomTypes.toString().replace(/,/g, ", ");
  document.querySelector("#picture").src = `/Unit10/assets/${hotelChoice.picture}`;
}

//Attach a click listener all 'a' tags to pass/trigger hotelInfo function
let hotelClick = document.querySelectorAll("a");
hotelClick.forEach(hotel => {
  hotel.addEventListener("click", hotelInfo);
});
