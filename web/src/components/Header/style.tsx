import styled from "styled-components";

export const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.color.black};
    width: 100vw;
    color: white;
    
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
    border?: string
}

export const Img = styled.img<imgProps>`
    width: ${(props) => props.width ? props.width : '40px'};
    height:  ${(props) => props.height ? props.height : '40px'};
    border-radius: ${(props) => props.border ? 0 : '20px' };
`