import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import PizzaEditor from "./EditPizza";
import { PizzaButtonProps } from "../types";

const PizzaButton = ({
  onSave,
  pizzaExists,
  buttonText,
  variant,
  className,
  initialData,
  dialogTitle,
  startIcon,
  icon
}: PizzaButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {icon ? (
        <IconButton
          onClick={() => setOpen(true)}
          className={className}
          size="small"
        >
          {icon}
        </IconButton>
      ) : (
        <Button
          variant={variant}
          onClick={() => setOpen(true)}
          className={className}
          startIcon={startIcon}
        >
          {buttonText}
        </Button>
      )}
      <PizzaEditor
        open={open}
        onClose={() => setOpen(false)}
        onSave={onSave}
        pizzaExists={pizzaExists}
        initialData={initialData}
        title={dialogTitle}
      />
    </>
  );
};

export default PizzaButton;
