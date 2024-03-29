import React, {createRef, useEffect, useState} from 'react';
import './App.css';
import Title from "./components/Title";
import {Content, QuizData} from "./interfaces";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
    const [quiz, setQuiz] = useState<QuizData | null>();
    const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([]);
    const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[] | undefined >([]);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    type ReduceType = {
        id?: {}
    }
    const refs = unansweredQuestionIds?.reduce<ReduceType | any>((acc, id) => {
        acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>()
        return acc
    }, {})
    const answerRef = createRef<HTMLDivElement | null>();
    console.log(refs);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const unansweredIds = quiz?.content?.map(({id}: Content) => id)
        setUnansweredQuestionIds(unansweredIds)
    }, [quiz])

    useEffect(() => {
        if (chosenAnswerItems.length > 0 && unansweredQuestionIds) {
            if (showAnswer && answerRef.current) {
                answerRef.current.scrollIntoView({ behavior: 'smooth' })
            }
            if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
                setShowAnswer(true);
            } else {
                const highestId = Math.min(...unansweredQuestionIds);
                refs[highestId].current.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [unansweredQuestionIds, chosenAnswerItems.length, showAnswer, answerRef.current, refs])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/quiz-item')
            const json = await response.json()
            setQuiz(json);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='app'>
            <Title title={quiz?.title} subtitle={quiz?.subtitle} />
            {refs && quiz?.content.map((content: Content) => (
                <QuestionsBlock
                    key={content?.id}
                    ref={refs[content?.id]}
                    quizItem={content}
                    chosenAnswerItems={chosenAnswerItems}
                    setChosenAnswerItems={setChosenAnswerItems}
                    unansweredQuestionIds={unansweredQuestionIds}
                    setUnansweredQuestionIds={setUnansweredQuestionIds}
                />
            ))}
            {showAnswer &&
                <AnswerBlock ref={answerRef} answerOptions={quiz?.answers} chosenAnswers={chosenAnswerItems} />
            }
        </div>
    );
}

export default App;
