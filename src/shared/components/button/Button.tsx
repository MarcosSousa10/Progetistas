/* eslint-disable prettier/prettier */
import { TouchableOpacityProps } from 'react-native';
import { ActivityIndicatorButton, ButtonContainer, ButtonDisabled, ButtonSecondary, GrandientButton } from './button.syle';
import Text from '../text/Text';
import { theme } from '../../themes/theme';
import { textTypes } from '../text/textTypes';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  margin?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}
const Button = ({ title, type, loading, disabled, margin, onPress, ...props }: ButtonProps) => {
  const handleOnPress = ()=>{
    if (!loading && !disabled && onPress){
      onPress();
    }
  }
  const renderText = (color: string | undefined) => {
    return (
      <>
        <Text type={textTypes.BUTTON_SEMI_BOLD} color={color}>
          {title}
        </Text >
        {loading && <ActivityIndicatorButton  color={theme.colors.neutraTheme.white} />}
      </>
    );
  };
  if (disabled) {
    return(
      <ButtonDisabled  {...props} margin={margin}  >
                  {renderText(theme.colors.neutraTheme.white)}
      </ButtonDisabled>
    )
  }
  switch (type) {
    case theme.buttons.buttonsTheme.secondary:
      return (
        <ButtonSecondary {...props} margin={margin} onPress={handleOnPress}>
          {renderText(theme.colors.neutraTheme.darkGray)}
        </ButtonSecondary>
      );
    case theme.buttons.buttonsTheme.primary:
    default:
      return (
        <ButtonContainer margin={margin} {...props} onPress={handleOnPress}>
          <GrandientButton
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={[
              theme.colors.neutraTheme.darkBlack,
              theme.colors.neutraTheme.gray,
            ]}>
            {renderText(theme.colors.neutraTheme.white)}
          </GrandientButton>
        </ButtonContainer>
      );
  }
};
export default Button;
