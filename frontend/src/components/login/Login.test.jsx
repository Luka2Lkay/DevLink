import {render} from '@testing-library/react'
import Login from './Login'

describe('Login Component', () => {

    it('renders the login form', () => {
        render(<Login />)
     })

})