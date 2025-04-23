import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="Header">
            <h1>TenQuest</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="quizzes"></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header