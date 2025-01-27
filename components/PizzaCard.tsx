import PizzaButton from "./PizzaButton";
import { Card, CardContent, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { PIZZA_SIZE_PRICES, calculatePizzaPrice } from "../utils/prices";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { PizzaComponentProps } from "../types";

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
  const totalPrice = calculatePizzaPrice(size as keyof typeof PIZZA_SIZE_PRICES, toppings);

  return (
    <Card key={id} className="relative group">
      <IconButton
        onClick={deletePizza}
        className="!absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        size="small"
      >
        <CloseIcon className="text-red-500" />
      </IconButton>
      <CardContent>
        <div className="flex justify-between items-start mt-4">
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="body2" color="text.secondary">
                {size} Pizza
              </Typography>
              <PizzaButton
                buttonText=""
                onSave={editCallback}
                pizzaExists={pizzaExists}
                initialData={{ id, name, size, toppings }}
                dialogTitle="Edit pizza below 🍕"
                icon={<EditIcon fontSize="small" />}
              />
            </div>
          </div>
          <Typography variant="h6" color="primary">
            ${totalPrice}
          </Typography>
        </div>
        <List className="w-full max-w-[360px] !p-0">
          {toppings?.length
            ? toppings.map((topping) => (
              <ListItem key={topping.title} disableGutters className="w-full !p-0">
                <IconButton aria-label="emoji" className="p-0">{topping.emoji}</IconButton>
                <ListItemText primary={topping.title} />
              </ListItem>
            ))
            : null}
        </List>
      </CardContent>
    </Card>
  );
};

export default Pizza;
