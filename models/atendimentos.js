const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clientEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome:  'data', 
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:  'cliente', 
                valido: clientEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }

        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros){

            res.status(400).json(erros);

        }else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = "INSERT INTO atendimentos SET ?";
            
            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro){
                    res.status(400).json(erro);
                }else {
                    res.status(201).json(atendimento);
                }
            })
        }
    }

    lista(res){
        const sql = "SELECT * FROM Atendimentos";
        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultado);
            }
        })
    }

    buscarPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0];
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, atendimento, res) {
        if (atendimento.data){
            atendimento.data =  moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [atendimento, id], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            }else {
                res.status(200).json({...atendimento, id});
            }
        })

    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id =?';

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            }else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;