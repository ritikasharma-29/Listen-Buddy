// function About() {
//     return (
//         <div>
//             <h1>About Listen Buddy</h1>
//             <p>
//                 Listen Buddy is a local Wi-Fi music sharing application.
//             </p>
//         </div>
//     );
// }

// export default About;


function About() {
    return (
        <div className="page">
            <div className="container">
                <div className="card">

                    <h1 className="page-title">
                        About Listen Buddy
                    </h1>

                    <p className="page-subtitle">
                        Listen together. Stay connected.
                    </p>

                    <div className="about-content">

                        <h2>What is Listen Buddy?</h2>

                        <p>
                            Listen Buddy is a local Wi-Fi music sharing
                            application that allows multiple users on the
                            same network to listen to music together.
                        </p>

                        <h2>How does it work?</h2>

                        <p>
                            One user can create a room and share the Room ID
                            with other users. Other users can join the room
                            using that ID and listen together.
                        </p>

                        <h2>Features</h2>

                        <ul>
                            <li>Create and join music rooms</li>
                            <li>See users currently in the room</li>
                            <li>Share and manage a playlist</li>
                            <li>Play and pause music together</li>
                            <li>Change songs for everyone in the room</li>
                            <li>Works over a local Wi-Fi network</li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default About;

