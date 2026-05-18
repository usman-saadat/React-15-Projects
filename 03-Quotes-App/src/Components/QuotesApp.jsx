import { useState } from "react"

const QuotesApp = () => {

    const [quote, setQuote] = useState({
        text: 'Ask not what your country can do for you. Ask what you can do for your country.',
        author: 'John Kennedy',
    })

    const [showFavorites, setShowFavorites] = useState(false)
    const [favorites, setFavorites] = useState([])

    const fetchNewQuote = async() => {
        const url = "https://thequoteshub.com/api/"
        const response = await fetch(url)
        const data = await response.json()
        console.log("JSON data:", data)
        
        setQuote({
            text: data.text,
            author: data.author
        })
    }

    const toggleFavorites = ()=> {
        setShowFavorites(!showFavorites)
    }

    const addToFavorites = () => {
        setFavorites([...favorites, quote])
    }

    const deleteFavorite = (index) => {
        const updatedFavorites = favorites.filter((item, i) => i !==index)
        setFavorites(updatedFavorites)
    }

  return (
    <div className="container">
        <div className="quotes-app">
            <h1 className="app-heading">Quote.</h1>

            {/* Favorites/heart Icon*/}
            <i className="bx bxs-heart fav-icon" onClick={toggleFavorites}></i>

            {/* Quote Section */}
            <div className="quote">
                <i className="bx bxs-quote-alt-left left-quote"></i>

                <p className="quote-text">
                    {quote.text}
                </p>

                <p className="quote-author">{quote.author}</p>

                <i className="bx bxs-quote-alt-right right-quote"></i>
            </div>

            {/* Decorative Circles */}
            <div className="circles">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <div className="circle-3"></div>
                <div className="circle-4"></div>
            </div>

            {/* Buttons */}
            <div className="buttons">
                <button className="btn btn-new" onClick={fetchNewQuote}>New Quote</button>
                <button className="btn btn-fav" onClick={addToFavorites}>Add to Favorites</button>
            </div>

            {/* Favorites Section */}
            {showFavorites && (
            <div className="favorites">
                {/* Close button (X) */}
                <button className="btn-close" onClick={toggleFavorites}>
                  <i className="bx bx-x"></i>
                </button>

                {/* Favorite quote item */}
                {favorites.map((favQuote, index) => (
                    <div className="fav-quotes" key={index}>
                        {/* Delete button for this quote */}
                        <div className="fav-quotes-delete" onClick={() => deleteFavorite(index)}>
                            <i className="bx bx-x-circle"></i>
                        </div>

                        {/* Quote text and author */}
                        <div className="fav-quotes-content">
                            <p className="fav-quotes-text">
                                {favQuote.text}
                            </p>
                            <p className="fav-quotes-author">{favQuote.author}</p>
                        </div>
                    </div>
                ))}
                
                
            </div>
            )}  
            
        </div>
    </div>
  )
}

export default QuotesApp