const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    })

    app.get('/atendimentos/:id', (req, res) => {
        //req.params tras os parametro necessário para busca no banco
        const id = parseInt(req.params.id);

        Atendimento.buscarPorId(id,res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res);
        
    });
    
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const atendimento = req.body;
        Atendimento.altera(id, atendimento, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    });
}