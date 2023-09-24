import React, { useContext, useState, useEffect} from "react";
import axios from 'axios';
import { AppContext } from "../Context/App.context";
import { useNavigate, Link } from 'react-router-dom';
import { NavBar } from "../Component/LUMANav";

const MyLoansPage = () => {

    const { user, setUser } = useContext(AppContext);
    const [ myLoanCards, setMyLoansCards ] = useState([]);
    const navigate = useNavigate();

 

    useEffect(() => {
        axios
            .get('https://localhost:7189/my-loans/' + user.employeeId, {
                headers: { 'Authorization': 'Bearer ' + user.token }
            })
            .then((response) => {
                setMyLoansCards(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        }, [user.token]);
    
    return (
        <>
        <NavBar/>
        <div className="text-center">
            <h1>
                Loan Management Application  
            </h1>
            <div class="container text-center d-flex gap-3 mt-5">
                {myLoanCards.map(myLoanCard => (
                    <div class="card w-25 mx-auto fs-5" key={myLoanCard.LoanId}>
                        <img src = {imgObj[myLoanCard.loanType]} class="card-img-top" alt={myLoanCard.loanType} />
                        <div class="card-body">
                            <h3 class="card-title">{myLoanCard.loanType}</h3>
                            <p class="card-text"><strong>Duration:</strong> {myLoanCard.durationInYears} Years</p>
                            <Link to="apply" class="btn btn-lg btn-primary">Apply for Loan</Link>
                        </div>
                    </div>
                ))}
            </div>           
        </div>
        </>
    );
}

export default MyLoansPage;
