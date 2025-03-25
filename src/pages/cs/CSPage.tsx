import styled from "@emotion/styled";
import { BoxContainer, Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { PAGE_URL } from "@/shared";
import { getCSFileList } from "@/db/cs/fileList.js";
import { useNavigate } from "react-router-dom";


const CSPage = () => {
    const fileList = Object.values(getCSFileList());
    const navigate = useNavigate();
    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            {fileList.map((file, index) => {
                return (
                    <div key={index} onClick={() => navigate("/cs/" + (index + 1))}>
                        {file}
                    </div>
                );
            })}
        </MainContainer>
    );
}


export default CSPage;