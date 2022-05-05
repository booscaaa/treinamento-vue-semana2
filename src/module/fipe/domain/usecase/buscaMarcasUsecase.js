const buscaMarcaUsecase = (repository) => async (tipo) => {
  try {
    return await repository(tipo)
  } catch (error) {
    throw error
  }
}

export { buscaMarcaUsecase }
