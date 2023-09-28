import "./navbar.css";


export default function Navbar() {
    const userName = localStorage.getItem("userName");
    console.log(userName);

    return (
        <nav className="navigation">
            <a href="/" className="theragotchi">
            {userName === 'admin' ? 'Therapy Animal Application - Admin' : 'Therapy Animal Application'}
            </a>
            <div
                className="navigation-menu" >
                <ul>
                    {userName == null ? 
                    <li>
                        <a href="/">Welcome</a>
                    </li> : <li>
                        <a href="/userProfilePage">Account Settings</a>
                    </li>}

                    {(userName != 'admin' && userName != null) &&
                    <li>
                        <a href="/theragotchiPage">Your Theragotchi</a>
                    </li>}

                    {(userName != 'admin' && userName != null) && 
                    <li>
                        <a href="/personalStatistics">Statistics</a>
                    </li>}

                    {userName === 'admin' && 
                    <li>
                        <a href="/userListPage">User List</a>
                    </li>}
                    {userName === 'admin' && 
                    <li>
                        <a href="/questionsPage">Question List</a>
                    </li>}
                    { userName != null && <li>
                        <a href="/logout">Logout</a>
                    </li>}
                </ul>
            </div>
        </nav>
    );
}