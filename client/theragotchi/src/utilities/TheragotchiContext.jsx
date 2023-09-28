import { createContext, useContext, useState, useEffect } from 'react';

import { getTheragotchiById } from '../api/apiTheragotchi';
import { getCurrentUser, getUserMoods } from '../api/apiUser';
import { getQuestionsByCategory } from '../api/apiQuestions';
import PropTypes from 'prop-types';

const TheragotchiContext = createContext();

export const useTheragotchiContext = () => {
    return useContext(TheragotchiContext);
};

export function TheragotchiProvider({ children }) {
    const [theragotchi, setTheragotchi] = useState(null);
    const [theragotchiConditions, setTheragotchiConditions] = useState({});
    const [imagePath, setImagePath] = useState(null);
    const [userId, setUserId] = useState(null);
    const [theragotchiId, setTheragotchiId] = useState(null);
    const [questions, setQuestions] = useState([{}]);
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [questionsIndex, setQuestionsIndex] = useState(0);
    const [questionCategoryId, setQuestionCategoryId] = useState(1);
    const [currentUserMood, setCurrentUserMood] = useState(false);
    const [userMoodsArray, setUserMoodsArray] = useState(null);
    const [todaysMood, setTodaysMood] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const currentUserResponse = await getCurrentUser();
                if (currentUserResponse.ok) {
                    const fetchedUser = currentUserResponse.data;
                    setUserId(fetchedUser.userId);
                    setTheragotchiId(fetchedUser.theragotchiId);
                    localStorage.setItem('userId', fetchedUser.userId);
                    setUser(fetchedUser);
                    setLoading(false);
                }
            } catch (error) {
                console.error("User could not be loaded.", error);
            }
        }

        if (!user) {
            fetchUserData();
        }
    }, [user]);

    useEffect(() => {
        if (userMoodsArray) {
            const today = new Date().toISOString().split('T')[0];
            const hasMoodForToday = userMoodsArray.some(mood => mood.date === today);
            if (hasMoodForToday) {
                setCurrentUserMood(true);
            }
        }
    }, [setCurrentUserMood, user, userMoodsArray]);

    useEffect(() => {
        async function fetchUserMoods() {
                try {
                    const userMoods = await getUserMoods(userId);
                    if (userMoods.length > 0) {
                        setUserMoodsArray(userMoods);
                        setTodaysMood(userMoods[userMoods.length - 1].moodType)
                    }
                } catch (error) {
                    console.error("Moods could not be loaded.", error);
                }
            }
            if (userId) {
                fetchUserMoods();  
        }
    }, [todaysMood, userId]);

    useEffect(() => {

        async function determineQuestionsFetchType() {
            if (!user) {
                return;
            }
        
            let categoryToFetch = null;
        
            switch (true) {
                case !theragotchiId:
                    categoryToFetch = 1; // Intro questions
                    break;
                case todaysMood === null:
                    categoryToFetch = 6; // Mood question
                    break;
                case todaysMood === "SAD":
                    categoryToFetch = 2; // Category for mood sad
                    break;
                case todaysMood === "CONTENT":
                    categoryToFetch = 3; // Category for moods average
                    break;
                case todaysMood === "HAPPY":
                    categoryToFetch = 4; // Category for mood happy
                    break;
                default:
                    break;
            }
        
            if (categoryToFetch !== null) {
                setQuestionCategoryId(categoryToFetch);
                await fetchQuestions(getQuestionsByCategory);
            }
        }

        async function fetchQuestions(questionsFetch) {
            try {
                const response = await questionsFetch(questionCategoryId);
                if (response.ok) {
                    const questionArray = response.data;
                    setQuestions(questionArray);
                    setQuestionsIndex(0);
                }
            } catch (error) {
                console.error("Questions not fetched.", error);
            }
        }

        determineQuestionsFetchType();
        
    }, [questionCategoryId, theragotchiId, user, todaysMood]);

    useEffect(() => {
        async function fetchTheragotchi() {
            try {
                if (theragotchiId) {
                    const theragotchiResponse = await getTheragotchiById(theragotchiId);
                    const fetchedTheragotchi = theragotchiResponse.theragotchi;
                    if (theragotchiResponse.ok) {
                        setTheragotchi(fetchedTheragotchi);
                        setImagePath(fetchedTheragotchi.imagePath);
                        updateConditions(fetchedTheragotchi);
                    }
                }
            } catch (error) {
                console.error("Theragotchi could not be loaded.", error);
            }
        }

        fetchTheragotchi();
    }, [theragotchiId, theragotchiConditions]);

 
    useEffect(() => {
        if (theragotchi) {
            updateConditions(theragotchi);
        }
    }, [theragotchi]);

    async function updateConditions(updatedTheragotchi) {
        const conditionsObject = {
            name: updatedTheragotchi.theragotchiName,
            mood: updatedTheragotchi.mood,
            hunger: updatedTheragotchi.hunger,
            hygiene: updatedTheragotchi.hygiene,
            affection: updatedTheragotchi.affection,
            entertainment: updatedTheragotchi.entertainment,
        };
        setTheragotchiConditions(conditionsObject);
    }

    const handleTheragotchiAction = async (actionFunction) => {
        try {
            await actionFunction(theragotchiId);
        } catch (error) {
            console.error("Theragotchi not updated.", error);
        }
    };

    const contextValue = {
        theragotchi,
        theragotchiConditions,
        imagePath,
        userId,
        theragotchiId,
        questions,
        question,
        loading,
        user,
        questionsIndex,
        questionCategoryId,
        currentUserMood,
        userMoodsArray,
        setCurrentUserMood,
        setQuestionsIndex,
        setQuestionCategoryId,
        handleTheragotchiAction,
        setUser,
        setQuestion,
        setTheragotchi
    };

    return (
        <TheragotchiContext.Provider value={contextValue}>
            {children}
        </TheragotchiContext.Provider>
    );
}

TheragotchiProvider.propTypes = {
    children: PropTypes.any
  };