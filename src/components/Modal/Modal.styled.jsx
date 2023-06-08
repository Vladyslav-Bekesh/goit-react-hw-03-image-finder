import styled from '@emotion/styled';

export const OverlayCss = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalCss = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: relative;
  border-radius: 30px;
`;

export const ImgCss = styled.img`
  width: 85%;

  object-fit: contain;
  transition: scale 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    scale: 1.1;
  }
`;

export const Button = styled.button`
  position: absolute;
  bottom:10px;
  rigth:50%
  transform: translateX(-50%);

  border: 1px solid fuchsia;
  border-radius: 5px;

  background-color: #fff;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  padding: 5px 15px;  

  &:hover {
    background-color: red;
    color: #fff;
  }
`;
