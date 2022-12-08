import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {geoCoordinates} from '../utils/geocode';
import {apiURL} from '../utils/apiURL';
import {Button} from './Button';
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../context/user.context";

export const AddTrip = () => {
    const {userLog, loggedUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        arrival: '',
        departure:'',
        url: '',
        address: '',
    });
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {

    }, []);


    const saveTrip = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            if (!form.name || !form.address) {
                throw new Error('required');
            }
            setLoading(true);

            const {lat, lon} = await geoCoordinates(form.address);

            const res = await fetch(`${apiURL}/trip`, {
                method: 'POST',
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

            if (data.id) {
                setId(data.id);
                setError(false);
                setSummary('The trip has been added');
            }
        } catch (e) {
            const error = e instanceof Error ? e.message : 'Sorry try again later';
            const errorMessage = e instanceof TypeError ? 'Invalid travel destination' : error;
            setSummary(errorMessage);
            setError(true);
            (!loggedUser && !userLog) && navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const clearForm = (e: SyntheticEvent) => {
        e.preventDefault();

        setForm(({
            name: '',
            description: '',
            price: 0,
            arrival: '',
            departure:'',
            url: '',
            address: '',
        }));
        setId('');
        setError(false);
    };

    return (
        <div className="flex items-center justify-center p-12 h-[calc(100vh-80px)]">
            <div className="mx-auto w-full max-w-[550px]">
                <p className="text-[red] text-center">{(error && summary) && "Check fields"}</p>
                <form onSubmit={saveTrip}>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Title
                            <input
                                className={!form.name && error ? 'w-full rounded-md border border-[red] bg-red placeholder-red-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md' : 'w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'}
                                type="text"
                                name="name"
                                placeholder={(summary && error) ? `name your trip - ${summary}` : "name your trip"}
                                maxLength={99}
                                value={form.name}
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
                                value={form.description}
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
                                    value={form.arrival}
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
                                    value={form.departure}
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
                                value={form.price}
                                onChange={e => updateForm('price', Number(e.target.value))}
                            />
                        </label>

                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Link
                            <input
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                type="url"
                                name="url"
                                maxLength={99}
                                value={form.url}
                                onChange={e => updateForm('url', e.target.value)}
                            />
                        </label>

                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Travel destination
                            <input
                                className={!form.address && error ? 'w-full rounded-md border border-[red] bg-red placeholder-red-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md' : 'w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'}
                                type="text"
                                name="address"
                                placeholder={(summary && error) ? `country city street - ${summary}` : "country city street"}
                                value={form.address}
                                onChange={e => updateForm('address', e.target.value)}
                            />
                        </label>
                        <div className="flex justify-between">
                            {loading ?
                                <Button spinnerName="Saving"/> : !id ? <Button name="Save"/> :
                                    <>
                                        <Button disabled={true} name="Saved"/>
                                        <Button onClick={clearForm} name="Add new"/>
                                    </>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

