import styled from "styled-components";

export const Chats = styled.div`
  color: white;
  width: 75%;
  position: relative;
  margin-left: auto;
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 5rem;

  @media (max-width: 600px) {
    width: 100%;
    padding-top: 0;
  }
`;

export const DateLine = styled.div`
  text-align: center;
  font-size: 12px;
  margin: auto;
  margin-top: 2rem;
  width: 95%;

  @media (max-width: 600px) {
    left: 0%;
  }
  div {
    width: 10%;
    margin: auto;
    background: #252329;
    position: relative;
    top: -16px;

    @media (max-width: 600px) {
      width: 20%;
    }
  }
`;

export const Messages = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  padding-left: 4rem;

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`;

export const MessageName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  font-family: Noto Sans Display;
  color: #828282;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

export const MobileNavbar = styled.div`
  position: sticky;
  z-index: 21;
  background: #333333;
  width: 93%;
  box-shadow: 5px 3px 8px -2px black;
  padding-left: 4rem;
  @media (max-width: 600px) {
    display: flex;
    box-shadow: 1px 1px 7px 0px;
    align-items: center;
    padding: 0 1rem;
    position: sticky;
    top: 0;
  }
`;

export const HamburgerMenu = styled.div`
  height: 23px;

  @media (min-width: 601px) {
    display: none;
  }
`;

export const DeskBar = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;

  @media (max-width: 600px) {
    box-shadow: none;
    left: 0;
    padding-left: 1rem;
  }
`;

export const MobileView = styled.div`
  @media (min-width: 601px) {
    display: none;
  }
`;

export const DeskView = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;
