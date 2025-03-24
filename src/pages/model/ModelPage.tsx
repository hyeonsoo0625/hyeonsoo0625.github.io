import { Background } from "@/entities";
import { PAGE_URL } from "@/shared";
import { BoxContainer, BoxContainerList, Header } from "@/widgets";
import styled from "@emotion/styled";

const ModelPage = () => {
    const modelList = [{
        'name': 'ViT',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },
    {
        'name': 'ResNet',
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqUQQAcg9HVVhtNW0S5kk94R6vAvjjTAXuw&s'
    },]
    return (
        <Container>
            <Header />
            <Background />
            <BoxContainerList>
                {modelList.map((model) => {
                    return <BoxContainer curPg={PAGE_URL.MODEL} name={model.name} imgSrc={model.src} />
                })}
            </BoxContainerList>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    
`;
export default ModelPage;