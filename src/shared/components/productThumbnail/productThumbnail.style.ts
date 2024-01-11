/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {theme} from '../../themes/theme';
interface ContainerProps {
    margin?: string;
}

export const ProductThumbernailContainer = styled.TouchableOpacity<ContainerProps>`
  height: 172px;
  border-radius: 4px;
  width: 144px;
  border: 1px solid ${theme.colors.grayTheme.gray80};
  padding: 8px;
  margin: ${(props: { margin: any; }) => props.margin || '0px'};

`;
export const ProductImage = styled.Image`
 width: 100%;
 height: 50px;
 margin-bottom: 8px;
 border-radius: 4px;
`;
export const ProductInsertCart = styled.TouchableOpacity`
width: 142px;
background-color: ${theme.colors.mainTheme.primary};
align-items: center;
justify-content: center;
height: 32px;
position: absolute;
bottom: 0px;
border-bottom-left-radius: 3px;
border-bottom-right-radius: 3px;
left: 0px;
`;
