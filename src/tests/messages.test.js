import { fireEvent, render, screen } from '@testing-library/react';
import InputScreen from "../components/InputScreen";


describe("Input tests", () => {
    it("test input screen handle function", () => {

        const handleClick = jest.fn();
        const handleChangeText = jest.fn((e) => e.target.value);

        render(
            <InputScreen
                value={'test'}
                onSendMessage={handleClick}
                onChange={handleChangeText}
                name={"Me"}
            />
        );

        const input = screen.getByTestId("content-input")
        fireEvent.change(input, { target: { value: "test message" } })
        fireEvent.click(screen.getByText('Отправить'))
        expect(handleClick).toBeCalledTimes(1);
        expect(handleChangeText).toHaveReturnedWith("test message")


    });
});

