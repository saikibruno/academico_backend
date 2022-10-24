// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aluno from "App/Models/Aluno"

export default class AlunoController {
    index(){
        return Aluno.query().preload('turmas').preload('aulas')
    }

    store({request}){
        const dados = request.only(['nome','cpf','matricula','email','telefone','cep','logradouro','complemento','numero','bairro'])

        return Aluno.create(dados)
    }

    show({request}){
        const id = request.param('id')
        return Aluno.findOrFail(id)
    }

    async destroy({request}){
        const id = request.param('id')
        const dados = await Aluno.findOrFail(id)

        return dados.delete()
    }

    async update({request}){
        const id = request.param('id')
        const dados = await Aluno.findOrFail(id)
        const dado = await request.only(['nome','cpf','matricula','email','telefone','cep','logradouro','complemento','numero','bairro'])
        
        return dados.merge(dado).save()
    }
}
