import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [file, setFile] = useState(null);
    const [githubUrl, setGithubUrl] = useState("");

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const analyzeFile = async () => {
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        if (githubUrl) {
            formData.append("github_url", githubUrl);
        }

        try {
            const response = await axios.post("http://localhost:8000/analyze/", formData);
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error analyzing file:", error);
            alert("Failed to analyze file or GitHub repository");
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Solidity Smart Annotator</h1>
            </header>
            <main>
                <div className="input-section">
                    <label>Upload Solidity File:</label>
                    <input type="file" accept=".zip,.sol" onChange={handleFileUpload} />
                    <button onClick={analyzeFile}>Upload & Analyze</button>
                </div>
                <div className="input-section">
                    <label>Enter GitHub Repo URL:</label>
                    <input type="text" placeholder="GitHub repo URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                    <button onClick={analyzeFile}>Analyze</button>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Solidity Smart Annotator. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
