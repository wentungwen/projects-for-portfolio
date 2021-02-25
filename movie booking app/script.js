const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const selected_movie = document.getElementById("movie");
let selected_ticket_price = +document.getElementById("movie").value;

populateUI();

// seat event
seats.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.toggle("selected");
    update_movie_count();
  });
});

// movie event
selected_movie.addEventListener("change", (e) => {
  selected_ticket_price = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  update_movie_count();
});

// set movie in local
function setMovieData(movieIndex, movieValue) {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("movieValue", movieValue);
}

function update_movie_count() {
  const selectedSeats = document.querySelectorAll(".selected.seat");
  const selectedIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));

  count.innerText = `${selectedSeats.length - 1}`;
  total.innerText = `${selected_ticket_price * (selectedSeats.length - 1)}`;
}

// 從local拿資料並populate
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, idx) => {
      if (selectedSeats.indexOf(idx) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("movieIndex");
  if (selectedSeats !== null) {
    selected_movie.selectedIndex = selectedMovieIndex;
  }
}

//初始化count total
update_movie_count();
