import React, {useState} from 'react';
import './App.css';
import {Scoreboard} from "./components/Scoreboard/Scoreboard";
import {Button} from "./components/Button/Button";
import Settingsboard from "./components/Settingsboard/Settingsboard";

function App() {
    const [startValue, setStartValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [value, setValue] = useState(startValue);
    const [newStartValue, setNewStartValue] = useState(startValue);
    const [newMaxValue, setNewMaxValue] = useState(maxValue);

    const STEP = 1;
    const error = newStartValue < 0 || newMaxValue <= newStartValue;
    const message = error ? 'Incorrect value!' :
        (newMaxValue !== maxValue || newStartValue !== startValue) ? 'Enter values and press "set"' : '';

    const increaseCounter = () => {
        value < maxValue && setValue(value + STEP);
    };

    const resetCounter = () => {
        setValue(startValue);
    };

    const setCounter = () => {
        setStartValue(newStartValue);
        setMaxValue(newMaxValue);
        changeScoreboard();
    };

    const changeScoreboard = () => {
        value < newStartValue && setValue(newStartValue);
        value > newMaxValue && setValue(newMaxValue);
    };

    const disabledIncButton = value === maxValue;
    const disabledResetButton = value === startValue;

    return (
        <div className={'App'}>
            <div className={'counter_wrapper'}>
                <Scoreboard
                    value={value}
                    maxValue={maxValue}
                    error={error}
                    message={message}
                />

                <div className={'buttons_wrapper'}>
                    <Button
                        title={'inc'}
                        onClick={increaseCounter}
                        isDisabledButton={disabledIncButton}
                    />
                    <Button
                        title={'reset'}
                        onClick={resetCounter}
                        isDisabledButton={disabledResetButton}
                    />
                </div>
            </div>
            <div className={'counter_wrapper'}>
                <Settingsboard
                    error={error}
                    newStartValue={newStartValue}
                    newMaxValue={newMaxValue}
                    setNewStartValue={setNewStartValue}
                    setNewMaxValue={setNewMaxValue}
                />

                <div className={'buttons_wrapper'}>
                    <Button
                        title={'set'}
                        onClick={setCounter}
                        isDisabledButton={error}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
