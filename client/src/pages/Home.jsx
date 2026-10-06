
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">
            <div className="home-content">

                <div className="card">
                    <div style={{ fontSize: "50px", marginBottom: "10px" }}>
                        🎵
                    </div>

                    <h1 className="home-title">
                        Listen Buddy
                    </h1>

                    <p className="home-subtitle">
                        Listen together. Stay connected.
                    </p>

                    <div className="home-buttons">
                        <Link to="/create-room">
                            <button className="btn btn-primary">
                                Create Room
                            </button>
                        </Link>

                        <Link to="/join-room">
                            <button className="btn btn-secondary">
                                Join Room
                            </button>
                        </Link>

                        <Link to="/about">
                            <button className="btn btn-secondary">
                                About
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
