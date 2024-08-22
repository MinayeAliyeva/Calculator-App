import * as React from "react";
import { Button as BaseButton } from "@mui/base/Button";
import { styled } from "@mui/system";

interface IBtn {
  content: string;
  onClick: () => void;
}
export default function CalcBtn({ content, onClick }: IBtn) {
  return <Button onClick={onClick}>{content}</Button>;
}

const mustard = {
  200: "#FFD966",
  300: "#FFC933",
  400: "#FFB800",
  500: "#E6A500",
  600: "#CC9400",
  700: "#B38300",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${mustard[500]};
  padding: 18px 26px;
  border-radius: 100px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${mustard[500]};


  &:hover {
    background-color: ${mustard[600]};
  }

  &:active {
    background-color: ${mustard[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? mustard[300] : mustard[200]
    };
    outline: none;
  }

  &.base--disabled {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
`
);
