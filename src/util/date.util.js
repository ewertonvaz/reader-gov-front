function formatDateFromApi(dateStr){
    const tempDate = new Date(dateStr).toUTCString().split("GMT")[0];
    const utcDate = new Date(tempDate);
    //console.log(utcDate);
    if (!(utcDate instanceof Date)) {
        return null;
    }
    // console.log(utcDate);
    const ano = utcDate.getFullYear();
    const mes =  utcDate.getMonth() + 1;
    const dia = utcDate.getDate();
    const frmDate = ano + "-" + (mes < 10 ? "0" + mes : mes) + "-" + (dia < 10 ? "0" + dia : dia);
    return frmDate;
}

function formatDateBR(dateStr){
    const tempDate = new Date(dateStr).toUTCString().split("GMT")[0];
    const utcDate = new Date(tempDate);
    if (!(utcDate instanceof Date)) {
        return null;
    }
    //console.log(utcDate);
    const frmDate = utcDate.toLocaleDateString('pt-BR')
    return frmDate;
}

function formatLocaleBR(dateStr){
    const utcDate = new Date(dateStr);
    const localeDate = convertUTCDateToLocalDate(utcDate);
    if (!(localeDate instanceof Date)) {
        return null;
    }
    return localeDate.toLocaleDateString('pt-BR');
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}

export { formatDateFromApi, formatDateBR, formatLocaleBR}