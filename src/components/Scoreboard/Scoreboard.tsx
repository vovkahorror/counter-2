import React from 'react';
import style from './Scoreboard.module.css'

type ScoreboardPropsType = {
    value: number;
    maxValue: number;
    error: boolean;
    message: string;
}


export const Scoreboard = (props: ScoreboardPropsType) => {
    const valueClassname = (props.value < props.maxValue) ? style.defaultValue : `${style.defaultValue} ${style.limitValue}`;
    const messageClassname = props.error ? `${style.message} ${style.error}` : style.message;

    return (
        <div className={style.scoreboard}>
            {props.message ? <span className={messageClassname}>{props.message}</span> :
                <span className={valueClassname}>{props.value}</span>}
        </div>
    );
};