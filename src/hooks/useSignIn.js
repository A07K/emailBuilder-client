import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginAtom, registerAtom } from "../state/userState";
import conf from "../config/index";

export const useSignIn = () => {
  const [login, setLogin] = useRecoilState(loginAtom);
  const [register, setRegister] = useRecoilState(registerAtom);
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(loginAtom);
  const setRegisterState = useSetRecoilState(registerAtom);
  const [loading, setLoading] = useState(false);

  const loginEmail = async (email, password) => {
    const data = { email, password };
    setLoading(true);

    try {
      const response = await fetch(`${conf.apiBaseUrl}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const result = await response.json();

      // Store the access token in sessionStorage
      sessionStorage.setItem("accessToken", result.accesstoken);

      // Update state with authentication status
      setLoginState({
        isAuthenticated: true,
        accessToken: result.accesstoken,
      });

      setLoading(false);

      // Navigate to the dashboard or the next page
      navigate("/builder");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return {
    loginEmail,
    loading,
  };
};
