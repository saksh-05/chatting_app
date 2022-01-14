import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 30rem;
  height: 18rem;
  background: #120f13;
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  font-family: "Quicksand";

  input,
  textarea {
    width: 97%;
    background: #3c393f;
    border: 1px solid white;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    color: white;
    font-weight: 600;
    font-family: "Quicksand";
    padding-left: 0.5rem;
    resize: none;
  }
`;
export const Button = styled.div`
  width: 5rem;
  height: 2.5rem;
  background: #2f80ed;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: smaller;
`;
