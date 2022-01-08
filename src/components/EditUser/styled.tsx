import styled from "styled-components";
export const Navbar = styled.div`
  background: #252329;
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  padding-left: 7rem;
  padding-right: 7rem;
  box-shadow: 0px 0px 8px 0px;
  height: 5rem;
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
  top: 4rem;
  right: 7rem;
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

export const Container = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 1rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  padding: 2rem;
  label {
    display: block;
  }
  textarea,
  input {
    height: 1.5rem;
    width: 70%;
    border: 1px solid white;
    background: none;
    color: white;
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-top: 1rem;
    padding-left: 1rem;
    resize: none;
    font-family: Quicksand;
  }
  input {
    height: 2rem;
    padding-top: 0.5rem;
  }
`;

export const Back = styled.div`
  color: blue;
  width: 66%;
  margin: auto;
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;
