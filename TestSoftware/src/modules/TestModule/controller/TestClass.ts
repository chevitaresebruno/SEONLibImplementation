import {
  criarTestClass as _criarTestClass,
  listarTestClass as _listarTestClass,
  obterTestClass as _obterTestClass,
  atualizarTestClass as _atualizarTestClass,
  excluirTestClass as _excluirTestClass,
} from '../api/TestClass'
import type { TestClass, TestClassCreateReq } from '../types/TestClass'
import { useUiStore } from '@/stores/ui'
import { AxiosError } from 'axios'

export const listarTestClass = async () => {
  try {
    const { data } = await _listarTestClass()
    return data.value
  } catch (error) {
    throw error
  }
}

export const criarTestClass = async (TestClass: TestClassCreateReq) => {
  const ui = useUiStore()

  try {
    const { data } = await _criarTestClass(TestClass)

    ui.exibirAlerta({
      text: data.message,
      color: 'success'
    })

    return true

  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 400 &&
      error.response.data.errors
    ) {
      ui.exibirAlertas(
        error.response.data.errors
          .map((err: { mensagem: string }) => ({ text: err.mensagem, color: 'error' }))
      )

      return false

    } else {
      throw error
    }
  }
}

export const obterTestClass = async (id: string) => {
  try {
    const data = await _obterTestClass(id)
    return data
  } catch (error) {
    throw error
  }
}

export const atualizarTestClass = async (TestClass: TestClass) => {
  try {
    const { data } = await _atualizarTestClass(TestClass)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirTestClass = async (id: string) => {
  try {
    const { data } = await _excluirTestClass(id)
    return true
  } catch (error) {
    throw error
  }
}

export const excluirTestClasss = async (ids: string[]) => {
  try {
    for (const id of ids) {
      const sucesso = await excluirTestClass(id)
    }
    return true
  } catch (error) {
    throw error
  }
}



