const buscaValorRepository = (axios) => async (tipo, marca, modelo, ano) => {
  try {
    const response = await axios.get(`/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
    return response?.data ?? []
  } catch (error) {
    throw error
  }
}

export { buscaValorRepository }
