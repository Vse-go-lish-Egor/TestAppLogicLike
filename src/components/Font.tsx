import React from 'react';
import { Text, TextProps } from 'react-native';

type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold'
  | 'normal';

interface FontProps extends TextProps {
  weight?: FontWeight;
  size?: number;
  color?: string;
  children: React.ReactNode;
}

export const Font: React.FC<FontProps> & {
  Weight800_12: React.FC<Omit<FontProps, 'weight' | 'size'>>;
  Weight800_14: React.FC<Omit<FontProps, 'weight' | 'size'>>;
  Weight800_18: React.FC<Omit<FontProps, 'weight' | 'size'>>;

} = ({
  weight = '400',
  size = 14,
  color = '#000',
  children,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: 'Nunito-Regular',
          fontWeight: weight,
          fontSize: size,
          color: color,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

Font.Weight800_12 = props => <Font weight="800" size={12} {...props} />;
Font.Weight800_14 = props => <Font weight="800" size={14} {...props} />;
Font.Weight800_18 = props => <Font weight="800" size={18} {...props} />;
