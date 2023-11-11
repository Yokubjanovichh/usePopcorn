import * as React from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const labels = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ onRating }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "gold",
        fontWeight: "600",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        max={10}
        defaultValue={0}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          onRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        icon={<StarRoundedIcon style={{ color: "gold", fontSize: "25px" }} />}
        emptyIcon={<StarOutlineRoundedIcon style={{ opacity: 0.55, color: "gold", fontSize: "25px" }} fontSize="inherit" />}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
}
