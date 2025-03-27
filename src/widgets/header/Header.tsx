import { PAGE_URL } from "@/shared";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

export const Header = () => {
    const navigate = useNavigate();
    const [clickCnt, setClickCnt] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuClick = (moved_url:string) => {
        setIsSidebarOpen(!isSidebarOpen);
        navigate(moved_url);

    };
    return (
        <>
            <HeaderContainer>
                <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
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
                <div>
                </div>
            </HeaderContainer>
            <Sidebar open={isSidebarOpen}>
                <CloseButton onClick={() => setIsSidebarOpen(false)}>×</CloseButton>
                <SidebarItem onClick={() => handleMenuClick(PAGE_URL.HOME)}>Home</SidebarItem>
                <SidebarItem onClick={() => handleMenuClick(PAGE_URL.CS)}>CS</SidebarItem>
                <SidebarItem onClick={() => handleMenuClick(PAGE_URL.CV)}>CV</SidebarItem>
                <SidebarItem onClick={() => handleMenuClick(PAGE_URL.NLP)}>NLP</SidebarItem>
                <SidebarItem onClick={() => handleMenuClick(PAGE_URL.MULTIMODAL)}>MultiModal</SidebarItem>
            </Sidebar>

            {isSidebarOpen && <Overlay onClick={() => setIsSidebarOpen(false)} />}
        </>
    )
}

const MenuIcon = styled(IoIosMenu)`
    display: none;
    @media (max-width: 768px) {
        display: block;
        font-size: 2rem;
        margin-left: 20px;
        cursor: pointer;
    }
`;

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
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    color: #333;
    @media (max-width: 768px) {
        font-size: 0.5rem;
        width: 100%;
    }
`;
const HeaderTitle = styled.h1`
    padding-left: 20px;
    cursor: pointer;
    @media (max-width: 768px) {
        padding-left: 0px;
        padding-right: 20px;
    }
`;
const IndexContainer = styled.ul`
    width: 800px;
    display: flex;
    justify-content: space-around;
    padding-right: 20px;
    @media (max-width: 768px) {
        display: none;
    }
`;

const IndexItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
        font-weight: 1000;
    }
`;

const Sidebar = styled.div<{ open: boolean }>`
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? "0" : "-300px")};
    width: 250px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    padding: 0px 20px 0px 20px;
    transition: left 0.3s ease-in-out;
    border-radius: 0px 10px 10px 0px;
    display: flex;
    flex-direction: column;
    z-index: 1;
`;

const SidebarItem = styled.div`
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;

const CloseButton = styled.div`
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
    align-self: flex-end;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
`;
