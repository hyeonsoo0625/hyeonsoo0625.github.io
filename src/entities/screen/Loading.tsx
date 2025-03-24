import styled from "@emotion/styled";
import { ClipLoader } from "react-spinners";

import { Background } from "@/entities";

export const Loading = () => {
  return (
    <>
      <Background />
      <LoadingWrapper>
        <ClipLoader color="white" size={15} speedMultiplier={1} />
      </LoadingWrapper>
    </>
  );
};
export const LoadingWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 30px;
  color: white;
  font-weight: bold;

  z-index: 40;
`;