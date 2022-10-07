import React, {useState} from 'react';
import './App.css';
import {Scoreboard} from "./components/Scoreboard/Scoreboard";
import {Button} from "./components/Button/Button";

function App() {
    const START_VALUE = 0;
    const MAX_VALUE = 5;
    const STEP = 1;

    const [value, setValue] = useState<number>(START_VALUE);

    const increaseCounter = () => {
        value < MAX_VALUE && setValue(value + STEP);
    };

    const resetCounter = () => {
        setValue(START_VALUE);
    };

    const disabledIncButton = value >= MAX_VALUE;
    const disabledResetButton = value === START_VALUE;

    return (
        <div className={'App'}>
            <div className={'counter_wrapper'}>
                <Scoreboard clicks={value}/>

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
        </div>
    );
}

export default App;
