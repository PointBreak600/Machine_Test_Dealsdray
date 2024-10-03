import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/auth";

const Protected = (props) => {
  const navigate = useNavigate();
  const { children } = props;
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      await verifyToken();
      setLoading(false);
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loading) return <div>Loading...</div>;
  return children; 
};

export default Protected;
