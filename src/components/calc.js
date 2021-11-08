import React from 'react'
import Forms from '../components/forms'

const defaultState = {
  largura: '',
  altura: '',
  numPortas: '',
  numJanelas: '',
  areaPintura: []
}

class Calc extends React.Component {
  constructor () {
    super()

    this.state = {
      ...defaultState,
      somaArea: 0,
      latasDeTinta: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.calcBtn = this.calcBtn.bind(this)
    this.calcTinta = this.calcTinta.bind(this)
    this.gerarResultadoFinal = this.gerarResultadoFinal.bind(this)
  }

  handleChange ({ target }) {
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  calcBtn (event) {
    event.preventDefault()
    const { largura, altura, numPortas, numJanelas, areaPintura } = this.state
    const altPorta = 1.90

    if (!numPortas || altura - altPorta > 0.30) {
      const tamParede = largura * altura
      const porta = numPortas * 1.52
      const janela = numJanelas * 2.40

      if (porta + janela < tamParede / 2 && areaPintura.length < 4) {
        const areaDePintura = tamParede - porta - janela
        return this.setState((prevState) => ({
          areaPintura: [...prevState.areaPintura, areaDePintura]
        })
        )
      }
      return alert('Click em Calcular tinta')
    }
  }

  async calcTinta (event) {
    event.preventDefault()
    const { areaPintura } = this.state
    const area = areaPintura.reduce((acc, areaPintura) => acc + areaPintura, 0)
    this.setState({ somaArea: area }, async () => {
      await this.gerarResultadoFinal()
      this.setState({ ...defaultState })
    })
  }

  async gerarResultadoFinal () {
    const { somaArea } = this.state
    if (somaArea) {
      const litrosDeTinta = somaArea / 5
      const lata1 = 0.5
      const lata2 = 2.5
      const lata3 = 3.6
      const lata4 = 18

      if (litrosDeTinta && litrosDeTinta <= lata1) {
        return this.setState({ latasDeTinta: '0,5 L' })
      } else if (litrosDeTinta <= lata2) {
        return this.setState({ latasDeTinta: '2,5 L' })
      } else if (litrosDeTinta <= lata3) {
        return this.setState({ latasDeTinta: '3,6 L' })
      } else if (litrosDeTinta <= lata4) {
        return this.setState({ latasDeTinta: '18 L' })
      }
    }
  }

  render () {
    const result = this.state.somaArea.toFixed(2)
    const tinta = (this.state.somaArea / 5).toFixed(2)
    return (

      <div>
        <div className="containerSpan">
            <span>Preencha abaixo com as medidas das paredes</span>
        </div>
        <Forms
          value={this.state}
          handleChange={this.handleChange}
          calcBtn={this.calcBtn}
          calcTinta={this.calcTinta}
        /><br />
        <div className="containerSpan">
            <span>Resultado: {result}m²</span><br />
            <span>Litros de tinta necessários: {tinta} L</span><br />
            <span>Será necessário lata de {this.state.latasDeTinta} </span>
        </div>
      </div>
    )
  }
}

export default Calc
