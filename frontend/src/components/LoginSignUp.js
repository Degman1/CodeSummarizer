import React, { useRef, useState, useEffect } from 'react';
import {Alert} from "react-bootstrap"
import * as Components from './Components';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"

export default function LoginSignUp() {
    const [signIn, toggle] = React.useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {signup, login, currentUser } = useAuth()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(''); // State to store success message
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    // Redirect after login
    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    // SIGN UP
    async function handleSubmit(e) {
        e.preventDefault();
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
    
        try {
            setError("");
            setSuccess("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            setSuccess("Account created successfully! Please check your email to verify your account."); // Set success message
            // ... handle successful account creation (e.g., redirect to dashboard)
            navigate("/dashboard")
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Email already in use. Please login or use a different email.");
            } else {
                setError("Failed to create an account: " + (error.message || "An unknown error occurred"));
            }
            console.error("Signup error:", error);
        }
        setLoading(false);
    }

    // SIGN IN
    async function handleLoginSubmit(e) {
        e.preventDefault();

        // Check if email and password inputs are not empty
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        // Simple regex for email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            console.log('Attempting to log in with:', email, password); // Check the values being sent
            setError('');
            setSuccess('');
            setLoading(true);
            await login(email, password);
            setSuccess('Logged in successfully! Redirecting to user page...');
            console.log('Logged in successfully'); // Check if this logs
            navigate("/dashboard")
        } catch (error) {
            setError('Failed to log in: ' + (error.message || 'An unknown error occurred'));
            console.error('Login error:', error);
        }
        setLoading(false);

    }

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSubmit}>
                    <Components.Title>Create Account</Components.Title>
                    {/* {currentUser.email} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    {/* <Components.Input type='text' placeholder='Name' /> */}
                    <Components.Input type='email' placeholder='Email' ref={emailRef}/>
                    <Components.Input type='password' placeholder='Password' ref={passwordRef}/>
                    <Components.Input type='password' placeholder='Confirm Password' ref={passwordConfirmRef} />
                    <Components.Button disabled={loading}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={handleLoginSubmit}>
                    <Components.Title>Sign in</Components.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Components.Input type='email' placeholder='Email' ref={emailRef} />
                    <Components.Input type='password' placeholder='Password' ref={passwordRef} />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button type="submit" disabled={loading}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                    <Components.Title>Hello!</Components.Title>
                    <Components.Paragraph>
                        Enter Your personal details to get started
                    </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton> 
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
    );
}