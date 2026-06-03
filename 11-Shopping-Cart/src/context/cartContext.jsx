import { createContext, useContext } from "react";
import { allProducts } from "../assets/data";
import { useState } from "react";
import { getItemFromStorage, getParsedItemFromStorage, setItemInStorage } from "../utilities/localStorageFns";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    //state: to hold all products
    const [allItems, setAllItems] = useState([])
    //function: to popuate allItems with product data
    const setItems = () => {
        setAllItems(allProducts)
    }

    //function to add items to cart
    const addToCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                // if item is already in cart, return unchanged
                if (prevItem.inCart) {
                    return prevItem
                }
                // if IDs match, set inCart to true
                return prevItem.id === item.id ? {...prevItem, inCart:true} : prevItem
            })
        })
    }

    // Function to remove items from cart
    const removeFromCart = (item) => {
        setAllItems((prevItems) => {
            return prevItems.map((prevItem) => {
                // If IDs match, set inCart to false and reset quantity to 1
                return prevItem.id === item.id 
                    ? { ...prevItem, inCart: false, quantity: 1 }
                    : prevItem
            })
        })
    }

    // Function to Update quantity of a Cart Item
    const updateQuantity = (cartItem, amount) => {
        setAllItems((prevItems) => {
            return prevItems.map((item) => {
                // Check if this is the item we want to update
                return item.id === cartItem.id
                    ? { ...item, quantity: item.quantity + amount }
                    : item // Leave other items unchanged
            })
        })
    }

    // Function to save Cart Data to Local Storage
    const setLocalStorage = () => {
        // Only save if there are items
        if (allItems?.length !== 0) {
            //Filter to get only items in the cart
            const inCartItems = allItems?.filter((item) => item.inCart)
            // Save filtered items to local storage
            setItemInStorage("cartItems", inCartItems)
        }
    }

    // Restore Cart data from local storage
    const setCartItemsFromStorage = () => {
        // Check if there is saved data
        if (getItemFromStorage('cartItems') !== null) {
            // Get parsed data from local storage
            const storageItems = getParsedItemFromStorage('cartItems')

            // Merge saved data with all items
            setAllItems((prevItems) => {
                return prevItems.map((item) => {
                    // Find if this item exists in saved storage data
                    const matchedItem = storageItems?.find(
                        (storageItem) => storageItem.id === item.id
                    )
                    // If found, use the saved data (has correct inCart and quantity)
                    return matchedItem ? matchedItem : item
                })
            })
        }
    }

    //Provide both state & function to children ('value' contains shared data)
    return <CartContext.Provider value={{allItems, setItems, addToCart, removeFromCart, updateQuantity, setLocalStorage, setCartItemsFromStorage }}>
            {children}
        </CartContext.Provider>
}

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext)
}