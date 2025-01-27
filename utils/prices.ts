export const PIZZA_SIZE_PRICES = {
  Small: 9.99,
  Medium: 12.99,
  Large: 15.99,
} as const;

export const calculatePizzaPrice = (size: keyof typeof PIZZA_SIZE_PRICES, toppings: { price: number }[]) => {
  const basePrice = PIZZA_SIZE_PRICES[size];
  const toppingsTotal = toppings.reduce((sum, topping) => sum + topping.price, 0);
  return (basePrice + toppingsTotal).toFixed(2);
};
