import { render, screen, waitFor } from '@testing-library/react';
import Feed from './Feed.jsx';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../../state/reducers/project_slice.js';

describe('Feed', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: { project: projectReducer },
            preloadedState: {
                project: {
                    projects: [
                        { id: '1', title: 'Test Project', owner: 'Alice', description: 'desc', collaborators: [] },
                    ],
                    currentProject: null,
                    error: null,
                },
            },
        });

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Feed />
                </Provider>
            </MemoryRouter>
        );
    });

    it('should render the Logout link', () => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should render the welcome message', () => {
        expect(screen.getByTestId("add-project-button")).toBeInTheDocument();
    });

    it('should render the Project component', async () => {
        await waitFor(() => {
            expect(screen.getByText(/Test project/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    })
});