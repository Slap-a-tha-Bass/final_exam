import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Users } from '../../../types';
import RootLayout from '../components/RootLayout';
import { apiService } from '../utils/api-service';

const Profile = () => {
    const history = useHistory();
    const [user, setUser] = useState<Users['id']>();
    useEffect(() => {
        apiService('/api/users')
            .then(data => setUser(data));
    }, []);
    const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.clear();
        history.push('/login');
    }
    return (
        <RootLayout>
            <div className="card">
                <h1 className="display-2 text-info">{user}</h1>
                <div className="card-body">
                    <Link className="btn btn-info mx-3" to="/">home</Link>
                    <button onClick={handleSignOut} className="btn btn-info mx-3">sign out</button>
                </div>
            </div>
        </RootLayout>
    )
}

export default Profile;
