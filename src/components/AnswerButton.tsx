import { ListItem, ListItemText, Theme } from '@material-ui/core';
import { makeStyles, createStyles, darken } from '@material-ui/core/styles';
import clsx from 'clsx';
import parse from 'html-react-parser';

import { theme } from 'styles/theme';

type Variants = 'correct' | 'wrong' | 'default';

type AnswerButtonProps = {
  sentence: string;
  variant?: Variants;
  onClick?: () => void;
};

type StylesProps = {
  variant: Variants;
};

type VariantColors = {
  [K in Variants]: {
    regular: string;
    hover: string;
  };
};

const variantColors: VariantColors = {
  correct: {
    regular: theme.palette.success.main,
    hover: darken(theme.palette.success.main, 0.2),
  },
  wrong: {
    regular: theme.palette.error.main,
    hover: darken(theme.palette.error.main, 0.2),
  },
  default: {
    regular: theme.palette.grey[600],
    hover: darken(theme.palette.grey[600], 0.2),
  },
};

const useStyles = makeStyles((muiTheme: Theme) =>
  createStyles({
    listItem: {
      borderRadius: muiTheme.spacing(0.5),

      '& + &': {
        marginTop: muiTheme.spacing(2),
      },
    },

    coloration: ({ variant }: StylesProps) => ({
      backgroundColor: variantColors[variant].regular,

      '&:hover, &:focus': {
        backgroundColor: variantColors[variant].hover,
      },
    }),
  })
);

export function AnswerButton({
  sentence,
  variant = 'default',
  onClick,
}: AnswerButtonProps) {
  const styles = useStyles({ variant });

  return (
    <ListItem
      button
      className={clsx(styles.listItem, styles.coloration)}
      onClick={onClick}
    >
      <ListItemText primary={parse(sentence)} />
    </ListItem>
  );
}
