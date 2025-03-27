import { TRANSAPI } from "@/shared";

export const TranslateService = () => {

  const translate = async (body: Translate.TranslateDTO) => {
    const { data } = (await TRANSAPI.post(
        "/api/ai/translate-page",
        body
      ));
      return data;

  };

  return { translate };
};