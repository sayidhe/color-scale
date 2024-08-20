import React, { useState } from 'react';
import styled from 'styled-components';
import Color from 'color';
import ColorBlock from './color-block';
import { isValidHex, numberToHex, errorColor, getContrastRatio, checkAaCompliance, checkAaaCompliance } from '../utils';

const ColorBlocksRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 88px;
  ${(props) => props.disabled && `pointer-events: none`};
`;

const ColorContainer = styled.div`
  position: relative;
  margin: 0 8px;
  ${(props) =>
    props.main &&
    `
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
      border-bottom: 16px solid ${
        Color(props.color).luminosity() < 0.5 ? 'white' : 'black'
      };
    }
  `}
`;

const Tooltip = ({ show, rows, position }) => {
  if (!show) {
    return null;
  }

  const defaultPosition = { top: '20px', left: '50%', transform: 'translateX(-50%)' };
  const finalPosition = position || defaultPosition;

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '5px',
        zIndex: 1,
        width: 'auto',
        ...finalPosition,
        whiteSpace: 'nowrap',
        textAlign: 'left',
      }}
    >
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: '2px 5px', fontWeight: 'bold' }}>{row.label}:</td>
              <td style={{ padding: '2px 5px' }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ColorInfo = ({ color, bgColor, main }) => {
  const contrastRatio = getContrastRatio(color, bgColor);
  const AA = checkAaCompliance(contrastRatio);
  const AAA = checkAaaCompliance(contrastRatio);

  const [showAaTooltip, setShowAaTooltip] = useState(false);
  const [showAaaTooltip, setShowAaaTooltip] = useState(false);

  const aaRows = [
    { label: 'Regular text(<24px/19px bold)', value: `(${AA === 'AA Pass' ? 'Pass' : 'Fail'}) Minimum: 4.5` },
    { label: 'Large text(>24px/19px bold)', value: `(${contrastRatio >= 3 ? 'Pass' : 'Fail'}) Minimum: 3` },
  ];

  const aaaRows = [
    { label: 'UI Components & graphics', value: `(${AAA === 'AAA Pass' ? 'Pass' : 'Fail'}) Minimum: 7` },
  ];

  return (
    <ColorContainer main={main} color={color}>
      <ColorBlock style={{ background: color }} hasValidColor={isValidHex(color)} color={color} />
      <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '30px' }}>
        <div>{contrastRatio.toFixed(2)}</div>
        <div
          onMouseOver={() => setShowAaTooltip(true)}
          onMouseOut={() => setShowAaTooltip(false)}
          style={{ position: 'relative' }}
        >
          {AA}
          <Tooltip show={showAaTooltip} rows={aaRows} />
        </div>
        <div
          onMouseOver={() => setShowAaaTooltip(true)}
          onMouseOut={() => setShowAaaTooltip(false)}
          style={{ position: 'relative' }}
        >
          {AAA}
          <Tooltip show={showAaaTooltip} rows={aaaRows} />
        </div>
      </div>
    </ColorContainer>
  );
};

const ColorsRow = ({ mainColor, darkColors, lightColors, bgColor, disabled }) => {
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
};

export default ColorsRow;
