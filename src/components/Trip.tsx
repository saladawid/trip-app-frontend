import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {Button} from './Button';
import {useNavigate, useParams} from 'react-router-dom';
import {apiURL} from "../utils/apiURL";
import {geoAddress, geoCoordinates,} from "../utils/geocode";
import {UserContext} from "../context/user.context";

export const Trip = () => {
    const {userLog, loggedUser} = useContext(UserContext);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        arrival: '',
        departure: '',
        url: '',
        address: '',
        id: ''
    });
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            await getTrip();
        })();

    }, []);


    const getTrip = async () => {
        try {
            const res = await fetch(`${apiURL}/trip/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            const data = await res.json();

            const {addressPlace} = await geoAddress(data.lat, data.lon)

            setForm({
                ...data,
                address: addressPlace

            });
        } catch (e) {
            const error = e instanceof Error ? e.message : 'Sorry try again later';
            setSummary(error);
            setError(true);
        }

    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));

    };

    const saveForm = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {lat, lon} = await geoCoordinates(form.address);

        const res = await fetch(`${apiURL}/trip/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + loggedUser.token,
            },
            body: JSON.stringify({
                ...form,
                lat,
                lon,
            }),
        });
        const data = await res.json();

        const {addressPlace} = await geoAddress(data.lat, data.lon)

        setForm({
            ...data,
            address: addressPlace

        });
    }

    const deleteTrip = async (e: SyntheticEvent, id: string) => {
        e.preventDefault();
        try {
            await fetch(`${apiURL}/trip/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + loggedUser.token,
                },
            });
            setSummary("Deleted")
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (e) {
            const error = e instanceof Error ? e.message : 'Sorry try again later';
            setSummary(error)
            setError(true);
        }
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className=" w-full max-w-[550px] h-max">
                <div className="mb-5">
                    <form>
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Title
                            <input
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="text"
                                name="name"
                                placeholder="name your trip"
                                maxLength={99}
                                value={form.name ?? ''}
                                onChange={e => updateForm('name', e.target.value)}
                            />
                        </label>
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Description of the trip
                            <textarea
                                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                name="description"
                                placeholder="add a description of your trip"
                                maxLength={999}
                                value={form.description ?? ''}
                                onChange={e => updateForm('description', e.target.value)}

                            />
                        </label>
                        <div className="flex gap-1">
                            <label className="flex-1 mb-3 block text-base font-medium text-[#07074D]">
                                Arrival
                                <input
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    type="date"
                                    name="arrival"
                                    placeholder="arrival"
                                    maxLength={99}
                                    value={form.arrival ?? ''}
                                    onChange={e => updateForm('arrival', e.target.value)}
                                />
                            </label>
                            <label className="flex-1 mb-3 block text-base font-medium text-[#07074D]">
                                Departure
                                <input
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    type="date"
                                    name="departure"
                                    placeholder="departure"
                                    maxLength={99}
                                    value={form.departure ?? ''}
                                    onChange={e => updateForm('departure', e.target.value)}
                                />
                            </label>
                        </div>

                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Total price of the trip
                            <input
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="number"
                                name="price"
                                min="0"
                                maxLength={99}
                                value={form.price ?? ''}
                                onChange={e => updateForm('price', e.target.value)}
                            />
                        </label>

                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Link
                            <input
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="url"
                                name="url"
                                maxLength={99}
                                value={form.url ?? ''}
                                onChange={e => updateForm('url', e.target.value)}
                            />
                        </label>

                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Travel destination
                            <input
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="text"
                                name="address"
                                placeholder="country city street"
                                value={form.address ?? ''}
                                onChange={e => updateForm('address', e.target.value)}
                            />
                        </label>
                        <div className="flex justify-between">
                            <Button onClick={(e) => saveForm(e)} name="Update"/>
                            <Button onClick={(e) => deleteTrip(e, form.id)} name={summary ? summary : "Delete"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

