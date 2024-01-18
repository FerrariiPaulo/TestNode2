import { describe, expect, it } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService';
import Usuario from '../../models/usuario';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  // arrange
  it('O usuario deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Paulo',
      email: 'p@p.com',
    };

    // act
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    // assert
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário deve ser obrigatória');
  });

  // arrange
  it('A senha do usuário precisa ser criptografada quando salva no banco de dados', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123'
    };

    // act
    const resultado = await authService.cadastrarUsuario(data);
    const senhasIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    // assert
    expect(senhasIguais).toStrictEqual(true);
    await Usuario.excluir(resultado.content.id);
  });

  //arrange
  it('Não pode ser cadastrado usuário com email duplicado', async () => {
    const usuarioMock = {
      nome: 'Paulo',
      email: 'p@p.com',
      senha: '1245',
    };

    //act
    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    //assert
    await expect(usuarioSave).rejects.toThrowError('O email já está cadastrado!');
  })

  //arrange
  it('Ao ser cadastrado o usuário deve retonar uma mensagem informando que o usuário foi cadastrado', async() => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    //act
    const resultado = await authService.cadastrarUsuario(data);

    //assert
    expect(resultado).toEqual('usuário criado');
    await Usuario.excluir(resultado.content.id);
  })

  //arrange
  it(' Ao cadastrar um usuário, validar o retorno das informações do usuário', async() => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    //act 
    const resultado = await authService.cadastrarUsuario(data);

    //assert
    expect(resultado).toMatchObject(data);
    await Usuario.excluir(resultado.content.id);
  })
});
