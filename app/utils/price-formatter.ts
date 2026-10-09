export const convertTRYPrice = (price: string): string => {
  const deleteDots = price.replace(/\./g, "")
  const changeCommasWithDot = deleteDots.replace(",", ".")
  let formattedNumber = parseFloat(changeCommasWithDot)
  if (isNaN(formattedNumber)) formattedNumber = 0
  const isDecimalFocused = price.includes(",")
  if (!isDecimalFocused) return formattedNumber.toLocaleString("tr-TR", { minimumFractionDigits: 0 })
  return formattedNumber.toLocaleString("tr-TR", { minimumFractionDigits: 1 })
}

export const convertDefaultPrice = (price: string): number => {
  const deleteDots = price.replace(/\./g, "")
  const changeCommasWithDot = deleteDots.replace(",", ".")
  return parseFloat(changeCommasWithDot)
}

export const priceViewer = (price: string): string => {
  const calculatedPrice = parseFloat(price).toFixed(2)
  const changeDotWithComma = calculatedPrice.replace(".", ",")
  return convertTRYPrice(changeDotWithComma)
}
