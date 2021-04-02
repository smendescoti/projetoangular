//função para converter os dados recebidos da API
//em um arquivo e fazer o seu download no navegador..
export function downloadFile(
    data: any, /*receber o conteudo do arquivo em bytes (stream)*/
    type: string, /*receber o tipo do arquivo (PDF ou EXCEL)*/
    filename: string /*receber o nome do arquivo*/
) {

    //variável atraves do qual iremos ler o conteudo do arquivo..
    var blob = null;

    //verificar se o arquivo obtido da API é um PDF..
    if(type == 'PDF'){
        blob = new Blob([data], { type : 'application/pdf' });
        filename += ".pdf";
    }

    //verificar se o arquivo obtido da API é um EXCEL..
    else if(type == 'EXCEL'){
        blob = new Blob([data], { type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        filename += ".xlsx";
    }

    //preparar o arquivo para download..
    var url = window.URL.createObjectURL(blob);

    //criando um link invisivel na página para fazermos o download do arquivo
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;

    //executo o link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}