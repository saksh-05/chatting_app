import styled from "styled-components";

export const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  width: 64%;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 4px 4px -5px;
  background: #3c393f;
  margin-left: 4rem;
  textarea {
    background: none;
    border: none;
    color: white;
    padding-left: 1rem;
    padding-top: 0.9rem;
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 600px) {
    width: 93%;
    margin: auto;
  }

  div {
    height: 32px;
    width: 32px;
    background: #2f80ed;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    margin-right: 0.5rem;

    @media (max-width: 600px) {
      width: 100px;
      height: 45px;
    }
  }
`;
