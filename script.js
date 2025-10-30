// Função para obter valores de cotação dos inputs
function obterCotacoes() {
    return {
        atual: parseFloat(document.getElementById('cotacaoAtual').value) || 5.36,
        max: parseFloat(document.getElementById('cotacaoMax').value) || 6.36,
        min: parseFloat(document.getElementById('cotacaoMin').value) || 4.86
    };
}

// Função para formatar valores em Real
function formatarReal(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para calcular a média
function calcularMedia(max, min) {
    return (max + min) / 2;
}

// Função para arredondar para 2 casas decimais
function arredondar(valor) {
    return Math.round(valor * 100) / 100;
}

// Função para calcular e exibir resultados
function calcularResultados() {
    const valorDolar = parseFloat(document.getElementById('valorDolar').value);
    
    if (isNaN(valorDolar) || valorDolar <= 0) {
        return;
    }
    
    const cotacoes = obterCotacoes();
    
    // Cálculos (mesma lógica do Python)
    const precoMax = arredondar(cotacoes.max * valorDolar);
    const precoMin = arredondar(cotacoes.min * valorDolar);
    const precoAtual = arredondar(cotacoes.atual * valorDolar);
    const media = arredondar(calcularMedia(precoMax, precoMin));
    
    // Atualizar os resultados na tela
    document.getElementById('precoAtual').textContent = formatarReal(precoAtual);
    document.getElementById('precoMax').textContent = formatarReal(precoMax);
    document.getElementById('precoMin').textContent = formatarReal(precoMin);
    document.getElementById('media').textContent = formatarReal(media);
    
    // Mostrar a seção de resultados
    document.getElementById('resultados').classList.remove('hidden');
}

// Event listener para o formulário
document.getElementById('calculadoraForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const valorDolar = parseFloat(document.getElementById('valorDolar').value);
    
    if (isNaN(valorDolar) || valorDolar <= 0) {
        alert('Por favor, insira um valor válido!');
        return;
    }
    
    calcularResultados();
    
    // Scroll suave até os resultados
    document.getElementById('resultados').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
});

// Event listeners para recalcular quando as cotações mudarem
document.getElementById('cotacaoAtual').addEventListener('input', calcularResultados);
document.getElementById('cotacaoMax').addEventListener('input', calcularResultados);
document.getElementById('cotacaoMin').addEventListener('input', calcularResultados);

// Limpar resultados quando o usuário começar a digitar novamente
document.getElementById('valorDolar').addEventListener('input', function() {
    if (this.value === '') {
        document.getElementById('resultados').classList.add('hidden');
    }
});
