import styled from "styled-components";
import arrowMore from "../../resources/arrow-more.svg";
import arrowLess from "../../resources/arrow-less.svg";

export const Channel = styled.div`
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

export const ChName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;
export const ChDesc = styled.div``;

export const UniqueUsers = styled.div`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 2rem;
  font-family: "Noto Sans Display";
  height: 23.5rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: nset 0 0 6px white;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 15px;
    height: 2px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #2f80ed;
    maxheight: 10px;
  }
  &::-webkit-scrollbar-button:vertical:start:decrement {
    background: url(${arrowLess}) no-repeat center center;
    display: block;
    background-size: 20px;
  }
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    background: url(${arrowMore}) no-repeat center center;
    background-size: 20px;
  }
`;
