import { requestHotelData } from "../../utils/request.js";
import { filterHotels } from "../filter.js";

const cardContainer = document.getElementById("HotelsContainer");

let isInside = false;

const rotateCardFront = (card) => {
	card.classList.toggle("rotationFront");
};
const rotateCardBack = (card) => {
	card.classList.toggle("rotationBack");
};

export const renderCards = async () => {
	cardContainer.innerHTML = "";

	const hotelsData = await requestHotelData();
	const hotelsFilters = filterHotels(hotelsData);

	const selectPrice = (value) => {
		switch (value) {
			case 1:
				return "$";
				break;
			case 2:
				return "$$";
				break;
			case 3:
				return "$$$";
				break;
			case 4:
				return "$$$$";
				break;

			default:
				break;
		}
	};

	hotelsFilters.forEach((element, index) => {
		cardContainer.innerHTML += `
		<div class="flip-card-container">
		<div class="flip-card-front inner">
			<h2 class="HotelCard__title">${element.name}</h2>
			<section class="HotelCard__info" id="HotelCard__info">
				<h3 class="hotelCard__countryName">${element.country}</h3>
				<p class="hotelCard__rooms-prices">${element.rooms} rooms - <span>${selectPrice(
			element.price
		)}</span></p>
			</section>
			<button class="HotelCard__reserva" id="HotelCard__reserva">
				Book it!
			</button>
		</div>
		<!-- FACE-BACK CARD -->
		<div class="flip-card-back inner">
			<p class="hotelCard__about">
				${element.description}
				</p>
				<div class="HotelCard__info-back" id="HotelCard__info">
					<h3 class="hotelCard__countryName">${element.country}</h3>
					<p class="hotelCard__rooms-prices">${element.rooms} rooms - <span>${selectPrice(
			element.price
		)}</span></p>
					
			</div>
				
				<button class="HotelCard__reserva-back" id="HotelCard__reserva">
				Book it!
				</button>
			</div>
		</div>
		`;
		document.getElementsByClassName("flip-card-front")[
			hotelsFilters.indexOf(element)
		].style.backgroundImage = `url(${element.photo})`;

		document.getElementsByClassName("flip-card-back")[
			hotelsFilters.indexOf(element)
		].style.backgroundImage = `url(${element.photo})`;

		const cardsFront = [
			...document.getElementsByClassName("flip-card-container"),
		];
		cardsFront.map((card) => {
			card.addEventListener("mouseover", () => {
				if (!isInside) {
					isInside = true;
					rotateCardFront(card);
					rotateCardBack(card);
				}
			});
			card.addEventListener("mouseout", () => {
				if (isInside) {
					isInside = false;
					rotateCardFront(card);
					rotateCardBack(card);
				}
			});
			// card.addEventListener("mouseover", () => {
			//   rotateCardFront(card);
			// });
		});

		// const cardsBack = [...document.getElementsByClassName("flip-card-back")];
		// cardsBack.map((card) => {
		//   card.addEventListener("mouseenter", () => {
		//     rotateCardBack(card);
		//   });
		//   // card.addEventListener("mouseover", () => {
		//   //   rotateCardBack(card);
		//   // });
		// });

		// console.log(
		//   (document.getElementsByClassName("flip-card-back")[
		//     hotelsData.indexOf(element)
		//   ].style.backgroundImage = url(${element.photo}))
		// );
	});
};
