export const formatMoney = (value: number) => {   
    let val:string;

    if (value >= 1000000) {
        val = `$${Intl.NumberFormat().format(value / 1000000)}M`;
    } else if (value >= 1000) {
        val = value % 1000 === 0 ? `$${Intl.NumberFormat().format(value/1000)}K` : `$${Intl.NumberFormat().format(value)}`;    
    } else {
        val = `$${Intl.NumberFormat().format(value)}`;
    }

    return Number.isNaN(val) ? '--' : val;
};