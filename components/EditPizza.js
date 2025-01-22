import { useState } from 'react';
import { Autocomplete, Avatar, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import availableToppings from '../const/availableToppings';

const EditPizza = ({ id, name, size, toppings, saveCallback, pizzaExists }) => {
  const [open, setOpen] = useState(false);
  const [_name, setName] = useState(name);
  const [_size, setSize] = useState(size);
  const [_toppings, setToppings] = useState(toppings);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSize = (event) => setSize(event.target.value);
  const handleChangeToppings = (event, value) => setToppings(value);

  const handleSave = () => {
    if (!_name || !_size || !_toppings.length) {
      return alert('Check that your pizza has a name, size, and at least one topping.');
    }

    const updatedPizza = {
      id,
      name: _name,
      size: _size,
      toppings: _toppings,
    };

    if (pizzaExists(updatedPizza)) {
      alert('Duplicate pizza already exists');
    } else {
      saveCallback(updatedPizza);
      handleClose();
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit pizza below 🍕</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField label="Name" value={_name} onChange={handleChangeName} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select value={_size} label="Size" onChange={handleChangeSize}>
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
            value={_toppings}
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

export default EditPizza;
