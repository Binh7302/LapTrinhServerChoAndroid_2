import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {UserNavigation} from '../user/UserNavigation';
import { ProductNavigation } from '../product/ProductNavigation';
import { UserContext } from '../user/UserContext';

export const AppNavigation = (props) => {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLoggedIn ? <ProductNavigation /> : <UserNavigation />
            }
        </NavigationContainer>
    )
}

