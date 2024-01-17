import {Content, Question} from "../interfaces";
import QuestionBlock from "./QuestionBlock";
import React, {forwardRef, LegacyRef} from "react";

const QuestionsBlock = ({
    quizItem,
    chosenAnswerItems,
    setChosenAnswerItems,
    unansweredQuestionIds,
    setUnansweredQuestionIds,
} : {
    quizItem: Content,
    chosenAnswerItems: string[],
    setChosenAnswerItems: Function,
    unansweredQuestionIds: number[] | undefined
    setUnansweredQuestionIds: Function
}, ref: React.LegacyRef<HTMLHeadingElement> | undefined ) => {
    return (
        <>
            <h2 ref={ref} className="title-block" >{quizItem.text}</h2>
            <div className='questions-container'>
                {quizItem?.questions.map((question: Question, _index: number) => (
                    <QuestionBlock
                        key={_index}
                        question={question}
                        quizItemId={quizItem?.id}
                        chosenAnswerItems={chosenAnswerItems}
                        setChosenAnswerItems={setChosenAnswerItems}
                        unansweredQuestionIds={unansweredQuestionIds}
                        setUnansweredQuestionIds={setUnansweredQuestionIds}
                    />
                ))}
            </div>
        </>
    )
}
export default forwardRef(QuestionsBlock);