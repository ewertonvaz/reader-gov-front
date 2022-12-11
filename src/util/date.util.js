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

export { formatDateFromApi, formatDateBR }