import styled from "styled-components";

export const DivLogin = styled.div`
    background-color: aqua;
    display: flex;
    justify-content: center;

    h1 {
        text-align: center;
        background-color: transparent;
        font-size: 20px;
        color: white;
    }

    form {
        width: 50vw;
        max-width: 600px;
        display: flex;
        flex-direction: column;

        div {
            text-align: end;
        }
    }

    p {
        font-size: max(18px, 1.3vw);
        color: white;
    }

    input {
        width: 45vw;
        max-width: 550px;

        margin: auto;
        border: none;
        border-bottom: 1px solid  #6d6c6c;
        outline: none;
        color: #6d6c6c;
    }

    @media screen and (max-width: 768px) {
        background-color: red;

        form {
            width: 95vw;
        }

        input {
            width: 90vw;
        }
    }

    
`