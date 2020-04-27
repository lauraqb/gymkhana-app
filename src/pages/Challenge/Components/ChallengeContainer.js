import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaExclamationCircle} from 'react-icons/fa/'
import Loading from 'components/Loading/Loading'
import Timer from './Timer'

class ChallengeComponent extends React.Component {
    
    constructor(props) {
        
        super(props)
        this.state = {
            answer : "",
            wrongAnswer: false,
            loading: false
        }
        this.challengeData = this.props.challengeData ? this.props.challengeData : {}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        const answer = this.state.answer.toLowerCase().trim()
        this.setState({loading: true})
        this.props.validateAnswer(answer).then( ({data}) => {
            this.setState({loading: false})
            if(data.valid) {
                this.props.onChallengeSubmit()
            }
            else {
                this.setState({wrongAnswer: true})
            }
        })
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          wrongAnswer: false 
        })
    }

    render() {
        const challengeData = this.challengeData
        return <React.Fragment>
            {this.state.loading && <Loading/>}
            <div data-test="ChallengeContainer" className="container challenge-container">
                <h2 className="challenge-title">Misión #{challengeData.id}</h2>
                <div className="row">
                    <div className="col-12" align="center">
                        <p id="challenge-text">{challengeData.challengeText}</p>
                        <p className="challenge-subtext" >{challengeData.textoSecundario}</p>
                        {challengeData.image ? <div className="challenge-main-img"><img src={challengeData.image} alt={challengeData.image}/></div>:"" }
                        <Form id="myForm" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder={challengeData.placeholder} name="answer" value={this.state.answer} onChange={this.handleChange} />
                                { this.state.wrongAnswer && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Respuesta incorrecta. ¡Sigue intentándolo!</Form.Text>}
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                        {challengeData.time ? <Timer seconds={challengeData.time} time={challengeData.time}/>:"" }
                    </div>
                </div>
            </div>
            {challengeData.decorativeImage ? <div className="challenge-img-right"><img src={challengeData.decorativeImage} alt={challengeData.decorativeImage}/></div>:"" }
        </React.Fragment>
    }
}

export default ChallengeComponent;