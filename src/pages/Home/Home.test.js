import React from 'react'
import { shallow } from 'enzyme'
import { render, fireEvent, cleanup  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import ConnectedHome, { Home } from './Home'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
jest.mock('axios')

let component

beforeEach(() => {
    component = shallow(<Home setUsername={()=>{}} setTeam={()=>{}}/>);
})

afterEach(cleanup)

describe('Home Page', () => {
    it ('Renders correctly', () => {
        expect(component).toMatchSnapshot()
    })

    it ('Renders one input and one button', () => {
        expect(component.find('.g-input')).toHaveLength(1)
        expect(component.find('#home-btn')).toHaveLength(1)
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

    it ('Shows an "empty Input" warning message when emptyInput state is true', () => {
        component.setState({ emptyInput: true })
        expect(component.find('#g-empty-input')).toHaveLength(1)
    })

    it ('Should not show empty Input pin message when emptyInput state is false (by default)', () => {
        expect(component.find('#g-empty-input')).toHaveLength(0)
    })

    it ('Changes "emptyInput state" when handleSubmit with empty input', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') }
        component.setState({ gamePin: ""})
        expect(component.state().emptyInput).toEqual(false)
        const form = component.find('#home-form').first();
        form.simulate('submit', fakeEvent);
        expect(component.state().emptyInput).toEqual(true)
    })
})


describe('Home Page with axios', () => {
    
    it('displays a warning message when entering invalid Pin Game', async () => {

        axiosMock.post.mockResolvedValueOnce({
            data: {valid:false, result:{id:1}}
        })

        const {getByText, getByPlaceholderText } = render(<Home setUsername={()=>{}} setTeam={()=>{}}/>)
        fireEvent.change(getByPlaceholderText('Game PIN'), { target: { value: '123' } })
        fireEvent.click(getByText('Entrar'))
        await expect(axiosMock.post).toHaveBeenCalled()
        expect(getByText('¡PIN inválido!')).toBeInTheDocument()
    })

    it('updates props.idGame when entering valid Pin Game', async () => {

        axiosMock.post.mockResolvedValueOnce({
            data: {valid:true, result:{id:1}}
        })

        let gameId = null
        const setGameSpy = (id) => {
            gameId = '123'
        }
        const {getByText, getByPlaceholderText, history } = render(<Home setGame={setGameSpy} setUsername={()=>{}} setTeam={()=>{}}/>)
        fireEvent.change(getByPlaceholderText('Game PIN'), { target: { value: '123' } })
        fireEvent.click(getByText('Entrar'))
        await expect(axiosMock.post).toHaveBeenCalled()
        expect(gameId).toBe('123')
    })
})

const renderWithRouterrender = (
    ui,
    {
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    }
}

describe('when Home Page has game id in props', () => {

    it('redirects to joinPage', async () => {
        const {getByText, getByPlaceholderText, history } = renderWithRouterrender(<Home gameId={1} setUsername={()=>{}} setTeam={()=>{}}/>)
        await expect(history.location.pathname).toEqual('/join')
    })
})
