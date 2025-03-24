import styled from "@emotion/styled";
import { BoxContainer, Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { PAGE_URL } from "@/shared";
import { getFileList } from '@/db/cv/fileList.js';

const CVPage = () => {
    const fileList = getFileList();

    return (
        <MainContainer>
            <Header />
            {/* <div>
                {fileList}
            </div> */}
            {/* {fileList.map((file: any, index: any) => (
                <div>
                    {file}
                    
                </div>
            ))} */}
            <Background />
        </MainContainer>
    );
}


export default CVPage;