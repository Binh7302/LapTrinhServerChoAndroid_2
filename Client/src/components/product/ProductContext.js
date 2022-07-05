import React, { useState, createContext } from 'react';
import { getProducts, getProductById } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);

    const onGetProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res);
            // if (res.error == false) {
            //     return res.data;
            // }
        } catch (error) {
            console.log('onGetProducts error: ', error)
        }
        // return [];
    }
    
    const onGetProductById = async (id) => {
        try {
            const res = await getProductById(id);
            setProduct(res);
        } catch (error) {
            console.log('onGetProductById error: ', error)
        }
    }


    
    return (
        <ProductContext.Provider
            value={{
                product,products,onGetProductById,onGetProducts
            }}>
            {children}
        </ProductContext.Provider>
    )
}




