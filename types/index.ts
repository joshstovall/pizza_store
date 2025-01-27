export type PizzaSize = "Small" | "Medium" | "Large";

export interface Topping {
  title: string;
  emoji: string;
  price: number;
}

export interface Pizza {
  id: string;
  name: string;
  size: string;
  toppings: Topping[];
}

export interface PizzaComponentProps extends Pizza {
  deleteCallback: (pizza: Pizza) => void;
  editCallback: (pizza: Pizza) => void;
  pizzaExists: (pizza: Pizza) => boolean;
}

export interface PizzaEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (pizza: Pizza) => void;
  pizzaExists: (pizza: Pizza) => boolean;
  initialData?: Pizza;
  title: string;
}

export interface PizzaButtonProps {
  onSave: (pizza: Pizza) => void;
  pizzaExists: (pizza: Pizza) => boolean;
  buttonText: string;
  variant?: "text" | "outlined" | "contained";
  className?: string;
  initialData?: Pizza;
  dialogTitle: string;
  startIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface EditToppingsProps {
  pizzas: Pizza[];
  onToppingUpdate: (oldTopping: Topping, newTopping: Topping) => void;
  startIcon?: React.ReactNode;
}

export interface PizzasListProps {
  pizzas: Pizza[];
  deleteCallback: (pizza: Pizza) => void;
  editCallback: (pizza: Pizza) => void;
  pizzaExists: (pizza: Pizza) => boolean;
}
