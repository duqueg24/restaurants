import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import TopRestaurants from '../screens/TopRestaurants';

const Stack = createStackNavigator()


export default function TopRestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="top-restaurantsStack"
            component={TopRestaurants}
            options={{title:"los Mejores Restaurantes"}}
            
            />
        </Stack.Navigator>
    )
}