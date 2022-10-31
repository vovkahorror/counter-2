import React from 'react';
import style from './Scoreboard.module.css'

type ScoreboardPropsType = {
    value: number;
    maxValue: number;
}


export const Scoreboard = (props: ScoreboardPropsType) => {
    const valueClassname = (props.value < props.maxValue) ? style.defaultValue : `${style.defaultValue} ${style.limitValue}`;

    return (
        <div className={style.scoreboard}>
                <span className={valueClassname}>{props.value}</span>
        </div>
    );
};