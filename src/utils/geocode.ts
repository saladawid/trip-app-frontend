export const geoCoordinates = async (address: string): Promise<{
    lat: number;
    lon: number;
}> => {

    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const geoData = await geoRes.json();

    const lat = parseFloat(geoData[0].lat);
    const lon = parseFloat(geoData[0].lon);

    return {lat, lon};
};

export const geoAddress =  async (lat: string, lon: string): Promise<{
    addressPlace: string;
}> => {

    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const geoData = await geoRes.json();

    const addressPlace = `${geoData.address?.city} ${geoData.address?.road}`

    return {addressPlace}
}