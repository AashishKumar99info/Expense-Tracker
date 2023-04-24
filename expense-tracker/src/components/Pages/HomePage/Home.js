import './Home.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';

function Home() {
    const ctx = useContext(AppContext)
    const params = useParams();
    const navTo = useNavigate();
    console.log(ctx.idToken)
    if (params.idToken !== ctx.idToken) {
        return <p> Page Not Found !</p>
    }

    return (
        <div>
            <div className="welcome">
                Welcome To Your Expense Tracker !!!
                <button className='login-card' onClick={() => navTo(`/profile/${ctx.idToken}`)}>  Your Profile Is Incomplete ! Complete Now </button>
            </div>
        </div>
    )
}

export default Home;