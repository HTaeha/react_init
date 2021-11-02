import styled from "styled-components";
import { footerColor } from "../../assets/colors";

const Container = styled.div`
  height: 100px;
  margin-top: auto;
  background-color: ${footerColor};
`;
const Contents = styled.div`
  width: 96%;
  max-width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
`;

type FooterProps = {
  title: string;
};
const Footer = ({ title }: FooterProps) => {
  return (
    <Container>
      <Contents>
        <Title>{title}</Title>
      </Contents>
    </Container>
  );
};
export default Footer;
