import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 12px 46px;
  z-index: 99;

  position: fixed;
  width: 100%;

  display: flex;
  align-items: center;

  box-shadow: 1px 0 3px #a3a3a3;

  svg  {
    margin-right: 12px;
  }

  h1{
    margin-left: 6px;
    border-left: 1px solid #a3a3a3;
    padding: 0 24px;
    color: #333;
  }

`;
