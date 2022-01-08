import styled from "styled-components";

export const Register = styled.div`
  border: 2px solid white;
  width: 30%;
  padding: 2rem;
  position: relative;
  margin: auto;
  margin-top: 4rem;
  text-align: left;
  color: white;
  font-family: "Quicksand";
  border-radius: 0.5rem;

  input {
    height: 3rem;
    width: 90%;
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 0;
    border: 1px solid white;
    font-family: Quicksand;
    font-weight: 600;
    color: white;
    padding-left: 2rem;

    &:active {
      border: 1px solid blue;
    }
    &:focus {
      border: 1px solid blue;
      outline: none;
    }
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
`;

export const Btn = styled.button`
  height: 2.5rem;
  border: none;
  width: 100%;
  border-radius: 0.5rem;
  margin-top: 1rem;
  background: #2f80ed;
  color: white;
  font-size: 1rem;
  font-family: "Quicksand";
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SocialLogin = styled.div`
  text-align: center;
`;

export const Snackbar = styled.div`
  position: fixed;
  background: red;
  height: 2rem;
  font-family: "Quicksand";
  font-weight: 600;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 2rem;
  padding: 0 2rem;
`;
