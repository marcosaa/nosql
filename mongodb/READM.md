
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

**14. Infelizmente o Leão comeu o italiano. Remova essa pessoa usando o Id.**

**15. Passou um ano. Atualize a idade de todos os italianos e dos bichanos em 1.**

**16. O Corona Vírus chegou na Itália e misteriosamente atingiu pessoas somente com gatos e de 66 anos. Remova esses italianos.**

**17. Utilizando o framework agregate, liste apenas as pessoas com nomes iguais a sua respectiva mãe e que tenha gato ou cachorro.**

**18. Utilizando aggregate framework, faça uma lista de nomes única de nomes. Faça isso usando apenas o primeiro nome**

**19. Agora faça a mesma lista do item acima, considerando nome completo.**

**20. Procure pessoas que gosta de Banana ou Maçã, tenham cachorro ou gato,mais de 20 e menos de 60 anos.**
