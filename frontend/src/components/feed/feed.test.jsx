import { render, screen } from '@testing-library/react';
import Feed from './feed';

describe('Feed', () => {

    beforeEach(() => {
        render(<Feed />);
    });

    it('renders the Dashboard title', () => {
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders the Project component', () => {
        expect(screen.getByText('Project Title')).toBeInTheDocument();
    })
});