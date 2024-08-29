import type { ColorMode } from '@digdir/designsystemet/color';
import cl from 'clsx/lite';

import { useThemeStore } from '../../store';
import { Scale } from '../Scale/Scale';

import classes from './Scales.module.css';

type ScalesProps = {
  themeMode: ColorMode;
};

export const Scales = ({ themeMode }: ScalesProps) => {
  const accentTheme = useThemeStore((state) => state.accentTheme);
  const neutralTheme = useThemeStore((state) => state.neutralTheme);
  const brandOneTheme = useThemeStore((state) => state.brandOneTheme);
  const brandTwoTheme = useThemeStore((state) => state.brandTwoTheme);
  const brandThreeTheme = useThemeStore((state) => state.brandThreeTheme);
  return (
    <div className={classes.rows}>
      <div className={classes.row}>
        <div className={classes.scaleLabel}>Accent</div>
        <Scale
          colorScale={accentTheme.theme[themeMode]}
          showHeader
          showColorMeta={false}
          themeMode={themeMode}
          type='accent'
        />
      </div>
      <div className={classes.row}>
        <div className={classes.scaleLabel}>Neutral</div>
        <Scale
          colorScale={neutralTheme.theme[themeMode]}
          showColorMeta={false}
          themeMode={themeMode}
          type='neutral'
        />
      </div>

      <div className={cl(classes.row, classes.brandRow)}>
        <div className={classes.scaleLabel}>Brand 1</div>
        <Scale
          colorScale={brandOneTheme.theme[themeMode]}
          showColorMeta={false}
          themeMode={themeMode}
          type='brand1'
        />
      </div>
      <div className={classes.row}>
        <div className={classes.scaleLabel}>Brand 2</div>
        <Scale
          colorScale={brandTwoTheme.theme[themeMode]}
          showColorMeta={false}
          themeMode={themeMode}
          type='brand2'
        />
      </div>

      <div className={classes.row}>
        <div className={classes.scaleLabel}>Brand 3</div>
        <Scale
          colorScale={brandThreeTheme.theme[themeMode]}
          showColorMeta={false}
          themeMode={themeMode}
          type='brand3'
        />
      </div>
    </div>
  );
};
