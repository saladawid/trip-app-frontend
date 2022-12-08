import {useState} from 'react';
import {Navbar} from './components/Navbar';
import {Map} from './components/Map';
import {SearchContext} from './context/search.context';
import {UserContext} from './context/user.context';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AddTrip} from './components/AddTrip';
import {Trip} from './components/Trip';
import {Registration} from "./components/Registration";
import {Login} from "./components/Login";



export const App = () => {
    const [search, setSearch] = useState('');
    const [userLog, setUserLog] = useState(false);
    const loggedUser = JSON.parse(localStorage.getItem('logged-user'));

    return (
        <UserContext.Provider value={{loggedUser, userLog, setUserLog}}>
            <SearchContext.Provider value={{search, setSearch}}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Map/>}/>
                        <Route path="/add-trip" element={<AddTrip/>}/>
                        <Route path="/:id" element={<Trip/>}/>
                    </Routes>
                </BrowserRouter>
            </SearchContext.Provider>
        </UserContext.Provider>
    );
};


