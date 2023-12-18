import styled from "styled-components";

export const DivPost = styled.div`
    margin: auto;
    width: 50vw;
    color: white;
    border-bottom: 1px solid white;
    margin-bottom: 50px;

    @media screen and (max-width: 568px) {
        width: 90vw;
    }
`

export const DivImgTitle = styled.div`
    display: flex;
    align-items: center;
    color: white;
    margin: 3vh 0 1vh 0;
`

export const DivIcons = styled.div`
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    margin: 2vh 0;

    div {
        display: flex;
    }

    @media screen and (max-width: 568px) {
        /* div {
            width: 80vw;
        } */
    }
`



export const ImgIcons = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin: 0 2vw;
    
    &:hover {
        scale: 1.1;
    }
    /* &::after {
        content: ;
    } */
`

export const H2 = styled.h2`
    font-size: max(20px, 1.5vw);
    margin: 0 1vw;
    color: white;
`

export const P = styled.p`
    font-family: 'Tiro Bangla';
    font-size: max(16px, 1vw);
    color: white;
`

export const DivLuffy = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFFED;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    bottom: 3vh;
    right: 2vw;

    img {
        width: 30px;
        height: 30px;
        background-color: transparent;
    }
`

export const DivPopup = styled.div`
    position: fixed;
    
    width: 60vw;
    background-color: #FFFFFFF7;
    border-radius: 5px;
    top: 20vh;
    right: 20vw;
    padding: 1vw 2vw;

    div {
        display: flex;
        background-color: transparent;
    }

    @media screen and (max-width: 568px) {
        width: 90vw;
        right: 5vw;
    }
`

export const Input = styled.textarea`
    background-color: transparent;
    border: 0;
    outline: none;
    resize: none;
    word-wrap: break-word;
    margin: 1.8vh 0 0 2vw;
    width: 53vw;
    height: 20vh;

    &::placeholder {
        font-weight: bold;
    }
`

interface ButtonsProps {
    background?: string
    color?: string
}

export const Button = styled.button<ButtonsProps>`
    background-color: ${(props) => props.background ? props.background : 'transparent'};
    width: 15vw;
    max-width: 85px;
    min-width: 60px;
    height: auto;
    padding: 3px;
    border-radius: 1vw;
    color: ${(props) => props.color ? props.color : 'black'};
    border: 0;
`

export const DivButtons = styled.div`
    display: flex;
    justify-content: end;
`

export const Ul = styled.ul`



    li {
        display: flex;
        justify-content: center;
        font-size: max(13px, 0.5vw);
        background-color: #313333;
        list-style: none;
        /* padding: 0 0.3vw; */
        width: 5vw;
        max-width: 70px;
        min-width: 50px;
        cursor: pointer;
        
    }
`