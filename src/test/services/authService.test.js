import { describe, expect } from '@jest/globals';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  // arrange
  it('O usuario deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@teste.com.br',
    };

    // act
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    // assert
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário deve ser obrigatória');
  });
});
