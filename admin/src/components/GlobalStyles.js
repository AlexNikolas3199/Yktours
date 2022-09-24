import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: whitesmoke;
    }

    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 200px;
    }
    .flex{
        display: flex;
        align-items: flex-end;
    }

    .cdx-notifies {
        z-index: 10;
    }
`
