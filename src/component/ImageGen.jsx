import React, { useState } from "react";
import Api from './api';
const ImageGenerator = () => {
    const [inputText, setInputText] = useState("");
    const [generatedImage, setGeneratedImage] = useState(null);
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };
    const generateImage = () => {
        fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api}`
            },
            body: JSON.stringify({ inputs: inputText }),
        })
            .then((res) => res.blob())
            .then((blob) => {
                setGeneratedImage(URL.createObjectURL(blob));
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });
    };
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = "generated_image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="inputText" className="form-label">
                                        Enter Text:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputText"
                                        value={inputText}
                                        onChange={handleInputChange}
                                        style={{ width: "80%", margin: "0 auto" }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={generateImage}
                                    >
                                        Generate Image
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {generatedImage && (
                                <div className="image-box mt-3 text-center">
                                    <img
                                        src={generatedImage}
                                        alt="Generated"
                                        className="img-fluid rounded"
                                        style={{ maxWidth: "100%" }}
                                    />
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleDownload}
                                        >
                                            Download Image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style>
                {`
          .container {
            padding-top: 20px;
          }

          .card {
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .image-box {
            text-align: center;
          }

          .btn-primary {
            margin:10px;
            background-color: #87CEEB; /* Light Blue */
          }

          .btn-success {
            background-color: #28a745; /* Green */
          }
        `}
            </style>
        </div>
    );
};

export default ImageGenerator;
