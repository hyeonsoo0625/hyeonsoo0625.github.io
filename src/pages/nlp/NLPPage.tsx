import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { PAGE_URL } from "@/shared";
import { Header } from "@/widgets";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NLPPage = () => {
    const navigate = useNavigate();
    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            <br />
            <br />
            <Container>
                <FileContainer onClick={() => navigate(PAGE_URL.TRANSLATE)}>
                    번역
                </FileContainer>
            </Container>
        </MainContainer>
    );
}

export default NLPPage;

const FileContainer = styled.div`
    width: 60vw;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f0f0f0;
    border-radius: 20px;
    margin: 10px;
    font-size: 1.5rem;
    font-weight: 700;
`;

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;