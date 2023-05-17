# 1 - A diferença entre utilizar o mongodb atlas e o mongodbComapass comum se deve ao fato de que a gente pode compartilhar o banco de dados para cada um poder usar da sua mnaquina , e o banco de dados nao ficar restringindo ao seu localhost , ser compartilhado

# 2 - Prestar atenção na utilização do dotenv que serve justamente para a segurança , para nao subir url com senha por exemplo para aplicação no push , como é o caso do mongodb atlas que a senha do banco é passado na url junto com o username

# 3 - para utilizar o dotenv , temos que instalar ele através do npm (npm i dotenv) e em seguida vou configurar ele com o comando (require("dotenv").config()); no arquivo que inicializa , geralmente no index.js

# 4 - em seguida criamos o arquivo .env e é la que vamos passar os arquivos que nao serão subidos para o projeto (const MONGODB_URI = process.env.MONGODB_URI;) => a utilização é feita assim , utilizando o nome da variável que vode definiu no .env

# 5 - Na utilização da porta eu posso colocar tanto const port = 3000 direto , ou então posso passar exatamente como esta neste projeto atravês do .env

# 6 - Eu consigo definir uma rota principal no meu app.js através do comando (app.use("/users" , router)) e apos isso todas as rotas que eu fizer a função no controller e passar no router , será passada depois do user , ou seja assim:http://localhost:3000/users/all ou http://localhost:3000/all

# 7 - A maneira que eu utilizei no controller para criar uma rota para pegar todos os usuários do banco foi atraves de um comando do mongodb , chamado find para achar usuarios filtrados ou todos de uma so vez, através de um user schema importado que a criação da minha collection no banco de dados, colocando a mensagem (500) , que significa erro no servidor caso ocorra um erro e 200 , caso ocorra tudo certo

# 8 - o Http quando eu estou usando o local host nunca tem o s , (https) => o servidor rodando na internet e não no localhost

# 9 - Anotações sobre o post: como é uma função que se comunica diretamente com o banco de dados , quando a gente for fazer a função no controller , devemos criar ela com uma função assicrona

# 10 - uma boa pratica é hashear com o bcrypt bem no inicio da criaçao do post , ou pode ser feito na criação do user schema tambem , é uma boa pratica fazer o post dessa maneira maneira enviando os codigos de validação , eu estou dizendo na criação do useSchema que ele vai pegar a requisição do usuário direto do body da requisição

# 11 - boa prática para dar nome de rotas => não colocar verbo , colocar substantivo

# 12 - na rota post nao é preciso colocar rota , é o unico que é passado so com ("/users") ele é passado neste caso na rota users na rota principal

# 13 - Portanto há duas maneiras de se utilizar o bcrypt (Apliquei duas maneiras neste projeto)

# 14 - Desenvolver o costume de no res.send, enviar mensagens bem completas com os codigos de requisição e tudo mais , data , e o atributo (message) para enviar uma mensagem, antes do atributo message tem que ser passado um atributo res.status.json , o metodo send é substituido pelo metodo json

# 15 - o mongoose possui uma função interessante que se chama , findbyIdAndUpdate que facilita isso()

# 16 - para fazer a busca para pegar um usuario em especifico por algum parametro deste usuario ou algo assim , como pegar para dar o upadate ( entre em headears e params e passe a key e o value , como se fosse no local storage) => se chama fazer uma busca por query params

# 17 - assim como no login da nasa que foi feito , para passar a rota do update by id , passamos assim ("/:id") ou ("/usuario/:id")

# 18 - O delete nos tambem temos a função findById e ele ja deleta tambem , de maneira simplificada , parecido com o di upadate que é o put e patch (a estrutura do delete e do upadate são muito parecidas , quase iguais na verdade so mudando o verbo http)

# 19 - no delete nao temos o costume de enviar os dados do usuario deletado , somente um codigo , com uma mensagem escrita , codigo deletado com sucesso

# 20 - no user Schema precisamos incluir e fazer a formtação do id , para que a gente possa utilizalo e mostralo e adicionar um novo quando for adicionar os usuarios

# 21 - para eu retornar na somente dados que eu desejo , eu devo utilizar o funçao "FILTER" onde eu passo o userSchema

# 22 - para importar o dotenv como eu fiz no auth , eu tenho que usar o \* porque eu estou importando ele da pasta raiz , porém , eu também poderia utilizar através do metodo require

# 23 - no authController é onde eu faço a validação do usuário através do jwt , e coloco o meu secret atraves do dotenv para que o meu token fique seguro na subida da aplicação e fique mais dificil alguem copiar ou roubar

# 24 - Posso utilizar o erro 401 para enviar a mensagem que quer dizer , usuário não encontrado

# 25 - a exclamação na variável usuário no item de validação , quer dizer que se vier uma coisa diferente daquele usuário , irá retornar aquela mensagem de erro

# 26 - Eu uso o bcrypt importado no auth para fazer uma comparação sincrona entre as hashes para fazer a validação da senha do usuário

# 27 - na validção da senha não é preciso passar o data no if, pois se o usuário nao está autorizado , é sinal de que o email está certo , então a boa prática é retornar statusCode e mensagem

# 28 - Na Criação do token, nos utilizamos o jwt que foi baixado pelo npm, , com o jwt.sign ( dentro do parenteses nos passamos dois parametros , que será atraves daquele parametro que será feita a localização do usuario) ( o segundo parametro será o nosso secret , que é o salt que nos colocamos no .env parafazer o salt junto com o token e crialo hasheando o que a gente passou com o secret)

# 29 - Na Validação do token , eu tenho que passar o status code de 200 , ou seja , verificado com sucesso a requisição foi bem sucedida , junto com o data , e dentro deste data tenho que passar o meu token criado

# 30 - Tenho que importar o arquivo authCotroller no arquivo router , para criar uma rota para ele , atraves do metodo post , que é para onde eu irei enviar os dados

# 31 - Para eu conseguir utilizar a sintaxe do node modules no nodeJs ou seja (export default and import express from "express") ou seja , a sintaxe que já é utilizada no react por conta do babel eu preciso e no arquivo package json e adicionar o comando "type":module,

# 32 - A forma que eu acho mais fácil para a criação de um controller => é criar ele como um objeto vázio no controller e em seguida passa-lo exporta-lo como module exports , para usar ele como modulo no router e eu poder , escrever qualquer função nele e passar para o router de forma simplificada

# 33 - Passo a passo da criação da api ( 1 - fazer o crud , com as especificações que você deseja , 2 - separar dois arquivos de controller , um para autenticação jwt e outro para passar as funções do crud , 3- montar a arquitetura mvc)

# 34 - Na criação do controller eu nao exporto a função e sim o controller em si e a função acompanha ele ( do jeito da tera é exportar a funçao e utilizar ela com o authcontroller)

# 35 - O ultimo passo da verificação é verificar se existe um token na nossa requisição

# 36 - desenvolver o costume de utilizar na validação por exemplo (console.log(validationsenha) => para ver o que irá acontecer na requisição , console.log(req.body.password => para ver qual foi a senha cadastrada naquela requisição , console.log(usuario)=> para retornar o usuario cadstrado ))

# 37 - Utilizar o joi (npm install joi) para fazer validação de tamanho de senha , obrigatorio , e estilo de email

# 38 - Na função de verification do token , nos passamos o slipt como index 1 , pq o index 0 seria o tipo do token e não o token em si

# 39 - A função de if feita na verificação do token , eu passei um !token , que quer dizer que se o token nao existir , ou seja , for diferente , eu irei retornar o codigo 401

# 40 - o headers que eu passei na verificação do token diz a respeito aquela requisição virá no body da requisição

# 41 - Quando eu utilizo o try catch, eu posso utilizar passar um console.error(error) ao invés de um console.log(error) => é uma melhor prática

# 42 - Dentro do try catch da verificção do token , eu passo a verificação do nosso token jwt com a função next() logo abaixo, esse next vai fazer com que a gente possa passar para a proxima função e não fique parada ali(a finção com req e res é chamada de modleware)

# 43 - para a gente passar esta rota autenticada , vai ser através de uma rota do tipo post, onde eu irei criar esta rota no userController , só com o status code e com a mensagem de sucesso fazendo com que se o token for verificado com sucesso vai ser transmitido para essa rota de autenticação valida

# 44 - Conclusão , a função de autenticação do token é feita no authController , mas a rota onde o resultado da verificção do token será exibido é criado no userController

# 45 - perceba que na ultima função do router , onde eu passo a rota autenticada , eu to passando duas funções em uma unica rota criada , isto é possivel , estou passando a função de verificar o token e a função de que caso o token seja verificado eu irei exibir a aquele codigo 200 na rota passada

# 46 - Testando a rota autenticada no postman => se eu colocar nada na requisição e colcar para fazer um post , irá dar usuario não autorizado , pois eu nao passei nenhum token. Entretanto,

# 47 - Para eu testar o token na rota autenticada , eu tenho que ir em authentication e marcar a opção token bearer e copiar e colar o token la e manda-lo como se fosse na rotaAutenticada com o metodo post => se o token estiver correto , ele irá me exibir a rota , com a função rota autenticada , e o status code daquela rota

# 48 - Utilização do joi validation => Criar uma pasta validation , onde eu irei utilizar o pacote joi, montarei um objeto com as validações que eu preciso fazer tipos e estilos de valores que eu quero, passando as requisições para o body, após isso eu devo importalo no meu documento de rotas e baoxar o pacote npm express validation e utilizar a propriedade validate deles assim (const {validate} = require("express-validation") )=> na rota que eu estou passando a função de post eu devo utilizar este atributo validate para aplicar o joy => router.post("/", validate(JoiValidation.createOrUpadateUserValidator) ,userController.createUser), passando a minha função obejto que eu criei na pasta Validations.

# 49 - no get dos usuarios by id , eu posso substituir o params por query , e quando eu for testar a api no postman , eu poderei passar ele como um value no params e ele resultará, passo um key e um value

# 50 - Quando exportar um elemento como chave , importa ele como chave tbm

# 51 - O try catch serve para pegar erros , todo o código da função é passado dentro do try , o catch server somente para pegar o erro , caso o que esteja dentro do try nao funcione

# 52 - há duas formas de se utilizar o joi 0 =>

## \***\*\*\*\*\*\*\***\*\*\***\*\*\*\*\*\*\*** Recuperação de senha , final , o que fazer com o token gerado?

## 1 - a gente precisa da um jeito de enviar este token via email para o usuário para que ele consiga alterar esta senha

## 2 - tenho que criar a pagina resources, dentro dela uma pasta chamda mail , dentro de mail uma pagina chamada auth e dentro de auth um forgotPassword.html ( é onde o meu template vai estar para ser enviado ao usuário aquela mensagem em paragrafo por exemplo)

## +++++++++++++++++++++++++++++++++++++ Eslint

## 1 - Há diferenças entre colocar o eslint para arquivos javascript, ou seja e typescript , ou seja, a configuração é diferente ao execuatr o comando "npx eslint --init", sendo assim algumas coisas mudam

## 2 - escolher que o arquivo "eslint" seja do tipo.js e não json para que voce possa colocar as regras lá através do module.exports em vez de ser em formato json.

## 3 - tudo que voce tem que instalar no npm é => npm install eslint eslint-plugin-import-helpers eslint-config-prettier eslint-plugin-prettier --save-dev para que voce possa usar o eslint em conformidade com prettier

## 4 - abrir com o botão direito na pasta que voce quer para selcrionar a opção ".editorconfig" para configurar as quebras de linha

## 5 - utilizar o .eslintignore para ignorar a pasta node_modules do seu arquivo

## 6 -é um pouco diferente do typescript por isso ter atenção neste quesito.
