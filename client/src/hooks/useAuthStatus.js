import {
    useState,
    useEffect
} from 'react';

const useAuthStatus = () => {
    let [status, setStatus] = useState(null);
    useEffect(() => {
        let token = localStorage.getItem('Ranked RPS Token');
        if (!token) {
            setStatus(false);
        } else {
            fetch('/auth/status', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setStatus(data['status']);
                })
                .catch((err) => {
                    console.error(err);
                    setStatus(false);
                });
        }
    }, [status]);
    return status;
};

export default useAuthStatus;