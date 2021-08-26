import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Theme,
} from '@material-ui/core';
import { makeStyles, createStyles, darken } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { AnswerButton, Variants as AnswerButtonVariants } from './AnswerButton';

type Answer = {
  sentence: string;
  variant: AnswerButtonVariants;
};

type QuestionCollapseProps = {
  number: number;
  correct: boolean;
  title: string;
  answers: Answer[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0.5),

      '& + &': {
        marginTop: theme.spacing(2),
      },
    },

    collapseOpener: {
      backgroundColor: theme.palette.grey[700],

      '&:hover, &:focus': {
        backgroundColor: darken(theme.palette.grey[700], 0.15),
      },
    },

    questionMetadata: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',

      '& .MuiListItemText-root': {
        flex: 'unset',
        marginRight: theme.spacing(1),
      },
    },

    wrongIcon: {
      color: theme.palette.error.main,
    },

    questionTitle: {
      marginTop: theme.spacing(1),
    },
  })
);

export function QuestionCollapse({
  number,
  correct,
  title,
  answers,
}: QuestionCollapseProps) {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  function handleToggleOpen() {
    setIsOpen(state => !state);
  }

  return (
    <div className={styles.root}>
      <ListItem
        className={styles.collapseOpener}
        button
        onClick={handleToggleOpen}
      >
        <div className={styles.questionMetadata}>
          <ListItemText primary={`Question ${number}`} />
          {correct ? (
            <CheckCircleOutlineIcon color="secondary" />
          ) : (
            <HighlightOffIcon className={styles.wrongIcon} />
          )}
        </div>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto">
        <Typography className={styles.questionTitle}>{title}</Typography>
        <List>
          {answers.map(answer => (
            <AnswerButton
              key={answer.sentence}
              showcase
              sentence={answer.sentence}
              variant={answer.variant}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
}
