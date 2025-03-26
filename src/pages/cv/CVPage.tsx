import { Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { getCVFileList } from '@/db/cv/fileList.js';
import { useNavigate } from "react-router-dom";

const CVPage = () => {
    const fileList = Object.values(getCVFileList());
    const navigate = useNavigate();
    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            {fileList.map((file, index) => {
                return (
                    <div key={index} onClick={() => navigate("/cv/" + (index + 1))}>
                        {file}
                    </div>
                );
            })}
        </MainContainer>
    );
}


export default CVPage;