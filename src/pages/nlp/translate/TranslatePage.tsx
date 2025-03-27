import { Background } from "@/entities";
import { MainContainer } from "@/entities/screen/Container";
import { TranslateService } from "@/shared";
import { Header } from "@/widgets";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    target: string;
    text: string;
}

const TranslatePage = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const { translate } = TranslateService();
    const [translatedText, setTranslatedText] = useState<string>("");

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        translate({
            target: data.target,
            text: data.text,
        }).then((res) => setTranslatedText(res.data));
    };

    return (
        <MainContainer>
            <Header />
            <Background />
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Target Language:</label>
                <input {...register("target")} placeholder="언어 코드 (예: en, ko)" />
                <label>Text:</label>
                <textarea {...register("text")} placeholder="번역할 텍스트를 입력하세요" />
                <button type="submit">번역</button>
            </form>
            <div>{translatedText}</div>
        </MainContainer>
    );
};

export default TranslatePage;