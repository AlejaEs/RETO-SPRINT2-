const countryBox = document.getElementById("filter-paises");

export const filterHotels = (hotelsData) => {
	//console.log("hola");
	return hotelsData.filter((element) => {
		if (countryBox.value != "all") {
			// console.log("bye");
			return element.country.toLowerCase() === countryBox.value;
		} else {
			// console.log("holi");
			return element;
		}
	});
};
