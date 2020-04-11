import React, { useState, useEffect, createRef } from "react";
import "./letters.css";

interface RotatingLetterProps {
    word: string;
    active: boolean;
    wasActive: boolean;
}

export const RotatingLetters: React.FC<RotatingLetterProps> = ({ word, active, wasActive }) => {
    const [letters] = useState(word.split(''))
    const [firstRun] = useState(() => {
        let firstRun = true;
        return (val?: boolean) => {
            if (val === undefined) return firstRun;
            return firstRun = val;
        };
    });
    const [classNames] = useState(() => {
        const classes = Array(word.length).fill('').map(() => (active ? "in" : "out"))
        return (active?: boolean, idx?: number) => {
            if (idx === undefined) return classes;
            classes[idx] = active ? 'in' : 'out';
            return classes; 
        }
    });
    const [elRefs] = useState<React.RefObject<HTMLSpanElement>[]>(Array(letters.length).fill('').map((_, i) => createRef()));

    useEffect(() => {
        if (!firstRun() && (active || wasActive)) {
            const getTimeSpan = (i: number) => active 
                ? 340 + (i * 80)
                : (i * 80);
            letters.forEach((_, i) => {
                const timeSpan = getTimeSpan(i);
                const timeoutHandler = (curLetter: number) => () => {
                    elRefs[curLetter].current!.classList.toggle(classNames()[curLetter])
                    elRefs[curLetter].current!.classList.toggle(classNames(active, curLetter)[curLetter])
                }
                setTimeout(timeoutHandler(i), timeSpan);
            });
        }
        firstRun(false);
    }, [active, wasActive, letters, firstRun, elRefs, classNames]);

    return (
        <React.Fragment>
            {letters.map((letter, idx) => {
                const curClass = classNames()[idx];
                return (
                    <span ref={elRefs[idx]} key={`letter-${idx}`} className={`letter ${curClass}`}>
                        {letter}
                    </span>
                );
            })}
        </React.Fragment>
    );
};
