// Function to save data to local storage
export const setItemInStorage = (name, data) => {
    localStorage?.setItem(name, JSON.stringify(data))
}

// Function to retrieve raw data from local storage
export const getItemFromStorage = (name) => {
    localStorage?.getItem(name)
}

// Function to retrieve and parse data from local storage
export const getParsedItemFromStorage = (name) => {
    JSON.parse(localStorage?.getItem(name))
}

// Function to remove data from local storage
export const removeItemFromStorage = (name) => {
    localStorage?.removeItem(name)
}
