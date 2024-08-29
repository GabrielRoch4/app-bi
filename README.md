# Trabalho de Inteligência de Negócios - IFTM Campus Patrocínio
Este repositório contém o terceiro trabalho avaliativo da disciplina de Inteligência Artificial, realizado no 5º período do curso de Análise e Desenvolvimento de Sistemas no Instituto Federal do Triângulo Mineiro (IFTM) - Campus Patrocínio.

## Descrição do Trabalho
O trabalho consiste na aplicação de algoritmos de aprendizado supervisionado utilizando uma base de dados de fraudes em transações financeiras por cartão de crédito. O objetivo é analisar e classificar os dados para detectar transações fraudulentas, apresentando os resultados em um aplicativo desenvolvido.

## Algoritmos Utilizados
Os seguintes algoritmos de aprendizado supervisionado foram aplicados na base de dados utilizando o KNIME:

- Decision Tree (Árvore de Decisão)
- Support Vector Machine (SVM)
- K-Nearest Neighbor (KNN)
- Redes Neurais Artificiais
- Dataset Utilizado

## Atributos do Dataset

O dataset foi fornecido por uma instituição financeira (não especificada) e contém informações detalhadas sobre transações financeiras feitas por cartão de crédito, as quais podem ser verdadeiras ou fraudulentas, tanto presenciais quanto online.

distance_from_home: Distância entre o local da transação e a residência do titular do cartão (em quilômetros).
distance_from_last_transaction: Distância entre o local da última transação e o local da transação atual (em quilômetros).
ratio_to_median_purchase_price: Razão entre o preço de uma transação e o preço mediano de transações anteriores.
repeat_retailer: Indica se a transação foi realizada no mesmo varejista de uma transação anterior.
used_chip: Indica se a transação foi feita utilizando o chip do cartão.
used_pin_number: Indica se a transação foi autorizada utilizando a senha.
online_order: Indica se a transação foi feita online.
fraud: Variável alvo que indica se a transação foi considerada fraudulenta (1) ou não (0).
Experimentos Realizados
Normalização dos dados.
Transformações de dados (String para Número e Número para String).
Aplicação de filtros (Column Filter e Row Filter).
Criação e treinamento de modelos utilizando os algoritmos mencionados.
Avaliação dos modelos através das matrizes de confusão, acurácia e erro.

## Resultados
O algoritmo que apresentou o melhor desempenho para o conjunto de dados foi o K-Nearest Neighbor (KNN). Com base nisso, um aplicativo foi desenvolvido para permitir a classificação de novas entradas de dados, simulando o comportamento de detecção de fraude.

## Aplicação
O aplicativo desenvolvido para a classificação de novas entradas pode ser acessado no seguinte link:

[Clique para acessar](https://gabrielroch4.github.io/app-bi/)

## Como Executar
Clone este repositório.
Abra o projeto no seu ambiente de desenvolvimento.

Utilize o aplicativo para inserir novas entradas de dados e verificar a classificação gerada pelo modelo KNN.
