import { fireEvent, render, screen } from '@testing-library/react';
import Registration from "../components/Registration";
import { Provider } from "react-redux";
import { store } from '../store/store';
import { AuthProvider } from "../hooks/AuthProvider";
import { BrowserRouter } from "react-router-dom";

describe("Input tests", () => {
    it("test input screen handle function", () => {

        const view = render(
            <Provider store={store}>
                <AuthProvider>
                    <BrowserRouter>
                        <Registration />
                    </BrowserRouter>
                </AuthProvider>
            </Provider>

        );

        expect(view).toMatchSnapshot();


    });
});
