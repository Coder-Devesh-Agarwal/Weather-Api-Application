console.log("Client Side Javascript.");

/*fetch("http://localhost:3000/weather?address=delhi").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.address);
      console.log(data.weather_news);
    }
  });
});*/
const msgOne = document.querySelector("#location");
const msgTwo = document.querySelector("#info");
const search = document.querySelector("input");
const weForm = document.querySelector("form");
msgOne.textContent = "Enter A Location🎴";
weForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("testing!");
  const location = search.value;
  msgOne.textContent = "Loading weather...";
  msgTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgTwo.textContent = data.error;
      } else {
        const dat = data.address;
        msgOne.textContent = dat.toUpperCase();
        msgTwo.textContent = data.weather_news;
      }
    });
  });
});
