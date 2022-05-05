const buscaAnosRepository = (axios) => async (tipo, marca, modelo) => {
  try {
    const response = await axios.get(`/${tipo}/marcas/${marca}/modelos/${modelo}/anos`)
    return response?.data ?? []
  } catch (error) {
    throw error
  }
}

export { buscaAnosRepository }
