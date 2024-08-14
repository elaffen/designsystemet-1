import type { CssColor } from '@adobe/leonardo-contrast-colors';
import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';
import {
  calculateContrastOneColor,
  getContrastFromHex,
  getContrastFromLightness,
} from '@digdir/designsystemet/color';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import cl from 'clsx/lite';
import { useEffect, useState } from 'react';

import classes from './BaseContrastOverview.module.css';
export const BaseContrastOverview = () => {
  const [blueColors, setBlueColors] = useState<CssColor[]>([]);

  const [greenColors, setGreenColors] = useState<CssColor[]>([]);
  const [purpleColors, setPurpleColors] = useState<CssColor[]>([]);
  useEffect(() => {
    const blue = GenerateColor('#0163BA');
    setBlueColors(blue);

    const green = GenerateColor('#38D41F');
    setGreenColors(green);
    const purple = GenerateColor('#9A1FD4');
    setPurpleColors(purple);
  }, []);

  const GenerateColor = (color: CssColor) => {
    const leoBackgroundColor = new BackgroundColor({
      name: 'backgroundColor',
      colorKeys: ['#ffffff'],
      ratios: [1],
    });

    let lightnessScale: number[] = [];

    lightnessScale = [
      90, 87, 84, 81, 78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39,
      36, 33, 30, 27, 24, 21, 18,
    ];

    const getColorContrasts = (
      color: CssColor,
      lightnessScale: number[],
      backgroundColor: CssColor,
    ) => {
      return lightnessScale.map((lightness) =>
        getContrastFromLightness(lightness, color, backgroundColor),
      );
    };

    const leoColor = new Color({
      name: 'color',
      colorKeys: [color],
      ratios: [
        ...getColorContrasts(
          color,
          lightnessScale,
          leoBackgroundColor.colorKeys[0],
        ),
      ],
    });

    const theme = new Theme({
      colors: [leoColor],
      backgroundColor: leoBackgroundColor,
      lightness: 100,
    });

    return theme.contrastColorValues;
  };

  type BoxProps = {
    color: CssColor;
  };

  const Box = ({ color }: BoxProps) => {
    return (
      <div>
        <div
          className={classes.box}
          style={{
            backgroundColor: color,
            color: calculateContrastOneColor(color),
          }}
        >
          <CheckmarkIcon title='a11y-title' fontSize='3.5rem' />
        </div>
        <div className={classes.contrastBox}>
          <div className={cl(classes.contrastCircle)}></div>
          <div>{getContrastFromHex(color, '#ffffff').toFixed(1)}</div>
        </div>
        <div className={classes.contrastBox}>
          <div
            className={cl(classes.contrastCircle, classes.contrastCircleBlack)}
          ></div>
          <div>{getContrastFromHex(color, '#000000').toFixed(1)}</div>
        </div>
      </div>
    );
  };

  const BoxContainer = ({ colors }: { colors: CssColor[] }) => {
    return (
      <div className={classes.boxContainers}>
        <div className={cl(classes.boxContainer, classes.white)}>
          {colors.map((color, index) => (
            <Box key={index} color={color} />
          ))}
        </div>
        {/* <div className={cl(classes.boxContainer, classes.dark)}>
          {colors.map((color, index) => (
            <Box
              key={index}
              color={color}
            />
          ))}
        </div> */}
      </div>
    );
  };

  return (
    <div className={classes.content}>
      <BoxContainer colors={blueColors} />
      <BoxContainer colors={greenColors} />
      <BoxContainer colors={purpleColors} />
    </div>
  );
};
