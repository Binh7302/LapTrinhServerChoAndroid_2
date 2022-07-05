import React from 'react';
import {AppNavigation} from './src/components/navigation/AppNavigation';
import  {UserContextProvider}  from './src/components/user/UserContext';
import  {ProductContextProvider}  from './src/components/product/ProductContext';


export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <AppNavigation />
      </ProductContextProvider>
    </UserContextProvider>
  );
}