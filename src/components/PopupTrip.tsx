import React, {useContext, useEffect, useState} from 'react';
import {TripEntity} from 'types';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/user.context";

interface Props {
    id: string;
}

export const PopupTrip = ({id}: Props) => {
    const {userLog, loggedUser} = useContext(UserContext);
    const [trip, setTrip] = useState<TripEntity | null>(null);

    useEffect(() => {

        (async () => {

            const res = await fetch(`http://localhost:3001/api/trip/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            const data = await res.json();

            setTrip(data);

        })();

    }, []);

    if (trip === null) {
        return <p>Loading</p>;
    }

    return <>
        <div className="">
                <div className="text-center font-bold text-[22px] border-b-black border-b-2 mb-2">
                    <h1>{trip.name}</h1>
                </div>
                <div className="flex">
                    <div className="flex-1 text-center font-medium text-[18px]">
                        <h2>Arrival</h2>
                    </div>
                    <div className="flex-1 text-center font-medium text-[18px]">
                        <h2>Departure</h2>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 text-center font-medium text-[14px]">
                        <h2>{trip.arrival}</h2>
                    </div>
                    <div className="flex-1 text-center font-medium text-[14px]">
                        <h2>{trip.departure}</h2>
                    </div>
                </div>
                <div
                    className="text-center border-t-black border-t-2 border-b-black border-b-2 mt-2 overflow-x-auto h-20">
                    <p className="m-auto font-bold">A few words:</p>
                    <span>{trip.description}</span>
                </div>
                <div className="flex justify-between">
                    <p>Total price</p>
                    <p>{trip.price}</p>
                </div>
                <div className="border-t-black border-t-2">
                    <Link className="self-end text-center font-bold" to={`/${id}`}>
                        <p className="text-zinc-900 hover:text-[#8C1F66]">SEE MORE</p>
                    </Link>
                </div>
            </div>
    </>;
};