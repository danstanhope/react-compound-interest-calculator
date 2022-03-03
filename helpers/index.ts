export const formatMoney = (value: number) => {   
    return `$${Intl.NumberFormat().format(value)}`;
};