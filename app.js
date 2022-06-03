const http = require('http');
const queryString = require('query-string');
const url = require('url');
const hostname = '127.0.0.1';
const fs = require('fs');
const port = 9000;


const server = http.createServer((req, res) => {
    let resposta;
    const urlparse = url.parse(req.url, true);
    //receber informacoes do usuario
    const params = queryString.parse(urlparse.search);
    //criar usuario //atualizar um usuario
    if(urlparse.pathname == '/criar-att-usuario'){
        console.log(params);
        //salvar as informacoes do usuario
    fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params), function (err) {
        if (err) throw err;
         console.log('Saved!');

         resposta = 'usuario criado com sucesso';
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
        });   
    //selecionar usuario
    }else if(urlparse.pathname == '/selecionar-usuario'){
        fs.readFile(`users/${params.id}.txt`, function(err, data) {
            resposta = data;
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
        });
    }  

  //remover usuario

    else if(urlparse.pathname == '/remover-usuario'){
        fs.unlink(`users/${params.id}.txt`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
            resposta = err ? 'usuario nao encontrado' : 'usuario deletado com sucesso';
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
        });

}

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




//urls
//localhost:9000/criar-att-usuario?nome=mars1&idade=22&id=1
//localhost:9000/criar-att-usuario?nome=mars1&idade=23&id=1
//localhost:9000/selecionar-usuario?id=1
//localhost:9000/remover-usuario?id=1