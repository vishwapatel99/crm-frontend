import React, {useEffect, useState} from 'react'
import { Spinner, Alert, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { userRegistrationVerification } from '../../api/userApi'
import '../../page/entry/Entry.css'

const initialResponse = {
  status: "",
  message: "",
};

const UserVerification = () => {
  const { _id, email } = useParams();
  const navigate = useNavigate();
  const dt = {_id, email};

  const [response, setResponse] = useState(initialResponse);
  const apiCalled = React.useRef(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        console.log("Sending verification request with:", dt);
        const result = await userRegistrationVerification(dt);
        console.log("API Response:", result);
        setResponse(result);
      } catch (error) {
        console.error("Error during verification:", error);
        setResponse({ status: "error", message: "Resource not found or verification failed. Please check your details." });
      }
    };
    if (!apiCalled.current) {
      apiCalled.current = true;
      apiCall();
    }
  }, [dt]);

  const renderMessage = () => {
    if (response.status === "success") {
        return (
            <div>
                <Alert variant="success">{response.message || "User successfully verified!"}</Alert>
                <Button variant="primary" onClick={() => navigate("/")}>
                    Go to Login
                </Button>
            </div>
        );
    } else if (response.status === "error") {
        return <Alert variant="danger">{response.message || "Verification failed. Please try again."}</Alert>;
    } else {
        return <Spinner variant="info" animation="border" />;
    }
  };
  
  return (
    <div className="registration-page bg-dark">
      <div className="mt-5">
        <div className="form-box p-4 shadow-sm rounded bg-white">
          {renderMessage()}
        </div>
      </div>
    </div>
    
  )
}

export default UserVerification
