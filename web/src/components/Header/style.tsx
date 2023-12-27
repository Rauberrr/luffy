/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";

export const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.color.black};
    width: 100vw;
    color: white;
    margin-bottom: min(20vw, 200px);

    div {
        display: flex;
    }

    @media screen and (max-width: 568px) {
        justify-content: space-between;
        padding: 0px 10px;
    }
`

export const DivFlex = styled.div`
    display: flex;
    align-items: center;
`

export const H1 = styled.h1`
    @font-face {
        font-family: 'TonnyLine';
        src: url('./src/assets/font/tonny.woff')
    }

    font-family: 'TonnyLine';
    font-size: ${(props) => props.theme.size.logo};
`

interface imgProps {
    borderRadius?: string
}

export const Img = styled.img<imgProps>`
    width: max( ${(props) => props.width ? props.width : '3vw'}, 40px );
    height: max( ${(props) => props.height ? props.height : '3vw'}, 40px );
    border-radius: max( ${(props) => props.borderRadius ? props.borderRadius : '1.5vw'}, 20px);
`