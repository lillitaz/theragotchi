import Drag from '../components/dragobjects/Drag';
import ImageLoader from '../utilities/ImageLoader';
import TheragotchiConditionDisplay from '../components/theragotchiConditionDisplay/TheragotchiConditionDisplay';
import { feedTheragotchi, playWithTheragotchi, cleanTheragotchi, cuddleTheragotchi } from '../api/apiTheragotchi';
import TextBubble from '../components/QuestionBubble/Bubble';
import Input from '../components/input/Input';
import DailyMoodInput from '../components/input/DailyMoodInput';
import { useTheragotchiContext } from '../utilities/TheragotchiContext';

function TheragotchiPage() {

    const {
        theragotchi,
        theragotchiConditions,
        imagePath,
        questions,
        currentUserMood,
        setCurrentUserMood,
        handleTheragotchiAction,
        questionCategoryId,
        questionsIndex,
        user,
      } = useTheragotchiContext();
    
    if (theragotchi == null) {
        return (
            <div>
                <TextBubble question={questions[questionsIndex].description} />
                <Input questionCategory={questionCategoryId} />
            </div>
        );
    } else {

        return (
            <>
                {!currentUserMood ? (
                    <div>
                        <div id="conditions-container">
                            {Object.keys(theragotchiConditions).map((conditionName, index) => (
                                <TheragotchiConditionDisplay
                                    key={index}
                                    name={conditionName}
                                    value={theragotchiConditions[conditionName].toString()}
                                />
                            ))}
                        </div>
                        <ImageLoader imagePath={imagePath} />
                        <TextBubble question={questions[questionsIndex].description} />
                        <DailyMoodInput onMoodSelected={setCurrentUserMood} userId={user.userId}/>
                    </div>
                ) : (
                    <>
                        <div id="conditions-container">
                            {Object.keys(theragotchiConditions).map((conditionName, index) => (
                                <TheragotchiConditionDisplay
                                    key={index}
                                    name={conditionName}
                                    value={theragotchiConditions[conditionName].toString()}
                                />
                            ))}
                        </div>
                        <ImageLoader imagePath={imagePath} />
                        <TextBubble question={questions[questionsIndex].description} />
                        <Input questionCategory={questionCategoryId} />
                        <div id="drag-container">
                            <div id="drag-objects">
                                <div></div>
                                <Drag object="🍎" onClick={() => handleTheragotchiAction(feedTheragotchi)} initialPosition={{ x: 100, y: 100 }}  />
                                <Drag object="🎮" onClick={() => handleTheragotchiAction(playWithTheragotchi)} initialPosition={{ x: 100, y: 100 }}/>
                                <Drag object="🧽" onClick={() => handleTheragotchiAction(cleanTheragotchi)} initialPosition={{ x: 100, y: 100 }}/>
                                <Drag object="💕" onClick={() => handleTheragotchiAction(cuddleTheragotchi)} initialPosition={{ x: 100, y: 100 }}/>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default TheragotchiPage;
