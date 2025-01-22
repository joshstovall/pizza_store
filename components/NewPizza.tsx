import { useState } from 'react';
import availableToppings from '../const/availableToppings';
import { Autocomplete, Avatar, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type Topping = {
  title: string;
  emoji: string;
  price: number;
};

interface PizzaProps {
  id: string;
  name: string;
  size: string;
  toppings: Topping[];
}

interface NewPizzaProps {
  saveCallback: (pizza: PizzaProps) => void;
  pizzaExists: (pizza: PizzaProps) => boolean;
}

const NewPizza = ({ saveCallback, pizzaExists }: NewPizzaProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [size, setSize] = useState('Small');
  const [toppings, setToppings] = useState<Topping[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleChangeSize = (event: SelectChangeEvent<string>) => setSize(event.target.value as string);
  const handleChangeToppings = (event: unknown, value: Topping[]) => setToppings(value);

  const handleSave = () => {
    if (!name || !size || !toppings.length) {
      return alert('Check that your pizza has a name, size, and at least one topping.');
    }

    const newPizza = {
      id: crypto.randomUUID(),
      name,
      size,
      toppings,
    };

    if (pizzaExists(newPizza)) {
      alert('Duplicate pizza already exists');
    } else {
      saveCallback(newPizza);
      setName('');
      setSize('Small');
      setToppings([]);
      handleClose();
    }
  };

  return (
    <>
      <div className="text-center pt-5 my-8">
        <Button variant="outlined" onClick={handleOpen}>
          Add New Pizza
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new pizza below 🍕</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField label="Name" value={name} onChange={handleChangeName} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select value={size} label="Size" onChange={handleChangeSize}>
              <MenuItem value="Small">Small (10 in)</MenuItem>
              <MenuItem value="Medium">Medium (12 in)</MenuItem>
              <MenuItem value="Large">Large (14 in)</MenuItem>
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
              <li
                {...props}
                key={`${option.title}-${index}`}
              >
                <Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} style={{ marginRight: 8 }} checked={selected} />
                {option.emoji} {option.title}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Toppings" />}
            renderTags={(value) =>
              value.map((option) => (
                <Chip key={option.title} icon={<Avatar sx={{ width: 24, height: 24 }}>{option.emoji}</Avatar>} label={option.title} />
              ))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewPizza;
