import * as echarts from 'echarts'

class FipeController {
  opcoesIniciais = [
    {
      descricao: 'Motoca',
      icone: 'mdi-motorbike',
    },
    {
      descricao: 'Carrinho',
      icone: 'mdi-car',
    },
    {
      descricao: 'Caminhãozinho',
      icone: 'mdi-truck',
    },
  ]

  opcaoInicial = null

  enOpcaoInicial = {
    0: 'motos',
    1: 'carros',
    2: 'caminhoes',
  }

  marcas = []
  modelos = []
  anos = []

  marca = null
  modelo = null
  ano = null
  valor = null
  grafico = []

  constructor(
    context,
    buscaMarcasUsecase,
    buscaModeloUsecase,
    buscaAnosUsecase,
    buscaValorUsecase,
    buscaValoresGraficoUsecase
  ) {
    this.context = context
    this.buscaMarcasUsecase = buscaMarcasUsecase
    this.buscaModeloUsecase = buscaModeloUsecase
    this.buscaAnosUsecase = buscaAnosUsecase
    this.buscaValorUsecase = buscaValorUsecase
    this.buscaValoresGraficoUsecase = buscaValoresGraficoUsecase
  }

  async watchOpcaoInicial() {
    this.modelo = null
    this.ano = null
    this.marca = null
    this.valor = null
    this.marcas = []
    this.modelos = []
    this.anos = []
    this.marcas = await this.buscaMarcasUsecase(
      this.enOpcaoInicial[this.opcaoInicial]
    )
  }

  async buscaModelos(marca) {
    this.modelo = null
    this.ano = null
    this.valor = null
    this.marca = marca
    this.modelos = await this.buscaModeloUsecase(
      this.enOpcaoInicial[this.opcaoInicial],
      marca
    )
  }

  async buscaAnos(modelo) {
    this.ano = null
    this.valor = null
    this.modelo = modelo
    this.anos = await this.buscaAnosUsecase(
      this.enOpcaoInicial[this.opcaoInicial],
      this.marca,
      modelo
    )

    this.grafico = await this.buscaValoresGraficoUsecase(
      this.enOpcaoInicial[this.opcaoInicial],
      this.marca,
      this.modelo,
      this.anos
    )

    setTimeout(() => {
      this.criaGrafico('chart')
    }, 200)
  }

  async buscaValores(ano) {
    this.ano = ano
    this.valor = null
    this.valor = await this.buscaValorUsecase(
      this.enOpcaoInicial[this.opcaoInicial],
      this.marca,
      this.modelo,
      ano
    )
  }

  criaGrafico(id) {
    const chartDiv = document.getElementById(id)

    if (chartDiv) {
      const myChart = echarts.init(chartDiv)
      myChart.setOption({
        grid: {
          left: 100,
          bottom: 30,
          top: 30,
          right: 30,
        },
        xAxis: {
          type: 'category',
          data: this.grafico.map((grafico) => grafico.valor.AnoModelo),
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value) {
              return value
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
                .replace('R$ ', '')
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            var tar = params[0]
            return (
              tar.name +
              '<br/> Valor: ' +
              tar.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            )
          },
        },
        series: [
  
          {
            data: this.grafico.map((grafico) => {
              return {
                value: parseFloat(
                  grafico.valor.Valor.replace('R$ ', '')
                    .split('.')
                    .join('')
                    .replace(',', '.')
                ),
              }
            }),
            areaStyle: {
              opacity: 0.4,
              color: 'blue',
            },
            smooth: true,
            lineStyle: { color: 'blue' },
            type: 'line',
          },
          {
            data: this.grafico.map((grafico) => {
              return {
                value: parseFloat(
                  grafico.valor.Valor.replace('R$ ', '')
                    .split('.')
                    .join('')
                    .replace(',', '.')
                ),
                itemStyle: { color: 'red' },
              }
            }),
            type: 'bar',
          },
        ],
      })
    }
  }
}

export { FipeController }
