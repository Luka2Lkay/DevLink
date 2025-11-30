import {render, screen} from '@testing-library/react';
import SingleCommit from './SingleCommit.jsx'; 

describe('SingleCommit Component', () => {
    const mockProps = {
        author: 'John Doe',
        date: '2024-06-15',
        message: 'Initial commit',
        sha: 'abc123def456',
        url: 'url-to-commit'
    };

    it("should render commit details correctly", () => {
        render(<SingleCommit {...mockProps} />);    
        expect(screen.getByText(/Author: John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Date: 2024-06-15/i)).toBeInTheDocument();
        expect(screen.getByText(/Message: Initial commit/i)).toBeInTheDocument();
        expect(screen.getByText(/Sha: abc123def456/i)).toBeInTheDocument();
        expect(screen.getByText(/Url: url-to-commit/i)).toBeInTheDocument();
    });

});