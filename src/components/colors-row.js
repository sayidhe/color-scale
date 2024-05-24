import React from 'react';
import styled from 'styled-components';
import ColorBlock from './color-block';
import Color from 'color'
import { isValidHex, numberToHex, errorColor, getContrastRatio, checkWcagCompliance } from '../utils';

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 88px;
  ${props => props.disabled && `pointer-events: none`};
`

const ColorContainer = styled.div`
  position: relative;
  margin: 0 8px;
  ${props => props.main && `
    &::after {
      content: '';
      position: absolute;
      top: 50px; // Adjust this value to move the triangle up or down
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 10px solid transparent; // Adjust size of the triangle
      border-right: 10px solid transparent;
      border-bottom: 16px solid black; // Adjust color to match your theme
    }
  `}
`;

const ColorInfo = ({ color, bgColor, main }) => {
  const contrastRatio = getContrastRatio(color, bgColor);
  const { AA, AAA } = checkWcagCompliance(contrastRatio);

  return (
    <ColorContainer main={main}>
      <ColorBlock style={{ background: color }} hasValidColor={isValidHex(color)} color={color} />
      <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '30px' }}>
        <div>{contrastRatio.toFixed(2)}</div>
        <div>{AA}</div>
        <div>{AAA}</div>
      </div>
    </ColorContainer>
  );
};

const ColorsRow = ({
  mainColor,
  darkColors,
  lightColors,
  bgColor,
  disabled
}) => {
  const mainHexColor = isValidHex(numberToHex(mainColor)) ? numberToHex(mainColor) : errorColor;

  return (
    <ColorBlocksRow disabled={disabled}>
      {darkColors.map((color, index) => (
        <ColorInfo key={`dark-${index}`} color={Color(color).hex()} bgColor={bgColor} />
      ))}

      <ColorInfo color={mainHexColor} bgColor={bgColor} main={true} />

      {lightColors.map((color, index) => (
        <ColorInfo key={`light-${index}`} color={Color(color).hex()} bgColor={bgColor} />
      ))}
    </ColorBlocksRow>
  );
}

export default ColorsRow;
