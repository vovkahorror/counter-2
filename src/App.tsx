import React, {useEffect, useState} from 'react';
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
    const [informationMode, setInformationMode] = useState(false);

    useEffect(() => {
        const startValueAsString = localStorage.getItem('counterStartValue');
        startValueAsString && setStartValue(JSON.parse(startValueAsString));

        const maxValueAsString = localStorage.getItem('counterMaxValue');
        maxValueAsString && setMaxValue(JSON.parse(maxValueAsString));

        const newStartValueAsString = localStorage.getItem('counterNewStartValue');
        newStartValueAsString && setNewStartValue(JSON.parse(newStartValueAsString));

        const newMaxValueAsString = localStorage.getItem('counterNewMaxValue');
        newMaxValueAsString && setNewMaxValue(JSON.parse(newMaxValueAsString));

        const currentValueAsString = localStorage.getItem('counterValue');
        currentValueAsString && setValue(JSON.parse(currentValueAsString));
    }, [])

    useEffect(() => {
        localStorage.setItem('counterStartValue', JSON.stringify(startValue));
        localStorage.setItem('counterMaxValue', JSON.stringify(maxValue));
        localStorage.setItem('counterNewStartValue', JSON.stringify(newStartValue));
        localStorage.setItem('counterNewMaxValue', JSON.stringify(newMaxValue));
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [startValue, maxValue, newStartValue, newMaxValue, value]);

    const STEP = 1;
    const error = newStartValue < 0 || newMaxValue <= newStartValue;
    const message = error ? 'Incorrect value!' : 'Enter values and press "set"';

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
        setInformationMode(false);
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
                    informationMode={informationMode}
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
                    setInformationMode={setInformationMode}
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
