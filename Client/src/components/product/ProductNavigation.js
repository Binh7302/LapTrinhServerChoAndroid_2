import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {Detail} from './screens/Detail';
import {List} from './screens/List';

const Stack = createNativeStackNavigator();

export const ProductNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='List' component={List} />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    )
}

