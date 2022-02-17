export const formatMoney = (value: number) => {    
    if (value >= 1000000) {
        return `$${Intl.NumberFormat().format(value / 1000000)}M`;
    } else if (value >= 1000) {
        return value % 1000 === 0 ? `$${Intl.NumberFormat().format(value/1000)}K` : `$${Intl.NumberFormat().format(value)}`;    
    } else {
        return `$${Intl.NumberFormat().format(value)}`;
    }
};