import styled from "styled-components";
import arrowMore from "../../resources/arrow-more.svg";
import arrowLess from "../../resources/arrow-less.svg";

export const Container = styled.div`
  color: white;
  padding: 0 2rem;
  height: 31.8rem;
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

export const ChannelName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-family: "Noto Sans Display";
  font-weight: 500;
  cursor: pointer;
`;

export const Initials = styled.div`
  background: #252329;
  border-radius: 0.5rem;
  font-family: "Noto Sans Display";
  font-weight: 600;
  margin-right: 1rem;
  height: 35px;
  width: 35px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: center;
`;
