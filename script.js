const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//Save selected movie data in local storage
function setMovieData(index, price){
	localStorage.setItem('index', index);
	localStorage.setItem('price', price)
}

function updateSelectedCount(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected');


	//copy selected seats into an arr
	//we will use spread operator it copies the elments of an array
	const seatsIndex = [...selectedSeats].map( (seat) => [...seats].indexOf(seat));
	// console.log(seatsIndex);
	// Now we need to store seatsIndex in local storage
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
	//Map through array

	// return new array



	// console.log(selectedSeats);
	// get the length of the node list
	const selectedSeatCount = selectedSeats.length;
	// console.log(selectedSeatCount);
	count.innerText = selectedSeatCount;
	total.innerText = selectedSeatCount * ticketPrice;
}

//this event gets triggered movie is selected
movieSelect.addEventListener('change', (e) => {
	ticketPrice  = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

//this eventlister gets called when you click on the seat
container.addEventListener('click', (e) => {
	if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ){
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});