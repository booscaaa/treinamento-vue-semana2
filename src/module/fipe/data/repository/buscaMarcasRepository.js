const buscaMarcaRepository = (axios) => async (tipo) => {
  try {
    const response = await axios.get(`/${tipo}/marcas`)
    return response?.data ?? []
  } catch (error) {
    throw error
  }
}

export { buscaMarcaRepository }
