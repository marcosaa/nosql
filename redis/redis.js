const Redis = require('ioredis');
const _ = require('lodash');

(async () => {
  // Set Redis credentials
  const redis = new Redis({
    host: '127.0.0.1',
    port: 6379,
    lazyConnect: true
  });

  // Connect to Redis
  await redis.connect();

     // total de registros
    let totreg = 5;

    const valoresCartela = [];
    let cartelas = [];
    for (let x=1; x <= 99; x++) {
        await redis.sadd("cartela",x);
        valoresCartela.push(x);
    }
    console.log('################# Criando participantes ####################');
    for ( let i=1; i <= totreg; i++) {
        const id = "user:"+i;  
        let numeros;
        await redis.del(id);
        await redis.del("cartela:"+i);
        await redis.del("score:"+i);
        await redis.hmset(id, "name", "usuario"+i);
        await redis.hmset(id, "bcartela", "cartela:"+i);
        await redis.hmset(id, "bscore", "score:"+i);
        // cria o score
        await redis.zadd("score",0,"score:"+i);
        //sorteando valores cartela
        const sorteados = _.sampleSize(valoresCartela, 15);
        cartelas[i] = sorteados;

        //grava usuarios redis
        await redis.sadd("cartela:"+i, sorteados); 
        const name = await redis.hmget(id, 'name');
        console.log('Criado '+name);
        console.log('Cartela: '+sorteados.join(','));
        console.log('');
    }
    console.log('################# Efetuando Sorteio ####################');
    let continuaSorteio = true;
    let vencedor = '';
    //enquanto é para ser sorteado
    while(continuaSorteio==true){
        //efetua o sorteio
        const sorteado= valoresCartela[Math.floor(Math.random() * valoresCartela.length)];
        //retira o valor sorteado
        valoresCartela.splice(valoresCartela.indexOf(sorteado), 1);
        //grava valores sorteados
        await redis.sadd("sorteados",sorteado);

        //confere cartelas
        for (let cont=1; cont <=totreg; cont++) {  
            //verifica se existe o valor
            if( cartelas[cont].indexOf(sorteado) != -1 ){
                //grava valores encontrados para o usuario
                await redis.sadd("encontrado:"+cont, sorteado); 
                //adiciona o score
                await redis.zincrby('score', 1, "score:"+cont);
                // retorna score
                const score = await redis.zscore('score', "score:"+cont);
                //se chegou no score de achou o ganhador
                if(Number(score) == 15){
                    vencedor = "user:"+cont;
                    continuaSorteio = false; 
                    break;
                }
            }
        }
        //caso acabe os valores a ser sorteados
        if( valoresCartela.length == 0 ){
            continuaSorteio = false; 
        }
    }
    
    for (let cont=1; cont <=totreg; cont++) { 
        const score = await redis.zscore('score', "score:"+cont);
        console.log("* user: "+cont+' score:'+score);
    }
    console.log('############## Ganhador ##################');
    console.log('Nome: '+vencedor);
    //exibe o ganhador
    await redis.zrevrangebyscore(["score", 99, 1, "WITHSCORES", "LIMIT", 0, 1], function(rangeError, rangeResponse) {
        if (rangeError) throw rangeError;
       
        console.log(rangeResponse);
    });
   
  // Disconnect from Redis
  await redis.disconnect();
})();

