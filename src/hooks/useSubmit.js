import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";



export function useSubmit(api, path, options = {}) {
  const { shouldSaveToken = false, successMessage = "Success! Redirecting..." } =
    options;
  const [errorMessage, seterrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const { saveUserToken } = useContext(AuthContext);

  async function submitForm(data) {
    seterrorMessage("");
    setSuccessMsg("");
    try {
      const res = await axios.request({
        method: "post",
        url: api,
        data: data,
      });

      if (res.error) {
        throw new Error(res.error);
      }

      if (shouldSaveToken) {
        const token = res?.data?.data?.token ?? res?.data?.token;
        if (!token) {
          throw new Error("Authentication token was not returned.");
        }
        saveUserToken(token);
      }

      setSuccessMsg(successMessage);
      timeoutRef.current = setTimeout(() => {
        navigate(path);
      }, 2000);
    } catch (error) {
      const apiError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      seterrorMessage(apiError);
    }
  }


  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    errorMessage,
    successMsg,
    submitForm,
  };
}
