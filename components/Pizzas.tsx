import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Pizza from './Pizza';

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

interface PizzasProps {
  pizzas: PizzaProps[];
  deleteCallback: (pizza: PizzaProps) => void;
  editCallback: (pizza: PizzaProps) => void;
  pizzaExists: (pizza: PizzaProps) => boolean;
}

const Pizzas = ({ pizzas, deleteCallback, editCallback, pizzaExists }: PizzasProps) => {
  const [currentPizzas, setCurrentPizzas] = useState<PizzaProps[]>(pizzas);

  useEffect(() => setCurrentPizzas(pizzas), [pizzas]);

  return (
    <Container>
      <Grid container spacing={3}>
        {currentPizzas.length ? (
          currentPizzas.map((pizza) => (
            <Grid item xs={12} md={6} key={pizza.id}>
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
          <div className="text-center w-full">
            No pizzas exist. Click <b>Add New Pizza</b> to create a new pizza.
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Pizzas;
