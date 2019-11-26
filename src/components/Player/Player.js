import React, { PureComponent } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import styled from 'styled-components'

//Images
import Dice from '../../assets/images/dice.png'

//Styled Components
const Img = styled.img`
	width: 50px;
	margin: 10px 0;
`

const ContentCenterRow = styled.div`
	.row {
		justify-content: center!important;
	}

	.player-name {
		text-transform: capitalize;
	}

	.dice {
		cursor: pointer;
	}
`

class Player extends PureComponent
{

	state = {
		valueDices: 0
	}

	throwDices = _ => {
		const { dado, isYourRound } = this.props
		
		if (isYourRound) {
			const min = Math.ceil(1);
			const max = Math.floor(dado);
			this.setState({ valueDices: Math.floor(Math.random() * (max - min + 1)) + min })
		}
	}

	render() {
		const { nome, forca, agilidade, arma, isYourRound } = this.props
		const { valueDices } = this.state

		if (!nome)
			return (
				<Row>Loading...</Row>
			)

		return (
			<ContentCenterRow>
				<Row><img /></Row>
				<Row className='player-name'>{nome}</Row>
				<Row>Attributes: {`+${forca} força +${agilidade} agilidade`}</Row>
				<Row>Equipment: {`${arma.nome} Atk +${arma.ataque} Def +${arma.defesa}`}</Row>
				<Row>
					<Form.Check 
						type='radio' 
						id='rbPlayer' 
						label={isYourRound && 'Your turn!'}
						disabled={!isYourRound} defaultChecked={isYourRound} />
				</Row>
				<Row><Img src={Dice} alt='Dice' onClick={this.throwDices} className='dice' /></Row>
				<Row>
					<Col xs='8' md='4' lg='2'>
						<Form.Control 
							type='text'
							refs='txtDice'
							value={valueDices > 0 ? valueDices : ''}
							readOnly
						/>
					</Col>
				</Row>
			</ContentCenterRow>
		)
	}
}

export default Player