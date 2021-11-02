import styled from "styled-components";
import { headerColor } from "../../assets/colors";

const Container = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: ${headerColor};
`;
const Contents = styled.div`
  display: flex;
  width: 96%;
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;
const Navigation = styled.nav`
  ul {
    display: flex;
    list-style: none;

    li + li {
      margin-left: 30px;
    }
  }
`;
const Header = () => {
  return (
    <Container>
      <Contents>
        <div>logo</div>
        <Navigation>
          <ul>
            <li>menu 1</li>
            <li>menu 2</li>
          </ul>
        </Navigation>
      </Contents>
    </Container>
  );
};
export default Header;
