import { useState } from 'react';
import availableToppings from '../const/availableToppings';
import { Autocomplete, Avatar, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const NewPizza = ({ saveCallback, pizzaExists }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [size, setSize] = useState('Small');
  const [toppings, setToppings] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSize = (event) => setSize(event.target.value);
  const handleChangeToppings = (event, value) => setToppings(value);

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
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.title}>
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
