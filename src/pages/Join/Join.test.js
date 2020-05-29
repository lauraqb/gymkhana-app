import React from 'react'
import { shallow } from 'enzyme'
import { Join } from './Join'
import JoinUser from './components/JoinUser'
import JoinTeam from './components/JoinTeam'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

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

let component

beforeEach(() => {
    component = shallow(<Join/>);
})

describe('Join Page', () => {
    it('renders correctly', () => {
        expect(component).toMatchSnapshot()
    })

    it('displays joinUser Component when username is not defined', () => {
        const component = shallow(<Join/>)
        expect(component.find(JoinUser).length).toBe(1)
        expect(component.find(JoinTeam).length).toBe(0)
    })
    
    it('displays joinTeam Component when username is defined but team is not', () => {
        const component = shallow(<Join userid='1'/>)
        expect(component.find(JoinUser).length).toBe(0)
        expect(component.find(JoinTeam).length).toBe(1)
    })

    it('redirects to intro page when username and team are defined', async () => {
        const { history } = renderWithRouterrender(<Join userid='1' team='1'/>)
        await expect(history.location.pathname).toEqual('/intro')
    })
})