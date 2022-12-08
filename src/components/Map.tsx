import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {SearchContext} from '../context/search.context';
import {BasicTripEntity} from 'types';
import {PopupTrip} from './PopupTrip';
import 'leaflet/dist/leaflet.css';
import '../utils/iconMap';
import {apiURL} from "../utils/apiURL";
import {UserContext} from "../context/user.context";
import {useNavigate} from 'react-router-dom'

export const Map = () => {
    const {userLog, loggedUser} = useContext(UserContext);
    const {search} = useContext(SearchContext)
    const [trips, setTrips] = useState<BasicTripEntity[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${apiURL}/trip/search/${search}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + loggedUser.token,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setTrips(data);
                }
            } catch (e) {
                (!loggedUser && !userLog) && navigate('/login');
            }
        })();
    }, [search]);


    return (
        <MapContainer center={[52.8866852, 19.9604527]} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                trips.map(trip => (
                    <Marker key={trip.id} position={[trip.lat, trip.lon]}>
                        <Popup className="h-[250px] w-[250px]">
                            <PopupTrip id={trip.id}/>
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};