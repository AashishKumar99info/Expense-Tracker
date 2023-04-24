import './Home.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './Expenses/ExpensesList';

function Home() {
    const ctx = useContext(AppContext)
    const [expenseList, setExpenseList] = useState([])
    const params = useParams();
    const navTo = useNavigate();
    console.log(ctx.idToken)
    if (params.idToken !== ctx.idToken) {
        return <p> Page Not Found !</p>
    }

    const logoutHandler = () => {
        localStorage.setItem('idToken', '');
        ctx.setIsLoggedIn(false);
        ctx.setidToken(null);
        navTo('/');
    }
    const formSubmithandler = (obj) => {

        setExpenseList((prevList) => [obj, ...prevList])
    }

    return (
        <>
            <div>
                <div className="welcome">
                    <p>Welcome To Your Expense Tracker !!!</p>
                    <button className='button-logout' onClick={logoutHandler} >Logout</button>
                    <button className='login-card' onClick={() => navTo(`/profile/${ctx.idToken}`)}>  Your Profile Is Incomplete ! Complete Now </button>
                </div>
            </div>
            <ExpenseForm onSubmit={formSubmithandler}></ExpenseForm>
            <ExpenseList data={expenseList}></ExpenseList>
        </>
    )
}

export default Home;