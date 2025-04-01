export const PAGE_URL = {
    HOME: "/",
    CV: "/cv",
    NLP: "/nlp",
    MULTIMODAL: "/mm/:subject",
    CS: "/cs/:subject",
    POST: "/:category/:subject/:title",
    PRIVATE: import.meta.env.VITE_PRIVATE_URL,
    TRANSLATE: "/nlp/translate",
};