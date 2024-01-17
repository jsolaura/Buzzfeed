import {Answer} from "../interfaces";
import {forwardRef, useEffect, useState} from "react";

const AnswerBlock = ({ answerOptions, chosenAnswers }: {
    answerOptions: Answer[] | undefined;
    chosenAnswers: string[];
}, ref: HTMLDivElement | any) => {

    const [result, setResult] = useState<Answer | null>()

    useEffect(() => {
        answerOptions?.forEach((answer: Answer) => {
            if (
                chosenAnswers?.includes(answer.combination[0]) &&
                chosenAnswers?.includes(answer.combination[1]) &&
                chosenAnswers?.includes(answer.combination[2])
            ) {
                setResult(answer)
            }
        })
    }, [chosenAnswers]);

    return (
        <div ref={ref} className='answer-block'>
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.alt} />
        </div>
    )
}
export default forwardRef(AnswerBlock);