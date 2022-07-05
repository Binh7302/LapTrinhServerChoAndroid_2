import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register } from './UserService';
import constants from '../../utils/constants';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLogin = async (email, password) => {
        try {
            const res = await login(email, password);
            if(res && res.token){
                await AsyncStorage.setItem(constants.TOKEN_KEY, res.token);
                setIsLoggedIn(true);
                return true;
            }
        } catch (error) {
            console.log('onLogin error: ', error)
        }
        return false;
    }
    
    const onRegister = async (email, password, confirm_password) => {
        try {
            const res = await register(email, password,confirm_password);
            return res.status;
        } catch (error) {
            console.log('onRegister error: ', error)
        }
    }


    
    return (
        <UserContext.Provider
            value={{
                isLoggedIn, onLogin, onRegister
            }}>
            {children}
        </UserContext.Provider>
    )
}




