import {Question} from "../interfaces";

const QuestionBlock = ({ question, quizItemId, chosenAnswerItems, setChosenAnswerItems, unansweredQuestionIds, setUnansweredQuestionIds } : {
    quizItemId: number,
    question: Question,
    chosenAnswerItems: string[];
    setChosenAnswerItems: Function;
    unansweredQuestionIds: number[] | undefined;
    setUnansweredQuestionIds: Function;
}) => {
    const handleClick = () => {
        setChosenAnswerItems((prev: string[]) => [...prev, question?.text]);
        setUnansweredQuestionIds(unansweredQuestionIds?.filter((id: number) => id !== quizItemId));
    }
    const validPick = !chosenAnswerItems?.includes(question?.text)
        && !unansweredQuestionIds?.includes(quizItemId);
    return (
        <button
            className='question-block'
            onClick={handleClick}
            disabled={validPick}
        >
            <img src={question?.image} alt={question?.alt} />
            <h3>{question?.text}</h3>
            <p>
                <a href={question?.image}>{question?.credit}</a>
                <a href='https://www.unsplash.com'>Unsplash</a>
            </p>
        </button>
    )
}
export default QuestionBlock;