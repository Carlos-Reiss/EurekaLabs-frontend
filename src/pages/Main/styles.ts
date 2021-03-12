import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

interface Props{
  isError: boolean;
  isLoading: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  @media(max-width: 800px){
    flex-direction: column;
  }
`;

const toLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-10%);


  }
  to{
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const Content = styled.div`

  @media(max-width: 800px){
    margin-top: 20%;
    padding: 40px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${toLeft} 1s;

  form{
    border: 1px solid #ededed;
    box-shadow: 0 1px 1px 0px #a3a3a3;
    border-radius: 8px;

    margin: 0px 30px 15px 30px;

    width: 380px;
    text-align: center;

    h2{
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      color: #333;

      border-left: 6px solid #a3a3a3;
    }
    svg  {
      margin-right: 12px;
    }
  }
`;

export const Data = styled.div<Props>`
    display: flex;
    flex-direction: column;
    margin: 20px 20px;


    input {

      text-align: center;

      color: #5e5e5e;

      border-radius: 4px;
      border: 0;

      box-shadow: 0 2px 0 0 ${(props) => (props.isError ? '#eb4034' : '#a3a3a3')};
      border-bottom: 1px solid ${(props) => (props.isError ? '#eb4034' : '#a3a3a3')};
      flex: 1;

      transition: box-shadow 150ms ease-out;

      &::placeholder {
        color: #5e5e5e;
      }

      svg {
        margin-right: 16px;
      }
    }

    button{
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      background: #5e5e5e;
      border-radius: 10px;
      padding: 0 16px;

      width: 100%;

      border: 0;

      color: #ededed;

      height: 56px;

      font-weight: 600;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#5e5e5e')};
      }
      cursor: ${(props) => (props.isLoading ? 'no-drop' : 'pointer')};
      /* cursor: no-drop; */
    }
`;

export const Details = styled.div`


  flex: 1;

  display: flex;
  justify-content: start;
  align-items: center;


  background-color: #f5f5f5;
  box-shadow: 1px 0 3px #a3a3a3;


  @media(max-width: 800px){
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

`;

const toRight = keyframes`
  0%{
    opacity: 0;
    transform: translateX(10%);


  }
  50%{
    opacity: 1;
    transform: translateX(-5%);
  }
  100%{
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const CEP = styled.div`

  z-index: 99;

  animation:${toRight} 1s;

  background: #fff;
  border-radius: 0 20px 20px 0;
  padding: 20px;
  width: 380px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  h2{
    margin-bottom: 12px;
  }

  div + div {
    line-height: 34px;
    display: flex;


    p{
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    p + p{
      margin-top: 4px;
      margin-left: 24px;
    }
  }

  transition: background 1s;
  transition: color 1s;


  @media(min-width: 800px){
    &:hover{
    background: transparent;
    color: transparent;
    cursor: no-drop;
  }
  }

`;

export const Map = styled.div`
  flex: 1;
  background: #f5f5f5;

  height: 100vh;
  position: absolute;

  @media(max-width: 800px){
    display: none;
  }

`;
