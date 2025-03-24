import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export const BoxContainer = ({ curPg, name, imgSrc } : { curPg : string, name : string, imgSrc : string}) => {
    const navigate = useNavigate();
    return (
        <Container onClick={() => navigate(curPg + "/" + name)}>
            <ImageContainer>
                <Image src={imgSrc} alt="ViT"/>
            </ImageContainer>
            <NameContainer>
                {name}
            </NameContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    background-color: gray;
    flex-direction: column;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    color: black;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    margin: 0px 30px 40px 30px;
    &:hover {
        background-color: #f9f9f9;
        transform: scale(1.05);
    }
`;

const NameContainer = styled.div`
    display: flex;
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    width: 240px;
    height: 100%;
    align-items: center;
    padding-left: 10px;
    border-radius: 0px 0px 10px 10px;
    &:hover {
        background-color: #f9f9f9;
    }
`;

const ImageContainer = styled.div`
`;

const Image = styled.img`
    width: 250px;
    height: 170px;
    border-radius: 10px 10px 0px 0px;
`;

export const BoxContainerList = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    top: 300px;
    z-index: -1;
    padding-bottom: 10px;
    width: 80%;
    height: 100%;
    background-color: #f9f9f9;
    &::-webkit-scrollbar {
        width: 10px;
    }
    
`;