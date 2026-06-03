import React, { useEffect, useState } from 'react'
import {ShoppingCartIcon, XIcon} from 'lucide-react'
import { useCart } from '../context/cartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utilities/formatCurrency'

const ShoppingCart = () => {
  // State to track if cart is open or closed
  const [isOpen, setIsOpen] = useState(false) // Default is closed (false)
  const [cartItems, setCartItems] = useState([]) // State for cart items
  const [totalPrice, setTotalPrice] = useState(0) // State for total price
  const {allItems, setLocalStorage} = useCart() // Get all products from context

  // Update cartItems whenever allItems changes
  useEffect(() => {
    //Filter to get only items that are in the cart
    const inCartItems = allItems.filter((item) => item.inCart)
    //Reverse the order so newest items appear at the top
    setCartItems(inCartItems?.reverse())

    //Calculate total price using reduce
    const price = inCartItems?.reduce((accumulator, item) => {
      return (accumulator += item.price * item.quantity)
    }, 0)
    // Update total price
    setTotalPrice(price)

    //Save cart data to local storage whenever allItems changes
    setLocalStorage()

  }, [allItems]) // Runs every time allItems changes

  return (
    <>
      {/* Only render cart content if there are items */}
      {cartItems.length !== 0 && (
        <>
          {/* Main cart wrapper - - position changes based on isOpen state */}
          <div className={`w-[300px] h-screen bg-gray-200 fixed top-0 z-30 border-l-4 border-red-200 rounded-tl-lg ${isOpen ? 'right-0' : '-right-[300px]'}`}>
            {/* Header section with title and close button */}
            <div className="w-full h-16 bg-white absolute left-0 top-0 z-10 grid place-items-center border rounded-lg">
              <h1 className="text-xl text-gray-600">Shopping Cart</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 bg-yellow-400 absolute right-3 z-20 grid place-items-center border-2 rounded-full hover:bg-yellow-500 transition-colors">
                <XIcon className="text-white" />
              </button>
            </div>

            {/* Floating cart button that opens the cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-9 h-9 bg-yellow-400 absolute -left-14 top-3 z-20 grid place-items-center border-2 rounded-full">
              <ShoppingCartIcon className='text-white' />
              <span className="w-6 h-6 bg-pink-400 absolute -bottom-4 -left-2 grid place-items-center border border-gray-300 rounded-full text-sm text-white">
                {cartItems?.length > 9 ? '9+' : cartItems?.length}  {/* Show 9+ if more than 9 items */}
              </span>
            </button>
            {/* Cart items container - scrollable area */}
            <div className="h-screen flex flex-col gap-y-3 overflow-y-scroll px-5 pb-24 pt-20">
              {/* Cart items will go here */}
              {cartItems?.map((item) => (
                <CartItem
                  key={item.id} // unique key for each item
                  item={item} // pass the product data
                  fromCart={true}
                />
              ))}
            </div>

            {/* FOOTER: Total price and Checkout button */}
            <div className="w-full h-20 bg-white absolute bottom-0 left-0 z-10 grid place-items-center border rounded-lg">
              <h1 className="text-xl text-gray-600">Total: {formatCurrency(totalPrice)}</h1>
              <button className="rounded-md bg-blue-300 px-2 text-white hover:bg-blue-400 transition-colors">Buy Now</button>
            </div>
          </div>
        </>
      )}
      
    </>
  )
}

export default ShoppingCart