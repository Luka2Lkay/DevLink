import {render, screen} from '@testing-library/react';
import AddProject from './AddProject';
import { MemoryRouter } from 'react-router-dom';    

describe('AddProject', () => {

    beforeEach(() => {  
        render(
            <MemoryRouter>
                <AddProject />
            </MemoryRouter>
        );  
    })

    it('should render the Add New Project title', () => {
        expect(screen.getByText('Add New Project')).toBeInTheDocument();
    });

});