import React from 'react';
import { Button } from '@mui/material';
import { ICalckBtn } from '../types/interface';

const CalcBtn = ({ content, onClick }:ICalckBtn) => {
  const operators = ["+", "-", "*", "/", "="];
  const isOperator = operators.includes(content);
  const isSpecial = content === 'C' || content === 'AC';

  return (
    <Button
      onClick={onClick}
      sx={{
        width: '92%', 
        height: '72px',
        margin: '8px 5px', 
        borderRadius: '50%',
        fontSize: '28px',
        backgroundColor: isOperator
          ? '#FF9500' 
          : isSpecial
          ? '#D4D4D2'
          : '#333333',
        color: '#fff', 
        '&:hover': {
          backgroundColor: isOperator
            ? '#FF9500'
            : isSpecial
            ? '#D4D4D2'
            : '#505050', 
        },
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', 
      }}
    >
      {content}
    </Button>
  );
};

export default CalcBtn;
