import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './chatBubble.css';

export default function TextBubble( {question} ) {
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (question) {
            if (isTyping) {
                const interval = setInterval(() => {
                    if (typedText.length < question.length) {
                        setTypedText(question.substring(0, typedText.length + 1));
                    } else {
                        setIsTyping(false);
                    }
                }, 100);

                return () => clearInterval(interval);
            }
        }
    }, [isTyping, question, typedText]);

 

    return (
        <div className="text-bubble">
            <div className="chat-bubble__text">{typedText}</div>
            {!isTyping}
        </div>
    );
}

TextBubble.propTypes = {
    question: PropTypes.string,
};
