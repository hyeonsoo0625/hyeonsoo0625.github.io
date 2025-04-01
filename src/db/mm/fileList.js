export const getMMFileList = (subject) => {
    const file = {
        'OVOD': ['Open Vocabulary Object Detection with Pseudo Bounding-Box Labels'],
    };
    return file[subject];
}

export const getMMFile = () => {
    return ['OVOD'];
}