import './Home.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './Expenses/ExpensesList';

const addNewExpense = async (idToken, userID, newData) => { 
    try {
      const response = await fetch(
        `https://expense-tracker-cc670-default-rtdb.firebaseio.com/Users/${userID}/expenses.json?auth=${idToken}`,
        {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();


    //   console.log(newExpense);

      if (!response.ok) {
        throw new Error(data.error);
      }
      return data.name;

    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async (idToken , userID) => {
    try {
      const response = await fetch(
        `https://expense-tracker-cc670-default-rtdb.firebaseio.com/Users/${userID}/expenses.json?auth=${idToken}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  };  


function Home() {
    const ctx = useContext(AppContext)
    const [expenseList, setExpenseList] = useState({})
    const params = useParams();
    const navTo = useNavigate();

    useEffect(() => {
        getUserData(ctx.idToken,ctx.userID).then((data)=>setExpenseList(data))
    },[ctx.idToken,ctx.userID])

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
        
        // setExpenseList((prevList) => [obj, ...prevList])
        addNewExpense(ctx.idToken,ctx.userID, obj).then(data=>setExpenseList((preData) =>

        {    const newexpense = {}
             newexpense[data] = obj;
            // preData[data] = obj 
            return ({...newexpense,...preData})
        }

        ))
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