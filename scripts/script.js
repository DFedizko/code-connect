const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
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

        leitor.readAsDataURL(arquivo);
    });
}

const imagePrincipal = document.querySelector('.secao__imagem');
const nomeDaImagem = document.querySelector('.secao__descricao');

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagePrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error('Erro na leitura do arquivo');
        }
    }
});

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('tags');

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        const tagASerRemovida = evento.target.parentElement.parentElement;
        listaTags.removeChild(tagASerRemovida);
    }
});

const tagsDisponiveis = ['Front-end', 'Back-end', 'Programação', 'Data Science', 'Full-stack', 'HTML', 'CSS', 'Javascript', 'Python', 'Sql', 'React', 'Django', 'Vue', 'Angular', 'Jquery'];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);
    });
}

inputTags.addEventListener('keypress', async (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== '') {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                
                if(tagExiste) {
                    const tagNova = document.createElement('li');
                    tagNova.classList.add('tag');
                    tagNova.innerHTML = `<p class="tag__nome">${tagTexto}<img src="./img/close-black.svg" class="remove-tag"></p>`;
        
                    listaTags.appendChild(tagNova);
                    inputTags.value = '';
                } else {
                    alert('Tag não foi encontrada.');
                }

            } catch (error) {
                console.error('Erro ao verificar a existência da tag!');
                alert('Erro ao verificar a existência da tag. Verifique o console!');
            }
        }
    }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve('Projeto publicado com sucesso!');
            } else {
                reject('Erro ao publicar o projeto!');
            }
        }, 2000);
    });
}

function descartar(evento) {
    evento.preventDefault();

    const formulario = document.querySelector('form');
    formulario.reset();

    imagePrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = 'image_projeto.png';
    listaTags.innerHTML = '';
}

const botaoPublicar = document.getElementById('btn-publicar');
botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('input-nome').value;
    const descricaoDoProjeto = document.getElementById('input-descricao').value;
    const tagsDoProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

    if (nomeDoProjeto.trim() === '' || descricaoDoProjeto.trim() === '') {
        return alert('Por favor preencha todos os campos antes de publicar!');
    }

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto);
        console.log(resultado);
        alert('Deu tudo certo!');
        descartar(evento);
    } catch (error) {
        console.log('Deu errado:', error);
        alert('Deu tudo errado!');
    }
});

const botaoDescartar = document.getElementById('btn-descartar');
botaoDescartar.addEventListener('click', descartar);
