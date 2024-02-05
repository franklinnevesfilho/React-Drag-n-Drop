import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>Drag and Drop Activity</h1>
                </header>
                <div className="app-body">
                    <Link to={'/dnd'} className="btn">
                        Implemented Library
                    </Link>
                    <Link to={'/native'} className="btn">
                        Native Css and Js
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Home;