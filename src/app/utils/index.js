export const getFormattedDate = date => {
    const arr = date.split('/');
    const mm = Number(arr[0]) + 1; // January is 0!
    const dd = arr[1];
    const yyyy = arr[2];
    return new Date(`${mm}/${dd}/${yyyy}`);
};

export const getDateNow = () => new Date();

export const getLabelDate = date => {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
};

export const getApiDate = date => {
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
};