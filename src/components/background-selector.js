import React, { useState } from 'react';
import styled from 'styled-components';
import Color from 'color';

const DotsWrapper = styled.div`
  height: 100%;
  display: flex;
`;

const DotsColumn = styled.div`
  & + .DotsColumn {
    margin-left: 4px;
  }

  .Dot + .Dot {
    margin-top: 4px;
  }
`;

const Dot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  box-shadow: inset 0 0 0.5px 2px var(--borderColor);
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.selected &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 20%; // Adjust this value to move the triangle up or down
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent; // Adjust size of the triangle
      border-right: 6px solid transparent;
      border-bottom: 8px solid ${
        Color(props.color).luminosity() < 0.5 ? 'white' : 'black'
      };
    }
  `}
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  margin-bottom: 16px;
  min-height: 32px;
`;

const getBorderColor = (color) => {
  return Color(color).luminosity() < 0.5 ? 'hsla(0,0%,100%,0.15)' : 'hsla(0,0%,0%,0.15)';
};

const BackgroundSelector = ({ setBgColor, darkColors, lightColors, lightColorsAmount }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color, colorCode) => {
    setBgColor(colorCode);
    setSelectedColor(color);
  };

  return (
    <React.Fragment>
      <Title>Background</Title>
      <DotsWrapper>
        <DotsColumn className="DotsColumn">
          <Dot
            className="Dot"
            color="black"
            onClick={() => handleColorSelect('black', 'black')}
            selected={selectedColor === 'black'}
            style={{ '--borderColor': getBorderColor('black') }}
          />
          <Dot
            className="Dot"
            color="white"
            onClick={() => handleColorSelect('white', 'white')}
            selected={selectedColor === 'white'}
            style={{ '--borderColor': getBorderColor('white') }}
          />
        </DotsColumn>
        <DotsColumn className="DotsColumn">
          {darkColors.map((color, index) => {
            if (index < 2) {
              return (
                <Dot
                  className="Dot"
                  key={index}
                  color={color}
                  onClick={() => handleColorSelect(color, `d-${index}`)}
                  selected={selectedColor === color}
                  style={{ '--borderColor': getBorderColor(color) }}
                />
              );
            }
            return null;
          })}
        </DotsColumn>
        <DotsColumn className="DotsColumn">
          {lightColors.map((color, index) => {
            if (index > lightColorsAmount - 3) {
              return (
                <Dot
                  className="Dot"
                  key={index}
                  color={color}
                  onClick={() => handleColorSelect(color, `l-${lightColorsAmount - index - 1}`)}
                  selected={selectedColor === color}
                  style={{ '--borderColor': getBorderColor(color) }}
                />
              );
            }
            return null;
          })}
        </DotsColumn>
      </DotsWrapper>
    </React.Fragment>
  );
};

export default BackgroundSelector;
