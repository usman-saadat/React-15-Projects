import { useCart } from '../context/cartContext'

const CartButtons = ({ item, fromCart }) => {
  const {addToCart, removeFromCart, updateQuantity} = useCart() // this step gives access to addToCart function, which we will use to handle the button click event

  return (
      <div className={`w-max absolute right-5 top-5 ${fromCart && "scale-90"}`}>
        <div className="space-x-3">
          {!item.inCart ? (
            <button
                  type='button'
                  className="bg-zinc-400 rounded-md px-2 py-1 text-sm text-white hover:bg-zinc-500 transition-colors"
                  onClick={() => addToCart(item)}>
                  + Add to Cart
            </button>
          ) : (
            <div>
              <div className='flex'>
                {/* Minus button */}
                <button
                  onClick={() => {
                    if (item.quantity === 1) {
                      removeFromCart(item) //Remove if only 1 left
                    } else {
                      updateQuantity(item, -1) // Decrease by 1 if more than 1
                    }
                  }}
                  type="button"
                  className='border rounded-lg px-3'>-</button>
                {/* Quantity & in cart text */}
                <p className='flex items-center gap-x-1 mx-1'>
                  <span className="min-w-7 bg-green-100 grid place-items-center border rounded-full">{item.quantity}</span> {/*Show the actual quantity from state*/}
                  <span className='text-xs'>in cart</span>
                </p>
                {/* Plus button */}
                <button
                  onClick={() => updateQuantity(item, 1)} // Always increase by 1
                  type='button'
                  className='border rounded-lg px-3'>+</button>
              </div>
              {/* Remove Button */}
              <button
                type='button'
                onClick={() => removeFromCart(item)} 
                className="bg-pink-300 mx-auto mt-2 block rounded-md px-2 py-1 text-xs text-white hover:bg-pink-400">Remove</button>
            </div>
          )}              
        </div>
    </div>
  )
}

export default CartButtons