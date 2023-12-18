import styled from "styled-components";

export const DivLogin = styled.div`
    display: flex;
    justify-content: center;

    h1 {
        text-align: center;
        font-size: max(23px, 2vw);
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

    .bottom {
        margin-bottom: 20px;
    }

    p {
        font-size: max(18px, 1vw);
        color: white;
    }

    input {
        width: 45vw;
        max-width: 550px;
        padding: 10px;
        margin: auto;
        border: none;
        border-bottom: 1px solid  #6d6c6c;
        outline: none;
        color: #6d6c6c;
        margin-bottom: max(20px, 2vw);
    }

    @media screen and (max-width: 768px) {

        form {
            width: 95vw;
        }

        input {
            width: 90vw;
        }
    }

    
`