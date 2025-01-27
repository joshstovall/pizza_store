import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import Pizza from "./PizzaCard";
import { Pizza as PizzaType, PizzasListProps } from "../types";

const PizzaList = ({ pizzas, deleteCallback, editCallback, pizzaExists }: PizzasListProps) => {
  const [currentPizzas, setCurrentPizzas] = useState<PizzaType[]>(pizzas);

  useEffect(() => setCurrentPizzas(pizzas), [pizzas]);

  return (
    <Container className="mt-6">
      <Grid container spacing={3}>
        {currentPizzas.length ? (
          currentPizzas.map((pizza) => (
            <Grid item xs={12} md={4} lg={4} key={pizza.id}>
              <Pizza
                id={pizza.id}
                name={pizza.name}
                size={pizza.size}
                toppings={pizza.toppings}
                deleteCallback={deleteCallback}
                editCallback={editCallback}
                pizzaExists={pizzaExists}
              />
            </Grid>
          ))
        ) : (
          <div className="text-center w-full mt-6">
            No pizzas exist. Click <b>Add New Pizza</b> to create a new pizza.
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default PizzaList;
