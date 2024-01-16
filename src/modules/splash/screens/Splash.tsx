/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { ContainerSplash, ImagelogSplash } from '../styles/splash.style';

import React from 'react';
import { useSplash } from '../hooks/useSplash';
const Splash = () => {
    const {handleOnPress } = useSplash();

    useEffect(() => {
        handleOnPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ContainerSplash >
            <ImagelogSplash
                resizeMode="contain"
                source={require('../../../assets/images/2021_logo-luminato_othon-de-carvalho_page-0002-removebg-preview.png')}
            />
        </ContainerSplash>);
};
export default Splash;
