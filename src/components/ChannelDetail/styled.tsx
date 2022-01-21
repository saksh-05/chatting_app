import styled from "styled-components";

export const Channel = styled.div`
  background: #120f13;
  color: white;
  height: 100%;
  width: 25%;
  position: fixed;
`;

export const Chats = styled.div`
  color: white;
  width: 70%;
  position: relative;
  margin-left: auto;
  font-size: 1.3rem;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 5rem;
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

export const Messages = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const UniqueUsers = styled.div`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 2rem;
  font-family: "Noto Sans Display";
`;
