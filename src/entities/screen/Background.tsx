import styled from "@emotion/styled";

export const Background = ({ src }: { src?: string }) => {
  const StyledBackground = styled.div`
    ${src ? `background-image: url(${src});` : ""}

    position: fixed;
    top: 0px;
    left: 0px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    background-color: white;

    z-index: -1;
  `;

  return <StyledBackground />;
};