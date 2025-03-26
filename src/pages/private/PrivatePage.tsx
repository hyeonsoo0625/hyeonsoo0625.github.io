import { Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { useState } from "react";
import styled from "@emotion/styled";

const checkPassword = (password: string) => {
    return password === import.meta.env.VITE_PASSWORD;
}

const PrivatePage = () => {
    const [page, setPage] = useState(0);
    const [password, setPassword] = useState("");
    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            {page === 0 ? (
                <LoginContainer>
                    <LoginSubContainer>
                        <h2>LOGIN</h2>
                        <LoginInput type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <LoginButton onClick={() => {
                            if (checkPassword(password)) {
                                setPage(1);
                            }
                        }}>LOGIN</LoginButton>
                    </LoginSubContainer>
                </LoginContainer>
            ) : (
                <>
                L
                </>
            )}
        </MainContainer>
    );
}


export default PrivatePage;

const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginSubContainer = styled.div`
    background-color: white;
    width: 40vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
`;

const LoginInput = styled.input`
    width: 80%;
    height: 30px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1.2rem;
    text-align: center;
    background-color: white;
    color: black;
    font-weight: bold;
`;

const LoginButton = styled.button`
    width: 30%;
    height: 30px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1.2rem;
    text-align: center;
    background-color: rgb(0, 0, 0, 0.1);
    color: black;
    font-weight: bold;
`;