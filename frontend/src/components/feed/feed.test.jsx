import { render, screen, waitFor } from '@testing-library/react';
import Feed from './feed';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../../state/reducers/project_slice.js';

vitest.mock('../../state/thunk/project_thunk.js', () => ({
    fetchProjectsThunk: vitest.fn(() => () => Promise.resolve()),
}));

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

    it('renders the Logout link', () => {
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('renders the welcome message', () => {
        expect(screen.getByText(/Welcome to your project dashboard!/i)).toBeInTheDocument();
    });

    it('renders the Project component', async () => {
        await waitFor(() => {
            expect(screen.getByText(/Test project/i)).toBeInTheDocument();
        }, { timeout: 3000 });
    })
});