/* eslint-disable prettier/prettier *//* eslint-disable react/react-in-jsx-scope */

import {
  Alert,
  ModalProps as ModalPropsReact,
  Modal as ModalReact,
  View,
} from 'react-native';
import Text from '../text/Text';
import { ContainerModal, IconCloseModal } from './Modal.style';
import { theme } from '../../themes/theme';
import { textTypes } from '../text/textTypes';
import Button from '../button/Button';
import React from 'react';
interface ModalProps extends ModalPropsReact {
  title: string;
  text: string;
  onCloseModal: () => void;
}
const Modal = ({title, text, onCloseModal, ...props}: ModalProps) => {

  return (
    <ModalReact
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        Alert.alert('Modal has been close.');
        onCloseModal();
      }}
      {...props}>
      <ContainerModal>
        <Text type={textTypes.PARAGRAPH_SEMI_BOLD} color={theme.colors.mainTheme.primary} customMargin="16px">{title}</Text>
        <IconCloseModal onPress={onCloseModal} name="cross"/>
        <View>
          <Text>{text}</Text>
          <Button title="OK" onPress={onCloseModal}/>
        </View>
      </ContainerModal>
    </ModalReact>
  );
};
export default Modal;
