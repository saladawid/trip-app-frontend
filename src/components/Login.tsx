import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {apiURL} from '../utils/apiURL';
import {Button} from './Button';
import {UserContext} from "../context/user.context";
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [summary, setSummary] = useState('');
    const [error, setError] = useState(false);

    const {setUserLog} = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {

    }, []);


    const loginUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            if (!form.email || !form.password) {
                throw new Error('Fields are required');
            }

            const res = await fetch(`${apiURL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            if (!res.ok) {
                throw new Error('Invalid email or password');
            }

            const data = await res.json();

            if (data[0].token) {
                setError(false);
                localStorage.setItem('logged-user', JSON.stringify(data[0]));
                setUserLog(true)
                navigate('/')
            }
        } catch (e) {
            const error = e instanceof Error ? e.message : 'Sorry try again later';
            const errorMessage = e instanceof TypeError ? '' : error;
            setSummary(errorMessage);
            setError(true);
        }
    };

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center p-12 h-[calc(100vh-80px)]">
            <div className="mx-auto w-full max-w-[550px]">
                <p className="text-[red] text-center">{summary}</p>
                <form onSubmit={loginUser}>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Email
                            <input
                                className={!form.email && error ? 'w-full rounded-md border border-[red] bg-red placeholder-red-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md' : 'w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'}
                                type="email"
                                name="email"
                                placeholder="email"
                                maxLength={99}
                                value={form.email}
                                onChange={e => updateForm('email', e.target.value)}
                            />
                        </label>
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Password
                            <input
                                className={!form.password && error ? 'w-full rounded-md border border-[red] bg-red placeholder-red-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md' : 'w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'}
                                type="password"
                                name="password"
                                placeholder="password"
                                maxLength={99}
                                value={form.password}
                                onChange={e => updateForm('password', e.target.value)}
                            />
                        </label>
                        <Button name="Login"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

