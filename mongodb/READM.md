
## EXERCICIO 1

**1. Adicione outro Peixe e um Hamster com nome Frodo**
> db.pets.insert({name: "Frodo", species: "Peixe"})
> db.pets.insert({name: "Frodo", species: "Hamster"})

**2. Faça uma contagem dos pets na coleção**
> db.pets.count()
``` mongo
8
```

**3. Retorne apenas um elemento o método prático possível**
> db.pets.findOne({})
``` mongo
{
        "_id" : ObjectId("5e9a2215eb1d5bcf54431e33"),
        "name" : "Mike",
        "species" : "Hamster"
}
```

**4. Identifique o ID para o Gato Kilha.**
> db.pets.find({"species":"Gato","name":"Kilha"})
``` mongo
{ "_id" : ObjectId("5e9a223beb1d5bcf54431e35"), "name" : "Kilha", "species" : "Gato" }
```
 
**5. Faça uma busca pelo ID e traga o Hamster Mike**
> db.pets.find({ "_id": ObjectId("5e9a2215eb1d5bcf54431e33") })

**6. Use o find para trazer todos os Hamsters**
> db.pets.find({"species":"Hamster"})

**7. Use o find para listar todos os pets com nome Mike**
> db.pets.find({"name":"Mike"})

**8. Liste apenas o documento que é um Cachorro chamado Mike**
> db.pets.find({"species":"Cachorro","name":"Mike"})

## EXERCICIO 2

**1. Liste/Conte todas as pessoas que tem exatamente 99 anos. Você pode usar um count para indicar a quantidade.**
> db.italians.find({"age":{$eq: 99}}).count()
``` mongo
0
```

**2. Identifique quantas pessoas são elegíveis atendimento prioritário (pessoas com mais de 65 anos)**
> db.italians.find({"age":{$gt: 65}}).count()
``` mongo
1686
```

**3. Identifique todos os jovens (pessoas entre 12 a 18 anos).**
> db.italians.find({"age" : {"$gte" : 12, "$lte" : 18}}).count()
``` mongo
881
```

**4. Identifique quantas pessoas tem gatos, quantas tem cachorro e quantas não tem nenhum dos dois**
> db.italians.find({"cat" : {"$exists" : true}}).count()
``` mongo
6072
```
> db.italians.find({"dog" : {"$exists" : true}}).count()
``` mongo
4049
````
>db.italians.find({$and:[{"dog" : {"$exists" : false}},{"cat" : {"$exists" : false}}]}).count()
```
2341
```

**5. Liste/Conte todas as pessoas acima de 60 anos que tenham gato**
> db.italians.find({$and:[{"age":{$gt: 60}},{"cat" : {"$exists" : true}}]}).count()
``` mongo
1400
```

**6. Liste/Conte todos os jovens com cachorro**
>db.italians.find({$and:[{"age" : {"$gte" : 12, "$lte" : 18}},{"dog" : {"$exists" : true}}]}).count()
``` mongo
374
```

**7. Utilizando o $where, liste todas as pessoas que tem gato e cachorro**
> db.italians.find({ $where: "this.dog == true" } ).count()
 
**8. Liste todas as pessoas mais novas que seus respectivos gatos.**
> db.italians.find( { $where: function() { 
    return this.cat != null && this.age < this.cat.age
} } );

**9. Liste as pessoas que tem o mesmo nome que seu bichano (gatou ou cachorro)**
> db.italians.find( { $where: function() {
    return (this.cat != null && this.cat.name == this.name) || (this.dog != null && this.dog.name == this.name)
} } )

**10. Projete apenas o nome e sobrenome das pessoas com tipo de sangue de fator RH negativo**
> db.italians.find({"bloodType":/-/},{ firstname:1,surname:1,_id:0 })

**11. Projete apenas os animais dos italianos. Devem ser listados os animais com nome e idade. Não mostre o identificado do mongo (ObjectId)**
> db.italians.find({}, {'cat':1,'dog':1,_id:0});

**12. Quais são as 5 pessoas mais velhas com sobrenome Rossi?**
> db.italians.find({}).sort({age : -1}).limit(5)

**13. Crie um italiano que tenha um leão como animal de estimação. Associe um nome e idade ao bichano**
> db.italians.insert({
"firstname" : "karina",
    "surname" : "De Padua",
    "age" : 20,
    "email" : "karina@yahoo.com",
    "bloodType" : "A-",
    "jobs" : [ 
        "Veterinaria"
    ],
    "favFruits" : [ 
        "Kiwi"
    ],
    "movies" : [ 
        {
            "title" : "A menina e o leão"
        }
    ],
    "lion" : {
        "name" : "Nala",
        "age" : 15
    }
})
``` mongo
WriteResult({ "nInserted" : 1 })
```

**14. Infelizmente o Leão comeu o italiano. Remova essa pessoa usando o Id.**
> db.italians.find( { $where: function() { return this.lion != null } },{_id:1} )
``` mongo
{"_id" : ObjectId("5ea635561392e7225d23e7b4")}
```
> db.italians.remove({"_id" : ObjectId("5ea635561392e7225d23e7b4")})
``` mongo
WriteResult({ "nRemoved" : 1 })
```

**15. Passou um ano. Atualize a idade de todos os italianos e dos bichanos em 1.**
> db.italians.update({},{"$inc" : {"age" : 1,"dog.age" : 1,"cat.age" : 1}},{ multi: true })
``` mongo
WriteResult({ "nMatched" : 10000, "nUpserted" : 0, "nModified" : 10000 })
```

**16. O Corona Vírus chegou na Itália e misteriosamente atingiu pessoas somente com gatos e de 66 anos. Remova esses italianos.**
> db.italians.remove({$and:[{"age": 66},{"cat" : {"$exists" : true}}]})
``` mongo
WriteResult({ "nRemoved" : 122 })
```

**17. Utilizando o framework agregate, liste apenas as pessoas com nomes iguais a sua respectiva mãe e que tenha gato ou cachorro.**
> db.italians.aggregate([
{'$match': { mother: { $exists: 1}, $or: [ { cat: { $exists: 1}, dog: { $exists: 1}}]  }},
{'$project': {
"firstname": 1,
"mother": 1,
"isEqual": { "$cmp": ["$firstname","$mother.firstname"]}
}},
{'$match': {"isEqual": 0}}
])

**18. Utilizando aggregate framework, faça uma lista de nomes única de nomes. Faça isso usando apenas o primeiro nome**
>db.italians.aggregate([
{ $group : { _id : "$firstname",count: { $sum: 1 } } }
])

**19. Agora faça a mesma lista do item acima, considerando nome completo.**
>db.italians.aggregate([
.aggregate([
{ $group : { _id : {
      firstname: "$firstname",
      surname: "$surname"
    },count: { $sum: 1 } } }
])

**20. Procure pessoas que gosta de Banana ou Maçã, tenham cachorro ou gato,mais de 20 e menos de 60 anos.**
> db.italians.aggregate([
{'$match': {"favFruits": { $in:['Banana','Maçã']}, 
            "age" : {"$gt" : 20, "$lt" : 60},
            $or: [ { cat: { $exists: true}, dog: { $exists: true}}]
           }
}, { $sort: { age: 1 } } ])

## EXERCICIO 3 – Stockbrokers 
Importe o arquivo stocks.json do repositório Downloads NoSQL FURB. Esses dados
são dados reais da bolsa americana de 2015. A importação do arquivo JSON é um
pouco diferente da execução de um script:

```mongodb
mongoimport --db stocks --collection stocks --file stocks.json
```

Analise um pouco a estrutura dos dados novamente e em seguida, responda as
seguintes perguntas:

**1. Liste as ações com profit acima de 0.5 (limite a 10 o resultado)**
> db.stocks.find({"Profit Margin":{"$gt" : 0.5}}).limit(10)

**2. Liste as ações com perdas (limite a 10 novamente)**
> db.stocks.find({"Return on Investment":{"$lt" : 0}}).limit(10)

**3. Liste as 10 ações mais rentáveis**
> db.stocks.find({"EPS growth past 5 years":{ $exists: 1}}).sort({"EPS growth past 5 years":-1}).limit(10)

**4. Qual foi o setor mais rentável?**
> db.stocks.aggregate([
{ $group : { _id : {
      Sector: "$Sector"
    },total: { $sum: "$EPS growth past 5 years" } } 
},
{ $sort: { total: -1 } },
{ $limit : 1 }
])
```mongodb
{
    "_id" : {
        "Sector" : "Healthcare"
    },
    "total" : 46.5971
}
```

**5. Ordene as ações pelo profit e usando um cursor, liste as ações.**
> var myCursor =  db.stocks.find({"Profit Margin":{ $exists: 1}}).sort({"Profit Margin":-1});
myCursor.forEach(printjson);

**6. Renomeie o campo “Profit Margin” para apenas “profit”.**
> db.stocks.update({}, { $rename: { 'Profit Margin': 'profit' } },{ multi: true })

**7. Agora liste apenas a empresa e seu respectivo resultado**
> db.stocks.aggregate([
{ $group : { _id : {
      Company: "$Company"
    },total: { $sum: "$EPS growth past 5 years" } } 
},
{ $sort: { total: -1 } }
])

**8. Analise as ações. É uma bola de cristal na sua mão... Quais as três ações você investiria?**
> db.stocks.find({"Analyst Recom":{$exists:1}}).sort({"Analyst Recom":-1,"EPS growth past 5 years":-1,"profit":1}).limit(3) 

**9. Liste as ações agrupadas por setor**
> db.stocks.aggregate([
    { $group: { _id: { Sector: "$Sector"}
              } 
  }
])

## EXERCICIO 3 – Fraude na Enron!

Um dos casos mais emblemáticos de fraude no mundo é o caso da Enron. A
comunicade do MongoDB utiliza muito esse dataset pois o mesmo se tornou
público, então vamos importar esse material também:

```mongodb
mongoimport --db stocks --collection eron --file enron.json
```

1. Liste as pessoas que enviaram e-mails (de forma distinta, ou seja, sem
repetir). Quantas pessoas são?
> db.eron.distinct("sender").length

2. Contabilize quantos e-mails tem a palavra “fraud”
> db.eron.find({"sender":{$exists:1},"text": /fraud/}).count()
```mongodb
23
```
