import EditPizza from './EditPizza';
import { Button, Card, CardActions, CardContent, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';

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

interface PizzaComponentProps extends PizzaProps {
  deleteCallback: (pizza: PizzaProps) => void;
  editCallback: (pizza: PizzaProps) => void;
  pizzaExists: (pizza: PizzaProps) => boolean;
}

const Pizza = ({
  id,
  name,
  size,
  toppings,
  deleteCallback,
  editCallback,
  pizzaExists
}: PizzaComponentProps) => {

  const deletePizza = () => deleteCallback({ id, name, size, toppings });

  const saveCallback = (pizza: PizzaProps) => editCallback(pizza);

  return (
    <Card key={id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {size} Pizza
        </Typography>
        <List className="w-full max-w-[360px]">
          {toppings?.length
            ? toppings.map((topping) => (
              <ListItem key={topping.title} disableGutters>
                <ListItemText primary={topping.title} />
                <IconButton aria-label="emoji">{topping.emoji}</IconButton>
              </ListItem>
            ))
            : null}
        </List>
      </CardContent>
      <CardActions>
        <EditPizza
          id={id}
          name={name}
          size={size}
          toppings={toppings}
          saveCallback={saveCallback}
          pizzaExists={pizzaExists}
        />
        <Button onClick={deletePizza}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Pizza;
