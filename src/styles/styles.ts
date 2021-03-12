import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body,input,button{
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600px;
    font-size: 14px;

    background-color: #f5f5f5;
  }
`;
