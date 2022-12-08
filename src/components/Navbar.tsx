import React, {SyntheticEvent, useContext, useState, useEffect} from 'react';
import {SearchContext} from '../context/search.context';
import {UserContext} from "../context/user.context";
import {Link, useNavigate} from 'react-router-dom';

export const Navbar = () => {
    const {search, setSearch} = useContext(SearchContext);
    const {loggedUser, userLog, setUserLog} = useContext(UserContext);
    const [inputValue, setInputValue] = useState(search);

    const navigate = useNavigate()
    useEffect(() => {
        loggedUser && setUserLog(true)
    });

    const setSearchWithForm = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputValue);
    };

    const logOut = (e: SyntheticEvent) => {
        e.preventDefault();
        localStorage.removeItem("logged-user");
        setUserLog(false);
        navigate('/login')
    };

    return (
        <div className="w-full h-[100px] sm:h-[80px] flex flex-wrap justify-center sm:justify-between items-center align-bottom px-4 bg-[#F29544] ">
            <div className="flex space-x-6 items-center text-white text-base font-medium">
                <Link to={'/'}>
                    <h1 className="rounded-md bg-[#33A6A6] p-2.5">Map</h1>
                </Link>
                <Link to={'/add-trip'}>
                    <h1 className="rounded-md bg-[#8C1F66] p-2.5">Add trip</h1>
                </Link>
                {userLog ?
                    <button onClick={logOut}>
                        <h1 className="rounded-md bg-[#323673] p-2.5">Logout</h1>
                    </button>
                    :
                    <>
                        <Link to={'/registration'}>
                            <h1 className="rounded-md bg-[#323673] p-2.5">Register</h1>
                        </Link>
                        <Link to={'/login'}>
                            <h1 className="rounded-md bg-[#323673] p-2.5">Login</h1>
                        </Link>
                    </>
                    }
            </div>

            <form className="flex items-center text-base font-medium" onSubmit={setSearchWithForm}>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                        </svg>
                    </div>
                    <input type="text"
                           className="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-gray-400"
                           placeholder="Search"
                           value={inputValue}
                           onChange={e => setInputValue(e.target.value)}/>
                </div>

                <button type="submit"
                        className="p-2.5 ml-2 text-sm font-medium text-white bg-[#323673] rounded-lg hover:bg-[#212459] focus:ring-4 focus:outline-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </form>
        </div>
    );
};