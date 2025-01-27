import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToppings } from "../context/ToppingsContext";
import { EditToppingsProps, Topping } from "../types";

const EditToppings = ({ pizzas, onToppingUpdate, startIcon }: EditToppingsProps) => {
  const { availableToppings, setAvailableToppings } = useToppings();
  const [open, setOpen] = useState(false);
  const [newTopping, setNewTopping] = useState({ title: "", emoji: "", price: 0 });
  const [editingTopping, setEditingTopping] = useState<Topping | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingTopping(null);
    setNewTopping({ title: "", emoji: "", price: 0 });
    setShowEditor(false);
  };

  const isToppingUsedInPizza = (toppingTitle: string) => {
    return pizzas.some(pizza =>
      pizza.toppings.some(topping => topping.title === toppingTitle)
    );
  };

  const isToppingDuplicate = (title: string, skipId?: string) => {
    return availableToppings.some(topping =>
      topping.title.toLowerCase() === title.toLowerCase() && topping.title !== skipId
    );
  };

  const handleAddTopping = () => {
    if (!newTopping.title || !newTopping.emoji) {
      alert("Please fill in all fields");
      return;
    }

    if (isToppingDuplicate(newTopping.title)) {
      alert("This topping already exists!");
      return;
    }

    setAvailableToppings([...availableToppings, newTopping]);
    setNewTopping({ title: "", emoji: "", price: 0 });
    setShowEditor(false);
    setEditMode(false);
  };

  const handleDeleteTopping = (title: string) => {
    if (isToppingUsedInPizza(title)) {
      alert("Topping exists on a pizza! Please remove it from any existing pizzas to delete the topping.");
      return;
    }
    setAvailableToppings(availableToppings.filter(topping => topping.title !== title));
  };

  const handleEditTopping = (topping: Topping) => {
    setEditingTopping(topping);
    setNewTopping({ ...topping });
    setEditMode(true);
    setShowEditor(true);
  };

  const handleUpdateTopping = () => {
    if (!editingTopping) return;

    if (!newTopping.title || !newTopping.emoji) {
      alert("Please fill in all fields");
      return;
    }

    if (isToppingDuplicate(newTopping.title, editingTopping.title)) {
      alert("This topping already exists!");
      return;
    }

    setAvailableToppings(availableToppings.map(topping =>
      topping.title === editingTopping.title ? newTopping : topping
    ));

    onToppingUpdate(editingTopping, newTopping);

    // Reset all states after updating
    setEditMode(false);
    setEditingTopping(null);
    setNewTopping({ title: "", emoji: "", price: 0 });
    setShowEditor(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={startIcon}>
        Edit Toppings
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="relative">
          Edit Toppings
          <IconButton
            onClick={handleClose}
            className="!absolute right-2 top-2"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!showEditor && (
            <Button
              onClick={() => setShowEditor(true)}
              variant="contained"
              fullWidth
              className="mb-2"
            >
              Add New Topping
            </Button>
          )}
          {showEditor && (
            <div className="space-y-4">
              <TextField
                label="Title"
                value={newTopping.title}
                onChange={(e) => setNewTopping({ ...newTopping, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Emoji"
                value={newTopping.emoji}
                onChange={(e) => setNewTopping({ ...newTopping, emoji: e.target.value })}
                fullWidth
              />
              <TextField
                label="Price"
                type="number"
                value={newTopping.price}
                onChange={(e) => setNewTopping({ ...newTopping, price: parseFloat(e.target.value) })}
                fullWidth
              />
              <div className="flex gap-2">
                <Button
                  onClick={editMode ? handleUpdateTopping : handleAddTopping}
                  variant="contained"
                >
                  {editMode ? "Update Topping" : "Add Topping"}
                </Button>
                <Button onClick={() => {
                  setEditMode(false);
                  setEditingTopping(null);
                  setNewTopping({ title: "", emoji: "", price: 0 });
                  setShowEditor(false);
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
          <List>
            {availableToppings.map((topping) => (
              <ListItem key={topping.title}>
                <ListItemText primary={`${topping.emoji} ${topping.title} - $${topping.price.toFixed(2)}`} />
                <IconButton onClick={() => handleEditTopping(topping)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTopping(topping.title)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditToppings;
