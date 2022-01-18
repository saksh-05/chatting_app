import styled from "styled-components";

export const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  width: 64%;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 4px 4px -5px;
  background: #3c393f;
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
`;
