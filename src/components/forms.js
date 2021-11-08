import React from 'react'
import PropTypes from 'prop-types'

class Forms extends React.Component {
  render () {
    const {
      value: { largura, altura, numPortas, numJanelas },
      handleChange,
      calcBtn,
      calcTinta
    } = this.props
    return (

            <form
            >
                <label>
                    Largura(m²):
                    <input
                        className="input"
                        type="number"
                        max="15"
                        min="1"
                        name="largura"
                        step=".01"
                        value={largura}
                        onChange={handleChange} />
                </label><br />
                <label>
                    Altura(m²):
                    <input
                        className="input"
                        type="number"
                        max="15"
                        min="1"
                        name="altura"
                        step=".01"
                        value={altura}
                        onChange={handleChange} />
                </label><br />
                <label>
                    Número de portas:
                    <input
                        className="input"
                        type="number"
                        min="0"
                        name="numPortas"
                        value={numPortas}
                        onChange={handleChange} />
                </label><br />
                <label>
                    Número de janelas:
                    <input
                        className="input"
                        type="number"
                        min="0"
                        name="numJanelas"
                        value={numJanelas}
                        onChange={handleChange} />
                </label>
                <button
                    type="submit"
                    onClick={calcBtn}>
                    Adicionar medidas
                </button><br /><br />
                <button
                    type="submit"
                    onClick={calcTinta}>
                    Calcular Tinta
                </button><br />
            </form>
    )
  }
}

export default Forms

Forms.propTypes = {
  value: PropTypes.object,
  largura: PropTypes.number,
  altura: PropTypes.number,
  numPortas: PropTypes.number,
  numJanelas: PropTypes.number,
  areaCalc: PropTypes.number,
  handleChange: PropTypes.func,
  calcBtn: PropTypes.func,
  calcTinta: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string
}
