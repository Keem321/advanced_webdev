import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./signin-up_css/registration.css";
import api from '../../api.js';
import { FaUpload } from "react-icons/fa6";
import {FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Registration() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        birthday: "",
        zipcode: "",
        sexAtBirth: ""
    });

    const [validationErrors, setValidationErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        zipcode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send POST request to registration endpoint with formData
		await api.post(`/register`, formData)
        .then(response => {
            alert(response.data.message); // Log response data
            // Redirect to home page or handle success
            navigate('/login');
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors
            alert(error.code + ' : ' + error.message);
        });
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";
        switch (fieldName) {
            case "email":
                if (!value.includes("@")) {
                    errorMessage = "Email must be valid";
                }
                break;
            case "password":
                if (value.length < 8) {
                    errorMessage = "Password must be at least 8 characters";
                }
                break;
            case "zipcode":
                if (value.length !== 5) {
                    errorMessage = "Zip Code must be 5 characters";
                }
                break;
            default:
                break;
        }
        return errorMessage;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);
        setValidationErrors(prevState => ({
            ...prevState,
            [name]: errorMessage
        }));
    };

    return (
        <>
            <div className="registration">
                <div>
                <div className="setup-profile">
                    <h3 className="h3-text">Set Up Your Profile</h3>
                </div>
                <div className="upload-icon">
                    <FaUpload className="icon-upload"/>
                    <p className="upload-text">Upload your image</p>
                </div>

                <img className="profile-image"></img>
                </div>
               
                <form className="registration-form">
                    <div>
                        <label htmlFor="fullName">Full Name: </label>
                        <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your first name and last name" />
                    </div>
                    <div className="error-message">{validationErrors.fullName}</div>

                    <div>
                        <label htmlFor="email">Email Address: </label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required placeholder="example@gmail.com" />
                    </div>
                    <div className="error-message">{validationErrors.email}</div>

                    <div  className="password-input">
                        <label htmlFor="password">Password:  </label>
                        <div className="password-with-toggle">
                        <input  
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password" value={formData.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        required placeholder="Enter Password" />

                        <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="toggle-password"
                        >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                        </div>
                        
                    </div>
                    <div className="error-message">{validationErrors.password}</div>

                    <div>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" name="birthday" id="birthday" value={formData.birthday} onChange={handleChange} required />
                    </div>

                    <div>
                        <label htmlFor="zipcode">Zip Code</label>
                        <input type="number" name="zipcode" id="zipcode" value={formData.zipcode} onChange={handleChange} onBlur={handleBlur} required placeholder="12345" />
                    </div>
                    <div className="error-message">{validationErrors.zipcode}</div>

                    {/* Dropdown for selecting sex at birth */}
                    <div className="select-sex">
                        <label htmlFor="sexAtBirth">Sex at Birth</label>
                        <select name="sexAtBirth" id="sexAtBirth" value={formData.sexAtBirth} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </form>

                <div className="button-container">
                <button type="button" id="continue-button" className="big-button" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
           
        </>
    )
}

export default Registration;