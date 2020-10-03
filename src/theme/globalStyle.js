import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background: rgba(0,0,0,0.03) !important;
  }
  
  #root, body, html {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
  }

  hr {
    width: 100%;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
  }

  button:focus {
    outline: 0 !important;
  }

  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  .modal {
    display: flex !important;
  }

  .modal-dialog {
    flex: 1;
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100% !important;
  }
  
  .modal-content {
    max-width: 500px;
  }

  .te-mode-switch-section {
    display: none !important;
  }

  .tui-editor-contents pre {
    ${(props) => props.theme.whiteBox};
  }

  .tui-editor-contents img {
    width: 100%;
  }
`

export default GlobalStyle
