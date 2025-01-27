import { useState, useEffect } from "react";
import { useToppings } from "../context/ToppingsContext";
import { Autocomplete, Avatar, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { PIZZA_SIZE_PRICES } from "../utils/prices";
import { PizzaEditorProps, Topping } from "../types";

const EditPizza = ({
  open,
  onClose,
  onSave,
  pizzaExists,
  initialData,
  title
}: PizzaEditorProps) => {
  const { availableToppings } = useToppings();
  const [name, setName] = useState("");
  const [size, setSize] = useState("Small");
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSize(initialData.size);
      setToppings(initialData.toppings);
    }
  }, [initialData]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleChangeSize = (event: SelectChangeEvent<string>) => setSize(event.target.value as string);
  const handleChangeToppings = (event: unknown, value: Topping[]) => setToppings(value);

  const handleSave = () => {
    if (!name || !size || !toppings.length) {
      return alert("Check that your pizza has a name, size, and at least one topping.");
    }

    const pizza = {
      id: initialData?.id || crypto.randomUUID(),
      name,
      size,
      toppings,
    };

    if (pizzaExists(pizza)) {
      alert("Duplicate pizza already exists");
    } else {
      onSave(pizza);
      if (!initialData) {
        setName("");
        setSize("Small");
        setToppings([]);
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField label="Name" value={name} onChange={handleChangeName} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Size</InputLabel>
          <Select value={size} label="Size" onChange={handleChangeSize}>
            <MenuItem value="Small">Small (10 in) - ${PIZZA_SIZE_PRICES.Small}</MenuItem>
            <MenuItem value="Medium">Medium (12 in) - ${PIZZA_SIZE_PRICES.Medium}</MenuItem>
            <MenuItem value="Large">Large (14 in) - ${PIZZA_SIZE_PRICES.Large}</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          options={availableToppings}
          disableCloseOnSelect
          onChange={handleChangeToppings}
          value={toppings}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected, index }) => (
            <li {...props} key={`${option.title}-${index}`}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                className="mr-2"
                checked={selected}
              />
              {option.emoji} {option.title}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="Toppings" />}
          renderTags={(value) =>
            value.map((option) => (
              <Chip
                key={option.title}
                icon={<Avatar className="!w-6 !h-6">{option.emoji}</Avatar>}
                label={option.title}
              />
            ))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPizza;
