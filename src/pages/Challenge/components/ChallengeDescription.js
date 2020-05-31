import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaExclamationCircle} from 'react-icons/fa/'
import Loading from 'components/Loading/Loading'
import Timer from './Timer'

export const ChallengeDescription = (props) => {
    const [answer, setAnswer] = useState("")
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [loading, setLoading] = useState(false)
    const challengeData = props.challengeData ? props.challengeData : {}

    const handleSubmit = (event) => {
        event.preventDefault();
        const answerLower = answer.toLowerCase().trim()
        setLoading(true)
        props.validateAnswer(answerLower).then( ({data}) => {
            setLoading(false)
            if(data.valid) {
                props.onChallengeSubmit()
            }
            else {
                setWrongAnswer(true)
            }
        })
    }

    const handleChange = (event) => {
        setAnswer(event.target.value)
        setWrongAnswer(false)
    }
    
    return <React.Fragment>
        {loading && <Loading/>}
        <div data-test="ChallengeDescription" className="container challenge-container">
            <h2 className="challenge-title">Misión #{challengeData.id}</h2>
            <div className="row">
                <div className="col-12" align="center">
                    <p id="challenge-text">{challengeData.challengeText}</p>
                    <p className="challenge-subtext" >{challengeData.textoSecundario}</p>
                    {challengeData.image ? <div className="challenge-main-img"><img src={challengeData.image} alt={challengeData.image}/></div>:"" }
                    <Form id="myForm" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder={challengeData.placeholder} name="answer" value={answer} onChange={handleChange} />
                            { wrongAnswer && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Respuesta incorrecta. ¡Sigue intentándolo!</Form.Text>}
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

export default ChallengeDescription