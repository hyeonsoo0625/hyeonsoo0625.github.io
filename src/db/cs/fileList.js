export const getCSFileList = (subject) => {
    const file = {
        'multicore': ['multicore02-1'],
        'signal and system': ['signal and system ch1'],
    }
    return file[subject]
}

export const getCSFile = () => {
    return ['multicore', 'signal and system']
}