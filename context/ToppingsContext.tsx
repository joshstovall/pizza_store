"use client";

import { createContext, useContext, useState } from "react";
import { Topping } from "../types";

const defaultToppings = [
  {
    title: "Cheese",
    emoji: "🧀",
    price: 0.00
  },
  {
    title: "Pepperoni",
    emoji: "🔴",
    price: 1.99
  },
  {
    title: "Mushrooms",
    emoji: "🍄",
    price: 1.99
  },
  {
    title: "Onions",
    emoji: "🧅",
    price: 1.99
  },
  {
    title: "Sausage",
    emoji: "🌭",
    price: 1.99
  },
  {
    title: "Bacon",
    emoji: "🥓",
    price: 1.99
  },
  {
    title: "Olives",
    emoji: "🫒",
    price: 1.99
  },
  {
    title: "Green Peppers",
    emoji: "🫑",
    price: 1.99
  },
  {
    title: "Pineapple",
    emoji: "🍍",
    price: 1.99
  }
];

type ToppingsContextType = {
  availableToppings: Topping[];
  setAvailableToppings: (toppings: Topping[]) => void;
};

const ToppingsContext = createContext<ToppingsContextType | undefined>(undefined);

export function ToppingsProvider({ children }: { children: React.ReactNode }) {
  const [availableToppings, setAvailableToppings] = useState(defaultToppings);

  return (
    <ToppingsContext.Provider value={{ availableToppings, setAvailableToppings }}>
      {children}
    </ToppingsContext.Provider>
  );
}

export function useToppings() {
  const context = useContext(ToppingsContext);
  if (context === undefined) {
    throw new Error("useToppings must be used within a ToppingsProvider");
  }
  return context;
}
