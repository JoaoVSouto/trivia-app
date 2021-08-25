import { ListItem, ListItemText, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
  [K in Variants]: string;
};

const variantColors: VariantColors = {
  correct: theme.palette.success.main,
  default: theme.palette.grey[600],
  wrong: theme.palette.error.main,
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
      backgroundColor: variantColors[variant],
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
