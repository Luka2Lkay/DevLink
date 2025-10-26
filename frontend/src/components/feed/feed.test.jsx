import { render, screen } from '@testing-library/react';
import Feed from './feed';
import { MemoryRouter } from 'react-router-dom';

describe('Feed', () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Feed />
            </MemoryRouter>
        );
    });

    it('renders the Dashboard title', () => {
        expect(screen.getByText('Welcome to your project dashboard! Here you can find all your projects and collaborate with your team.')).toBeInTheDocument();
    });

    it('renders the Project component', () => {
        expect(screen.getByText('Project Title')).toBeInTheDocument();
    })
});