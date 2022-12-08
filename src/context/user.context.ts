import {createContext} from 'react';

export const UserContext = createContext({
    loggedUser: {token: null},
    userLog: false,
    setUserLog: (s: boolean) => {}
});