import React from 'react'
import { render, fireEvent, screen, cleanup, wait  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Home } from 'pages/Home/Home'
import axiosMock from 'axios'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'





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