import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Invite from "./Invite";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import inviteReducer from "../../state/reducers/invite_slice"

describe("Invite", () => {
    let store;

    beforeEach(() => {

        store = configureStore({
            reducer: { invite: inviteReducer }
        })

        render(<MemoryRouter>
            <Provider store={store}>
                <Invite />
            </Provider>
        </MemoryRouter>)
    })

    it("should render invite text", () => {
        expect(screen.getByText(/Invite a contributor/i)).toBeInTheDocument()
    })
})