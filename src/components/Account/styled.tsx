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

  @media (max-width: 600px) {
    padding: 0 1rem;
  }
`;

export const Profile = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 600px) {
    width: 90%;
    margin: auto;
  }
`;

export const Userdetail = styled.table`
  width: 100%;
  td {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    border: 1px solid white;
    border-top: none;
    display: flex;
    padding: 1rem 2rem;
  }
  h5 {
    align-items: center;
    display: flex;
    width: 4rem;
  }
`;

export const Specialdiv = styled.div`
  position: relative;
  left: 10rem;
  height: 80px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    left: 4rem;
  }
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

  @media (max-width: 600px) {
    right: 1rem;
  }
`;
