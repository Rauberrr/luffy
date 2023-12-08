import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        background-color: ${(props) => props.theme.color.black };
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`