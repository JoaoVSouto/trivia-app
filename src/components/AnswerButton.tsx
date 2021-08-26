import { ListItem, ListItemText, Theme } from '@material-ui/core';
import { makeStyles, createStyles, darken } from '@material-ui/core/styles';
import clsx from 'clsx';
import parse from 'html-react-parser';

import { theme } from 'styles/theme';

export type Variants = 'correct' | 'wrong' | 'default';

type AnswerButtonProps = {
  sentence: string;
  showcase?: boolean;
  variant?: Variants;
  onClick?: () => void;
};

type StylesProps = {
  showcase: boolean;
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

const useStyles = makeStyles<Theme, StylesProps>(muiTheme =>
  createStyles({
    listItem: {
      borderRadius: muiTheme.spacing(0.5),
    },

    coloration: ({ variant }) => ({
      backgroundColor: variantColors[variant].regular,

      '&:hover, &:focus': {
        backgroundColor: variantColors[variant].hover,
      },
    }),

    spacing: ({ showcase }) => ({
      '& + .MuiListItem-button': {
        marginTop: muiTheme.spacing(showcase ? 1 : 2),
      },
    }),
  })
);

export function AnswerButton({
  sentence,
  variant = 'default',
  showcase = false,
  onClick,
}: AnswerButtonProps) {
  const styles = useStyles({ variant, showcase });

  return (
    <ListItem
      button
      className={clsx(styles.listItem, styles.coloration, styles.spacing)}
      onClick={onClick}
    >
      <ListItemText primary={parse(sentence)} />
    </ListItem>
  );
}
