const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

uploadBtn.addEventListener('change', function(event) {
    const arquivos = event.target.files;
    arquivos.forEach(arquivo => {

        if(!arquivo.type.match('image/png') && !arquivo.type.match('image/jpeg')) {
            return alert('Por favor selecione apenas imagens PNG ou JPEG.');
        }

        if (arquivo.size > 2 * 1024 * 1024) {
            return alert('A imagem deve ter no máximo 2MB');
        }

        console.log('Arquivo validado:', arquivo.name);
    });
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo)
    });
}