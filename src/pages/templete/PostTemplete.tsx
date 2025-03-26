import styled from "@emotion/styled";
import { Header } from "@/widgets";
import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCSFileList } from "@/db/cs/fileList.js";
import { getMMFileList } from "@/db/mm/fileList.js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const PostTemplete = () => {
    const { category, id } = useParams();
    const [content, setContent] = useState("");
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const title = id ? (
            category === "mm" ? getMMFileList()[Number(id)] : category === "cs" ? (
            getCSFileList()[Number(id)]) : null
         ) : null;
        if (title) {
            fetch(`/db/${category}/${title}.md`)
            .then((response) => response.text())
            .then((text) => setContent(text))
            .catch((error) => console.error(error));
            console.log(content);
        }
    }, [category, id]);

    return (
        <MainContainer>
            <AnimatedHeader show={showHeader}>
                <Header />
            </AnimatedHeader>
            <Background />
            <MdContainer>
                <MdSubContainer>
                    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeKatex]}
                        remarkPlugins={[remarkGfm, remarkMath]}>
                        {content}
                    </ReactMarkdown>
                </MdSubContainer>
            </MdContainer>
        </MainContainer>
    );
}


export default PostTemplete;

const AnimatedHeader = styled.div<{ show: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-100%)")};
    opacity: ${({ show }) => (show ? 1 : 0)};
    pointer-events: ${({ show }) => (show ? "auto" : "none")};
    z-index: 1000;
`;

const MdContainer = styled.div`
    // background-color: skyblue;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MdSubContainer = styled.div`
    background-color: white;
    width: 80vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0px 10px 0px 10px;
`;