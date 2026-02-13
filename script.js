const form = document.querySelector('#form');
const input = document.querySelector('#input');

form.addEventListener('submit', async function (event) {
    event.preventDefault(); // evita reload

    const valorInput = input.value.replace(/\D/g, ''); // remove caracteres não numéricos

    if (valorInput.length !== 8) {
        alert("CEP inválido. Digite 8 números.");
        return;
    }

    try {
        const url = `https://viacep.com.br/ws/${valorInput}/json/`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado.");
            return;
        }

        document.getElementById('Rua').innerText = data.logradouro || "-";
        document.getElementById('Bairro').innerText = data.bairro || "-";
        document.getElementById('Cidade').innerText = data.localidade || "-";
        document.getElementById('Estado').innerText = data.uf || "-";

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao buscar o CEP.");
    }
});
