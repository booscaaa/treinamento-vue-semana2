import { axiosInstance } from '@/core/axios'
import { FipeController } from '../controller/fipeController'
import { buscaAnosRepository } from '../data/repository/buscaAnosRepository'
import { buscaMarcaRepository } from '../data/repository/buscaMarcasRepository'
import { buscaModelosRepository } from '../data/repository/buscaModelosRepository'
import { buscaValorRepository } from '../data/repository/buscaValorRepository'
import { buscaAnosUsecase } from '../domain/usecase/buscaAnosUsecase'
import { buscaMarcaUsecase } from '../domain/usecase/buscaMarcasUsecase'
import { buscaModelosUsecase } from '../domain/usecase/buscaModeloUsecase'
import { buscaValoresGraficoUsecase } from '../domain/usecase/buscaValoresGraficoUsecase'
import { buscaValorUsecase } from '../domain/usecase/buscaValorUsecase'

const buscaMarcaRepositoryImpl = buscaMarcaRepository(axiosInstance)
const buscaAnosRepositoryImpl = buscaAnosRepository(axiosInstance)
const buscaModelosRepositoryImpl = buscaModelosRepository(axiosInstance)
const buscaValorRepositoryImpl = buscaValorRepository(axiosInstance)

const buscaMarcasUsecaseImpl = buscaMarcaUsecase(buscaMarcaRepositoryImpl)
const buscaAnosUsecaseImpl = buscaAnosUsecase(buscaAnosRepositoryImpl)
const buscaModelosUsecaseImpl = buscaModelosUsecase(buscaModelosRepositoryImpl)
const buscaValorUsecaseImpl = buscaValorUsecase(buscaValorRepositoryImpl)
const buscaValoresGraficoUsecaseImpl = buscaValoresGraficoUsecase(
  buscaValorRepositoryImpl
)
const fipeController = (context) =>
  new FipeController(
    context,
    buscaMarcasUsecaseImpl,
    buscaModelosUsecaseImpl,
    buscaAnosUsecaseImpl,
    buscaValorUsecaseImpl,
    buscaValoresGraficoUsecaseImpl
  )

export { fipeController }
