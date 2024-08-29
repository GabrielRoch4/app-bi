document.getElementById('classificationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Carregar o CSV de dados normalizados
    const dataset = await loadCSV('dados_fraude_normalizados.csv');
    
    // Ler os novos dados do formulário
    const newEntry = {
        distance_from_home: parseFloat(document.getElementById('distance_from_home').value),
        distance_from_last_transaction: parseFloat(document.getElementById('distance_from_last_transaction').value),
        ratio_to_median_purchase_price: parseFloat(document.getElementById('ratio_to_median_purchase_price').value),
        repeat_retailer: parseInt(document.getElementById('repeat_retailer').value),
        used_chip: parseInt(document.getElementById('used_chip').value),
        used_pin_number: parseInt(document.getElementById('used_pin_number').value),
        online_order: parseInt(document.getElementById('online_order').value)
    };

    // Normalizar os novos dados
    const normalizedNewEntry = normalizeEntry(newEntry);

    // Classificar os novos dados usando o KNN
    const result = classifyWithKNN(normalizedNewEntry, dataset, 3); // K = 3, por exemplo

    let situacao

    if(result == 0) {
        situacao = "Autêntica"
    }else {
        situacao = "Fraudulenta"
    }

    document.getElementById('result').innerText = `Essa compra foi: ` + situacao + " " + `${result}`;
    console.log(result);
});

// Função para normalizar uma entrada com base nas médias e desvios padrões
function normalizeEntry(entry) {
    const means = {
        distance_from_home: 26.1000495,
        distance_from_last_transaction: 5.150073676,
        ratio_to_median_purchase_price: 1.744646533
    };

    const stdDevs = {
        distance_from_home: 59.24094121,
        distance_from_last_transaction: 29.92755625,
        ratio_to_median_purchase_price: 2.569865191
    };

    return {
        distance_from_home: normalize(entry.distance_from_home, means.distance_from_home, stdDevs.distance_from_home),
        distance_from_last_transaction: normalize(entry.distance_from_last_transaction, means.distance_from_last_transaction, stdDevs.distance_from_last_transaction),
        ratio_to_median_purchase_price: normalize(entry.ratio_to_median_purchase_price, means.ratio_to_median_purchase_price, stdDevs.ratio_to_median_purchase_price),
        repeat_retailer: entry.repeat_retailer,
        used_chip: entry.used_chip,
        used_pin_number: entry.used_pin_number,
        online_order: entry.online_order
    };
}

// Função para normalizar dados usando Z-Score
function normalize(value, mean, stdDev) {
    return (value - mean) / stdDev;
}

async function loadCSV(filePath) {
    const response = await fetch(filePath);
    const data = await response.text();
    const parsedData = Papa.parse(data, { header: true }).data;
    
    // Normalizar os dados do dataset
    return parsedData.map(dataPoint => ({
        ...dataPoint,
        distance_from_home: normalize(parseFloat(dataPoint.distance_from_home), 26.1000495, 59.24094121),
        distance_from_last_transaction: normalize(parseFloat(dataPoint.distance_from_last_transaction), 5.150073676, 29.92755625),
        ratio_to_median_purchase_price: normalize(parseFloat(dataPoint.ratio_to_median_purchase_price), 1.744646533, 2.569865191),
        repeat_retailer: parseInt(dataPoint.repeat_retailer),
        used_chip: parseInt(dataPoint.used_chip),
        used_pin_number: parseInt(dataPoint.used_pin_number),
        online_order: parseInt(dataPoint.online_order),
        // Presumindo que a classe está na coluna 'Class [kNN]'
        'Class [kNN]': dataPoint['Class [kNN]']
    }));
}

function classifyWithKNN(newEntry, dataset, k) {
    // Calcular distâncias entre a nova entrada e cada ponto no dataset
    const distances = dataset.map(dataPoint => {
        return {
            distance: euclideanDistance(newEntry, dataPoint),
            label: dataPoint['Class [kNN]'] // Assumindo que a classe esteja na coluna 'Class [kNN]'
        };
    });

    // Ordenar as distâncias e encontrar os K vizinhos mais próximos
    distances.sort((a, b) => a.distance - b.distance);
    const neighbors = distances.slice(0, k);

    // Realizar a votação das classes dos K vizinhos
    const votes = {};
    neighbors.forEach(neighbor => {
        votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
    });

    // Retornar a classe com mais votos
    return Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
}

function euclideanDistance(point1, point2) {
    // Calcula a distância euclidiana entre dois pontos
    let sum = 0;
    const attributes = ["distance_from_home", "distance_from_last_transaction", "ratio_to_median_purchase_price", "repeat_retailer", "used_chip", "used_pin_number", "online_order"];
    
    for (let key of attributes) {
        sum += Math.pow(point1[key] - parseFloat(point2[key]), 2);
    }
    return Math.sqrt(sum);
}
