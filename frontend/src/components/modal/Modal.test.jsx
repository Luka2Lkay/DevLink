import {render, screen} from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {

    it("should render the modal with given title and content", () => {
        render(
            <Modal isOpen={true} onClose={() => {}}>
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.getByText("Modal Content")).toBeInTheDocument();
    });

    it("should not render the modal when isOpen is false", () => {
        render(
            <Modal title="Test Modal" isOpen={false} onClose={() => {}}>
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
        expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
    });
});