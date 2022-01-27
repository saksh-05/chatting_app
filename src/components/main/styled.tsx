import styled from "styled-components";

export const Channels = styled.div`
  background: #120f13;
  color: white;
  height: 100%;
  width: 25%;
  position: fixed;

  @media (max-width: 600px) {
    z-index: 1;
    width: 85%;
  }
`;

export const Chats = styled.div`
  color: white;
  width: 75%;
  position: relative;
  margin-left: auto;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Profile = styled.div`
  background: #0b090c;
  align-items: center;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 0 2rem;
  width: 80%;
`;

export const Dropdown = styled.div`
  color: #fff;
  background: #252329;
  width: 10rem;
  height: 10rem;
  display: flex;
  border-radius: 0.5rem;
  position: absolute;
  justify-content: center;
  bottom: 4rem;
  right: 0.1rem;
  z-index: 1;
  ul {
    list-style: none;
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      background: #3c393f;
    }
  }
`;

export const Add = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
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
