import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/user_icon.png";
import Register from "../Register/Register";
import "./Login.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoginUser } from "../../store/actions";
import Loader from "../Loader/Loader";

const Login = () => {
	// const statusCode = props.loginReducer?.status;
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	};
	const [state, setState] = useState({
		email: "marko-markovic+1@gmail.com",
		password: "qwe123",
	});
	const [isError, setIsError] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// useSelectors
	const statusCode = useSelector((state) => state.registerReducer.response?.status);
	const token = JSON.parse(localStorage.getItem("userData"))?.token;

	const onLogin = () => {
		if (state.email === "" || state.password === "" || state.password.length < 6 || !validateEmail(state.email)) {
			setIsError(true);
			return;
		} else {
			dispatch(login(state.email, state.password));
		}
	};

	useEffect(() => {
		if (statusCode === 200 && token !== undefined) {
			console.log("USE EFFECT");
			navigate("my-profile");
		}
	}, [statusCode, token, navigate]);
	return (
		<div className="wrapper d-flex flex-column justify-content-center align-items-center">
			<div className=" container container-form">
				<h1 className="text-center">uTeam - Login</h1>
				<div className="text-center">
					<img src={userIcon} alt="user_icon.png" />
				</div>
				<div className="login-form">
					<label htmlFor="email">Email</label>
					{state.email === "" && isError ? (
						<small className="text-danger">
							Email is required
							<br />
						</small>
					) : (
						""
					)}
					{state.email.length > 0 && !validateEmail(state.email) && isError ? <small className="text-danger">Email is not in valid format</small> : ""}
					<input type="text" value={state.email} name="email" placeholder="Email" onChange={(e) => setState({ ...state, email: e.target.value })} />
					<label htmlFor="password">Password</label>
					{state.password === "" && isError ? (
						<small className="text-danger">
							Password is required
							<br />
						</small>
					) : (
						""
					)}
					{state.password.length > 0 && state.password.length < 6 && isError ? (
						<small className="text-danger">
							Passwords must be at least 6 characters
							<br />
						</small>
					) : (
						""
					)}
					<input type="text" value={state.password} name="password" placeholder="Password" onChange={(e) => setState({ ...state, password: e.target.value })} />
				</div>
				<div className="login-bottom">
					<NavLink to="/join" element={<Register />}>
						Don't have an account?
					</NavLink>
					<button onClick={onLogin} className="btn">
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
