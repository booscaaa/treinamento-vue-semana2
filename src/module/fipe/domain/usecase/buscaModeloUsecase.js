const buscaModelosUsecase = (repository) => async (tipo, marca) => {
  try {
    return repository(tipo, marca)
  } catch (error) {
    throw error
  }
}

export { buscaModelosUsecase }
