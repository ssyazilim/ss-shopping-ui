export const calculateDiscount = (price: number, discount: number): number => {
  const discountAmount = (price * discount) / 100
  return Math.round(discountAmount * 100) / 100
}
