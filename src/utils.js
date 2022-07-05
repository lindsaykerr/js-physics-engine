export const generateID = (() => {
    let value = 0;
    return {
        next: () => {
            value++;
            return value;
        }
    }})();