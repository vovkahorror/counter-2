import React, {useEffect, useState} from 'react';
import './App.css';
import {Scoreboard} from "./components/Scoreboard/Scoreboard";
import {Button} from "./components/Button/Button";
import SettingsScreen from "./components/Settingsboard/SettingsScreen";

function App() {
    const [startValue, setStartValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [value, setValue] = useState(startValue);
    const [newStartValue, setNewStartValue] = useState(startValue);
    const [newMaxValue, setNewMaxValue] = useState(maxValue);
    const [settingsMode, setSettingsMode] = useState(false);

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
    }, []);

    useEffect(() => {
        localStorage.setItem('counterStartValue', JSON.stringify(startValue));
        localStorage.setItem('counterMaxValue', JSON.stringify(maxValue));
        localStorage.setItem('counterNewStartValue', JSON.stringify(newStartValue));
        localStorage.setItem('counterNewMaxValue', JSON.stringify(newMaxValue));
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [startValue, maxValue, newStartValue, newMaxValue, value]);

    const STEP = 1;
    const error = newStartValue < 0 || newMaxValue <= newStartValue;

    const increaseCounter = () => {
        value < maxValue && setValue(value + STEP);
    };

    const resetCounter = () => {
        setValue(startValue);
    };

    const setCounter = () => {
        if (!settingsMode) {
            setSettingsMode(true);
        } else {
            setStartValue(newStartValue);
            setMaxValue(newMaxValue);
            changeScoreboard();
        }
    };

    const changeScoreboard = () => {
        value < newStartValue && setValue(newStartValue);
        value > newMaxValue && setValue(newMaxValue);
        setSettingsMode(false);
    };

    const disabledIncButton = value === maxValue;
    const disabledResetButton = value === startValue;

    return (
        <div className={'App'}>
            <div className={'counter_wrapper'}>
                {settingsMode
                    ? <SettingsScreen
                        error={error}
                        newStartValue={newStartValue}
                        newMaxValue={newMaxValue}
                        setNewStartValue={setNewStartValue}
                        setNewMaxValue={setNewMaxValue}
                    />
                    : <Scoreboard
                        value={value}
                        maxValue={maxValue}
                    />
                }

                <div className={'buttons_wrapper'}>
                    {!settingsMode &&
                        <>
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
                        </>
                    }
                    <Button
                        title={'set'}
                        onClick={setCounter}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
