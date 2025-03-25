import { PAGE_URL } from "@/shared";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const [clickCnt, setClickCnt] = useState(0);

    return (
        <HeaderContainer>
            <HeaderTitle onClick={() => {
                navigate(PAGE_URL.HOME)
                setClickCnt(clickCnt + 1)
                console.log(clickCnt)
                if (clickCnt === 3) {
                    navigate(PAGE_URL.PRIVATE);
                    setClickCnt(0);
                }
            }}>Hyeonsoo Kim</HeaderTitle>
            <IndexContainer>
                <IndexItem onClick={() => navigate(PAGE_URL.CS)}>CS</IndexItem>
                <IndexItem onClick={() => navigate(PAGE_URL.CV)}>CV</IndexItem>
                <IndexItem onClick={() => navigate(PAGE_URL.NLP)}>NLP</IndexItem>
                <IndexItem onClick={() => navigate(PAGE_URL.MULTIMODAL)}>MultiModal</IndexItem>
            </IndexContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    position: fixed;
    top: 0;
    background-color: white;
    justify-content: space-between;
    font-size: 0.6rem;
    align-items: center;
    width: 100%;
    height: 55px;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    color: #333;
`;
const HeaderTitle = styled.h1`
    padding-left: 20px;
    cursor: pointer;
`;
const IndexContainer = styled.ul`
    width: 800px;
    display: flex;
    justify-content: space-around;
    padding-right: 20px;
`;

const IndexItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;