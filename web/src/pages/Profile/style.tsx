import styled from "styled-components";

export const DivProfile = styled.div`
    width: 50vw;
    margin: auto;
    display: flex;
    align-items: center;
    margin-bottom: 2vw;

    div.img {
        text-align: center;

        p{
            font-size: max(10px, 1vw);
            color: #f4f4f4;
        }

    }

    div.texts {
        width: 30vw;
        margin: auto;
    }

    @media screen and (max-width: 568px) {
        width: 90vw;

        div.texts {
            width: 70vw;
        }
    }

    @media screen and (max-width: 368px) {
        flex-direction: column;
        text-align: center;
    }
`

export const ImgProfile = styled.img`
    width: 15vw;
    height: 15vw;
    min-width: 50px;
    min-height: 50px;
    border-radius: max(25px, 7.5vw);

    @media screen and (max-width: 368px) {
        min-width: 100px;
        min-height: 100px;
        border-radius: max(50px, 7.5vw);
    }

`

export const H1Profile = styled.h1`
    font-size: max(17px, 1.4vw);
    color: white;
`

export const PProfile = styled.p`
    font-size: max(13px, 0.4vw);
    color: #929292;

    @media screen and (max-width: 368px) {
        font-size: 10px;
    }

`

export const DivLikeLuffy = styled.div`
    display: flex;
    width: 30vw;
    margin: auto;
    justify-content: center;
    
    

    div {
        display: flex;
        align-items: center;
        color: white;
        margin: 0vw 3vw;
    }

    img {
        width: max(20px, 3vw);
        height: max(20px, 3vw);
        margin-right: 1vw;
    }

    @media screen and (max-width: 368px) {
        width: 40vw;
    }

`