import './Home.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';

function Home () {
    const ctx = useContext(AppContext)
    const params = useParams();
    if (params.idToken !== ctx.idToken) {
        return <p> Page Not Founnd !</p>
    }

    return (
        <div>
            <div className="welcome">
                Welcome To Your Expense Tracker !!!
            </div>
        </div>
    )
}

export default Home;