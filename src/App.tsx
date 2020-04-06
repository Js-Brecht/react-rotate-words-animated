import React, { useEffect, useState } from "react";
import { RotatingLetters } from "./LetterRotator";
import "./App.css"

export const App = () => {
    const [activeWord, setActiveWord] = useState<{
        current: number;
        last?: number;
    }>({
        current: 0,
        last: undefined
    });
    const words = [
        {
            word: "management",
            color: "#8e44ad",
        }, {
            word: "development",
            color: "#2980b9",
        }, {
            word: "design",
            color: "#c0392b"
        }
    ];
    useEffect(() => {
        setTimeout(() => {
            const last = activeWord.current;
            const current = last === words.length - 1
                ? 0
                : last + 1;
            setActiveWord({
                current,
                last
            });
        }, 4000);
    }, [activeWord, words]);

    return (
        <div className="hero-banner">
            <p>
                Do you need reliable, creative, experienced website&nbsp;
                    {words.map(({ word, color }, idx) => (
                        <span key={`word-${idx}`} className="word" style={{ color }}>
                            <RotatingLetters
                                active={idx === activeWord.current}
                                wasActive={idx === activeWord.last}
                                word={`${word}?`}
                            />
                        </span>
                    ))}
            </p>
        </div>
    );
};
