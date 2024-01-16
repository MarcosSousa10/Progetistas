/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export const ImagelogPrincipal = styled.Image`
  width: 100%;
 height: 100px;
  margin-bottom: 0px;
`;
export const ContainerPrincipal = styled.ScrollView`
   flex: 1;
`;

export const ViewPrincipalCondicao = styled.View`
flex-direction: row;
padding: 1px;
align-items: center;
align-content: center;
border-width:3px;
border-radius:10px;
margin-bottom:10px;
`;
export const ViewPrincipalCondicaoColumn = styled.View`
flex-direction: column;
padding: 10px;
align-content: center;
border-right-width:1px;
min-width:80%;
max-width:85%;
`;
export const  ViewPrincipalrCentro = styled.View`
align-items: flex-start;
`;
export const  ViewPrincipalCenter = styled.View`
align-items: center;
`;
export const  TextPrincipal = styled.Text`
margin-left: 5px;
font-size: 12px;
`;
export const  TextPrincipalF = styled.Text`
font-size: 12px;
`;
export const  ViewPrincipalLoading = styled.View`
flex: 1;
margin-top: 50%;
justify-content: center;
align-items: center; 
`;
