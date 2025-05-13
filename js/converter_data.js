//Converter data
function converterData(data) {

    //Converter a string em um objeto date
    const dataObj = new Date(data);

    //Extrair o ano da data
    const ano = dataObj.getFullYear();

    //Obter o mês, Mês começa de 0, padStart adiciona zeros a esquerda para garantir que o mês tenha digitos
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');

    // Obter dia do mês, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
    const dia = String(dataObj.getDate()).padStart(2, '0');

    // Obter a hora, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
    const hora = String(dataObj.getHours()).padStart(2, '0');

    // Obter minuto, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
    const minuto = String(dataObj.getMinutes()).padStart(2, '0');

    // Retornar a data
    return `${ano}-${mes}-${dia} ${hora}:${minuto}`;
}