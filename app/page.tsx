'use client';

import { useState } from 'react';
import NewPizza from '../components/NewPizza';
import Pizzas from '../components/Pizzas';

interface Topping {
  title: string;
  emoji: string;
  price: number;
}

interface PizzaProps {
  id: string;
  name: string;
  size: string;
  toppings: Topping[];
}

const pizzaExists = (pizzas: PizzaProps[], pizza: PizzaProps) =>
  pizzas.some(
    (p) =>
      p.size === pizza.size &&
      p.toppings
        .map((e) => e.title)
        .sort()
        .toString() ===
        pizza.toppings
          .map((e) => e.title)
          .sort()
          .toString() &&
      p.id !== pizza.id
  );

export default function Home() {
  const [pizzas, setPizzas] = useState<PizzaProps[]>([]);

  const saveCallback = (pizza: PizzaProps) => setPizzas((pizzas) => [...pizzas, pizza]);
  const deleteCallback = (pizza: PizzaProps) => setPizzas(pizzas.filter((item) => item.id !== pizza.id));
  const editCallback = (pizza: PizzaProps) => {
    const pizzaArray = [...pizzas];
    const pizzaIndex = pizzaArray.findIndex((obj) => obj.id === pizza.id);
    pizzaArray[pizzaIndex] = pizza;
    setPizzas(pizzaArray);
  };

  return (
    <>
      <header className="bg-gray-800 min-h-[20vh] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <h1 className="text-4xl font-bold text-center">Welcome to Pizza Palace</h1>
      </header>
      <NewPizza
        saveCallback={saveCallback}
        pizzaExists={(pizza: PizzaProps) => pizzaExists(pizzas, pizza)}
      />
      <Pizzas
        pizzas={pizzas}
        deleteCallback={deleteCallback}
        editCallback={editCallback}
        pizzaExists={(pizza: PizzaProps) => pizzaExists(pizzas, pizza)}
      />
    </>
  );
}
