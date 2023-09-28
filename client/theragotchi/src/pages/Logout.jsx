import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        localStorage.clear();

        const messageTimeout = setTimeout(() => {
            setShowMessage(false);
            navigate('/');
            window.location.reload();
        }, 2000);
        return () => clearTimeout(messageTimeout);
    }, []);

    return (
        <div className='logout-div'>
            {showMessage && <div>
                <a>
                    You are logged out. Bye!
                </a>
            </div>}
        </div>
    );
}