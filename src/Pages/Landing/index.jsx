import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return null;
}

export default Landing;
