import React from 'react'
import { render, fireEvent, screen, cleanup, wait  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Home } from 'pages/Home/Home'
import axiosMock from 'axios'
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

afterEach(cleanup)

jest.mock('axios')

describe('when entering valid pin game in HomPage', () => {

    axiosMock.post.mockResolvedValueOnce({
        data: {valid:true, result:{id:1}}
    })

    it('redirects to joinPage', async () => {
        let gameId = null
        const setGameSpy = (id) => {
            gameId = '123'
        }
        const {getByText, getByPlaceholderText, history } = renderWithRouterrender(<Home setGame={setGameSpy} setUsername={()=>{}} setTeam={()=>{}}/>)
        fireEvent.change(getByPlaceholderText('Game PIN'), { target: { value: '123' } })
        fireEvent.click(getByText('Entrar'))
        await expect(axiosMock.post).toHaveBeenCalled()
        expect(gameId).toBe('123')
        //insertar conexión con redux para testearlo bien
        //await expect(history.location.pathname).toEqual('/join')
  })
})

describe('when Home Page has game id in props', () => {

    it('redirects to joinPage', async () => {

    const {getByText, getByPlaceholderText, history } = renderWithRouterrender(<Home gameId={1} setUsername={()=>{}} setTeam={()=>{}}/>)
    await expect(history.location.pathname).toEqual('/join')
  })
})

// create any initial state needed
// const initialState = {}; 
// const mockStore = configureStore();
// let wrapper;
// let store;
// beforeEach(() => {
//     //creates the store with any initial state or middleware needed  
//   store = mockStore(initialState)
//   wrapper = shallow(<Login store={store}/>)
        
// // not suggested
// //wrapper = mount(<Provider store={store}<Login /></Provider>)
//  })
// describe('Home Page with redux', ()=> {

    

// })