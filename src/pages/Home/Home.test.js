import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import ConnectedHome, { Home } from './Home'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
jest.mock('axios')


describe('Home Page', () => {

    let component
    beforeEach(() => { 
        component = render(<Home resetValues={()=>{}} />)
    })
    
    afterEach(cleanup)

    it ('Renders correctly', () => {
        expect(component).toMatchSnapshot()
    })

    it ('Renders one input and one button', () => {
        const placeholder = screen.getByPlaceholderText("Game PIN")
        const button = screen.getByText("Entrar")
        expect(placeholder).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })

    it ('Calls resetValues when there is no gameId in props', () => {
        let i = 0
        const resetValuesSpy = () =>  i++
        render(<Home resetValues={resetValuesSpy}/>)
        expect(i).toBe(1)
    })
// // //Invariant failed: You should not use <Redirect> outside a <Router>
// //     it ('Should not call resetValues when gameId, userid and nameid are in props', () => {
// //         let i = 0
// //         const resetValuesSpy = () =>  i++
// //         const comp = render(<Home resetValues={resetValuesSpy} gameId={1} userid={1} username="test"/>)
// //         expect(i).toBe(0)
// //     })


    it('displays invalid pin warning message when entering invalid Pin Game', async () => {

        axiosMock.post.mockResolvedValueOnce({
            data: {valid:false, result:{id:1}}
        })
        fireEvent.change(screen.getByPlaceholderText('Game PIN'), { target: { value: '123' } })
        fireEvent.click(screen.getByText('Entrar'))
        await waitFor(() => screen.getByText('¡PIN inválido!'))
        //await expect(axiosMock.post).toHaveBeenCalled()
        expect(axiosMock.post).toHaveBeenCalled()
        expect(screen.getByText('¡PIN inválido!')).toBeInTheDocument()
    })

    it ('Should not show invalid pin message when invalidPin state is false (by default)', () => {
        expect(screen.queryByTestId('invalid-pin')).toBeNull()
    })

    // it ('Displays "empty Input" warning message when submits with empty input', () => {
    //     const btn = screen.getByText("Entrar")
    //     fireEvent.click(btn)
    //     const msg = screen.queryByTestId('invalid-pin')
    //     expect(msg).toBeInTheDocument()
    // })

    it ('Should not show empty Input pin message when emptyInput state is false (by default)', () => {
        expect(screen.queryByTestId('g-empty-input')).toBeNull()
    })
})

// describe("sin beforeeach", ()=> {
//     it('updates props.idGame when entering valid Pin Game', async () => {
//         axiosMock.post.mockResolvedValueOnce({
//             data: {valid:true, result:{id:1}}
//         })

//         let gameId = null
//         const setGameSpy = (id) => {
//             gameId = '123'
//         }
//         render(<Home setGame={setGameSpy} resetValues={()=>{}} />)
//         fireEvent.change(screen.getByPlaceholderText('Game PIN'), { target: { value: '123' } })
//         fireEvent.click(screen.getByText('Entrar'))
//         await expect(axiosMock.post).toHaveBeenCalled()
//         expect(gameId).toBe('123')
//     })
// })


// const renderWithRouterrender = (
//     ui,
//     {
//       route = '/',
//       history = createMemoryHistory({ initialEntries: [route] }),
//     } = {}
// ) => {
//     return {
//         ...render(<Router history={history}>{ui}</Router>),
//         history,
//     }
// }

// describe('when Home Page has gameId, userid and nameid in props', () => {

//     it('redirects to joinPage', async () => {
//         const {getByText, getByPlaceholderText, history } = renderWithRouterrender(<Home gameId={1} userid={1} username="test" resetValues={()=>{}} />)
//         await expect(history.location.pathname).toEqual('/join')
//     })
// })
