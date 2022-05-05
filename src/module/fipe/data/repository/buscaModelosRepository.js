const buscaModelosRepository = (axios) => async (tipo, marca) => {
  try {
    const response = await axios.get(`/${tipo}/marcas/${marca}/modelos`)
    return response?.data?.modelos ?? []
  } catch (error) {
    throw error
  }
}

export { buscaModelosRepository }
