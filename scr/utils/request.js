/*LLAMAR HOTELES*/
const requestHotelData = async () => {
	const response = await fetch(
		"https://6256097e8646add390e01d99.mockapi.io/hotels/reservation/hotels"
	);
	const data = await response.json();
	return data;
};

export { requestHotelData };
