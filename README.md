# API para exibir as informações sobre o mar de Maricá

Modulos instalados:
    npm install request
    npm install express --save
    npm install xml2js --save

Fonte dos dados:
    http://servicos.cptec.inpe.br/XML/#exemplos

Código da cidade:
    http://servicos.cptec.inpe.br/XML/listaCidades?city=marica

Informações do mar, dia atual:
    http://servicos.cptec.inpe.br/XML/cidade/3154/dia/0/ondas.xml

Informações do tempo 7 dias:
    http://servicos.cptec.inpe.br/XML/cidade/7dias/3154/previsao.xml

Informações do mar, 7 dias:
    http://servicos.cptec.inpe.br/XML/cidade/3154/todos/tempos/ondas.xml