import {render, screen} from '@testing-library/react';
import Collaborator from './Collaborator';

describe('Collaborator', () => {
    it('should render the initials correctly', () => {
        render(<Collaborator initials="AB" />);
        expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('should correct styles applied', () => {
        render(<Collaborator initials="CD" />);
        expect(screen.getByText('CD')).toHaveClass('inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-sm font-medium text-blue-800 ring-2 ring-white');
    });
});