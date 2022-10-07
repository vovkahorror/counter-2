import React from 'react';
import style from './Scoreboard.module.css'

type ScoreboardPropsType = {
    clicks: number;
}


export const Scoreboard = (props: ScoreboardPropsType) => {
    const scoreboardClassname = (props.clicks < 5) ? style.default : `${style.default} ${style.limit}`;

    return (
        <div className={scoreboardClassname}>
            {props.clicks}
        </div>
    );
};