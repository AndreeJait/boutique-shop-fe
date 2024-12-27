export const getClassNameWithCondition = (classes) => {
    let result = '';
    Object.keys(classes).forEach(key => {
        if(classes[key]) {
            result += key + ' ';
        }
    })
    return result.trimEnd();
}