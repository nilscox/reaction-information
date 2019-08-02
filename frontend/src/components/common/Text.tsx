import React from 'react';

import { Theme, useTheme } from 'src/utils/Theme';

type TextVariant =
  | 'main-title'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'subject-title'
  | 'subject-quote'
  | 'note'
  | 'button';

export type TextProps = React.HTMLAttributes<HTMLDivElement> & {
  oneline?: boolean,
  variant?: TextVariant,
  align?: React.CSSProperties['textAlign'],
  style?: React.CSSProperties,
  children?: React.ReactNode,
};

const getStyles: (theme: Theme) => { [key in TextVariant]: React.CSSProperties } = theme => ({
  'main-title': {

  },
  title: {

  },
  subtitle: {

  },
  text: {

  },
  'subject-title': {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  'subject-quote': {

  },
  note: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  button: {
    fontWeight: 'bold',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
});

const onelineStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
};

const Text: React.FC<TextProps> = ({ oneline, variant = 'text', align, style, children, ...props }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <div
      style={{
        ...styles[variant],
        ...(oneline && onelineStyle),
        ...(align && { textAlign: align }),
        ...style,
      }}
      {...props}
    >
      { children }
    </div>
  );
};

export default Text;