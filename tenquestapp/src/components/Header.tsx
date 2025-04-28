import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="Header">
            <h1>TenQuest</h1>
            <nav>
                <ul>
                    <button>
                    <li><Link to="/">Home</Link></li>
                    </button>
                    <button>
                    <li><Link to="quizzes">Create Quiz</Link></li>
                    </button>
                </ul>
            </nav>
        </header>
    )
}

export default Header