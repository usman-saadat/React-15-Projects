// Create a currency formatter
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { 
    currency: "USD",
    style: "currency",
})

// Function to format numbers as currency
export const formatCurrency = (number) => {
    return CURRENCY_FORMATTER.format(number)
}