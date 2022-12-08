export const dateFormat = (date: string, ) => {
    const formatDate = date.split('.');
    const [day, month, year] = formatDate;
    return day.length === 1 ? `${year}-${month}-0${day}` : `${year}-${month}-${day}`
}