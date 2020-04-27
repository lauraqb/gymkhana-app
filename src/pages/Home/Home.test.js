import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import ConnectedHome, { Home } from './Home'

let component

beforeEach(() => {
    component = shallow(<Home setUsername={()=>{}} setTeam={()=>{}}/>);
})

describe('Home Page', () => {
    it ('renders correctly', () => {
        expect(component).toMatchSnapshot()
    })
    it ('renders one input and one button', () => {
        expect(component.find('.g-input')).toHaveLength(1)
        expect(component.find('.g-btn')).toHaveLength(1)
    })
    it ('Calls setUsername and setTeam when there is no gameId in props', () => {
        let i = 0
        let j = 0
        const setUsernameSpy = () =>  i++
        const setTeamSpy = () =>  j++
        shallow(<Home setUsername={setUsernameSpy} setTeam={setTeamSpy}/>)
        expect(i).toBe(1)
        expect(j).toBe(1)
    })
    it ('Should not call setUsername when gameId is in props', () => {
        let i = 0
        const setUsernameSpy = () =>  i++
        const comp = shallow(<Home setUsername={setUsernameSpy} setTeam={()=>{}} gameId={1}/>)
        expect(i).toBe(0)
    })
    it ('shows invalid pin message when invalidPin state is true', () => {
        component.setState({ invalidPinGame: true })
        expect(component.find('#g-invalid-pin')).toHaveLength(1)
    })
    it ('Should not show invalid pin message when invalidPin state is false (by default)', () => {
        expect(component.find('#g-invalid-pin')).toHaveLength(0)
    })
    it ('Shows empty Input message when emptyInput state is true', () => {
        component.setState({ emptyInput: true })
        expect(component.find('#g-empty-input')).toHaveLength(1)
    })
    it ('Should not show empty Input pin message when emptyInput state is false (by default)', () => {
        expect(component.find('#g-empty-input')).toHaveLength(0)
    })
    
})
