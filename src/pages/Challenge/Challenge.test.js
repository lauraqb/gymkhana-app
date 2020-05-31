import React from 'react'
import { shallow } from 'enzyme'
import { Challenge } from './Challenge'
import ChallengeDescription from './components/ChallengeDescription'
import ChallengeCompleted from './components/ChallengeCompleted'
import Loading from 'components/Loading/Loading'

const mockChallengeData = {
    points: 1,
    challengeText: "Texto blah blah",
    textoSecundario: "texto Secundario",
    placeholder: "Contraseña",
}

describe('Challenge Container Component', () => {

    it ('renders without challengeData', () => {
        const component = shallow(<ChallengeDescription/>)
        const wrapper = component.find('[data-test="ChallengeDescription"]')
        expect(wrapper.length).toBe(1)
    })
    it ('renders with challengeData', () => {
        const component = shallow(<ChallengeDescription challengeData={mockChallengeData}/>)
        expect(component.find('#challenge-text').text()).toBe(mockChallengeData.challengeText)
        expect(component.find('.challenge-subtext').text()).toBe(mockChallengeData.textoSecundario)
    })
})

describe('Challenge Completed Component', () => {

    it ('renders with status loading', () => {
        const mockData = {loading: true}
        const component = shallow(<ChallengeCompleted currentChallengeCompleted={mockData}/>)
        expect(component.find(Loading).length).toBe(1)
    })
    it ('renders with status passed', () => {
        const mockData = {passed: true}
        const component = shallow(<ChallengeCompleted currentChallengeCompleted={mockData}/>)
        const wrapper = component.find('[data-test="ChallengeCompleted"]')
        expect(wrapper.length).toBe(1)
    })
})
