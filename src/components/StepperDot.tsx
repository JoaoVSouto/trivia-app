import { Box, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { theme } from 'styles/theme';

type Variants = 'current' | 'wrong' | 'correct' | 'default';

type StepperDotProps = {
  variant?: Variants;
};

type StylesProps = {
  variant: Variants;
};

type VariantColors = {
  [K in Variants]: string;
};

const variantColors: VariantColors = {
  correct: theme.palette.success.main,
  current: theme.palette.info.main,
  default: theme.palette.grey[600],
  wrong: theme.palette.error.main,
};

const useStyles = makeStyles((muiTheme: Theme) =>
  createStyles({
    root: ({ variant }: StylesProps) => ({
      width: muiTheme.spacing(1),
      height: muiTheme.spacing(1),
      borderRadius: '50%',
      backgroundColor: variantColors[variant],
    }),
  })
);

export function StepperDot({ variant = 'default' }: StepperDotProps) {
  const styles = useStyles({ variant });

  return <Box className={styles.root} />;
}
