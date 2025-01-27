"use client";

import { useState } from "react";
import PizzaButton from "../components/PizzaButton";
import Pizzas from "../components/PizzaList";
import EditToppings from "../components/EditToppings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Pizza, Topping } from "../types";

const pizzaExists = (pizzas: Pizza[], pizza: Pizza) =>
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
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  const saveCallback = (pizza: Pizza) => setPizzas((pizzas) => [...pizzas, pizza]);
  const deleteCallback = (pizza: Pizza) => setPizzas(pizzas.filter((item) => item.id !== pizza.id));
  const editCallback = (pizza: Pizza) => {
    const pizzaArray = [...pizzas];
    const pizzaIndex = pizzaArray.findIndex((obj) => obj.id === pizza.id);
    pizzaArray[pizzaIndex] = pizza;
    setPizzas(pizzaArray);
  };

  const handleToppingUpdate = (oldTopping: Topping, newTopping: Topping) => {
    const updatedPizzas = pizzas.map(pizza => ({
      ...pizza,
      toppings: pizza.toppings.map(t =>
        t.title === oldTopping.title ? newTopping : t
      )
    }));
    setPizzas(updatedPizzas);
  };

  return (
    <>
      <header className="bg-gray-800 min-h-[20vh] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to Pizza Palace</h1>
        <div className="flex gap-4">
          <PizzaButton
            buttonText="Add New Pizza"
            onSave={saveCallback}
            pizzaExists={(pizza) => pizzaExists(pizzas, pizza)}
            variant="contained"
            dialogTitle="Create a new pizza below 🍕"
            startIcon={<AddCircleOutlineIcon />}
          />
          <EditToppings
            pizzas={pizzas}
            onToppingUpdate={handleToppingUpdate}
            startIcon={<EditIcon />}
          />
        </div>
      </header>
      <Pizzas
        pizzas={pizzas}
        deleteCallback={deleteCallback}
        editCallback={editCallback}
        pizzaExists={(pizza: Pizza) => pizzaExists(pizzas, pizza)}
      />
    </>
  );
}
