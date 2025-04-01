import styled from "@emotion/styled";
import { Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { getMMFileList } from "@/db/mm/fileList.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


const CSPage = () => {
    const { subject } = useParams<{ subject?: string }>();
    const [fileList] = useState<string[]>(getMMFileList(subject));
    const navigate = useNavigate();
    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            <br />
            <br />
            <Container>
                {fileList.map((file, index) => {
                    return (
                        <FileContainer key={index} onClick={() => navigate("/mm/" + subject + "/" + file)}>
                            {file}
                        </FileContainer>
                    );
                })}
            </Container>
        </MainContainer>
    );
}


export default CSPage;

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