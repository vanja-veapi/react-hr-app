import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserRequest as fetchProfileRequest, setInitalLoading } from "../../../store/actions";

import noImage from "../../../assets/no-image.png";

const BasicInfoCard = (props) => {
	const userObject = useSelector((state) => state.dataReducer?.data?.data[0]?.attributes);
	// console.log(userObject);
	// console.log(userObject); //Vraca i rolu koju menja u APP.jsu
	// const imageId = useSelector((state) => state.dataReducer.data?.data[0]?.attributes?.profilePhoto?.data?.id);
	const [user, setUser] = useState(userObject);

	const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(setInitalLoading(true));
	// 	setTimeout(() => dispatch(fetchProfileRequest(props.id, "company_admin")), 1000); //OVO UBACITI U PENDING USER KAD SE KORISNIK APPROVUJE...
	// }, [dispatch, props.id]);

	useEffect(() => {
		setUser(userObject);
	}, [setUser, userObject]);

	return (
		<div className="col-md-6">
			<div className="card">
				<div className="card-header">Basic info</div>
				<div className="card-body">
					<div className="form-group mt-2">
						<label className="h6">Username</label>
						<input type="text" className="form-control" value={user !== undefined ? user.name : ""} onChange={(e) => setUser({ ...user, name: e.target.value })} />
					</div>
					<div className="form-group mt-2">
						<label className="h6">Profile photo</label>
						<input type="file" className="form-control mb-3" />
						{user?.profilePhoto?.data === null || user?.profilePhoto?.data === undefined ? <img src={noImage} alt="User has no img" width="200" className="img-fluid" /> : <img src={user?.profilePhoto.data.attributes.url} alt={user?.profilePhoto.data.attributes.name} className="img-fluid" width={200} />}
					</div>
				</div>
				<input type="button" value="Save" className="btn btn-primary mt-3 basic-info" />
			</div>
		</div>
	);
};

export default BasicInfoCard;
