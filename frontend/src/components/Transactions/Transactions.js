import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layout';

function Transactions() {
    const { incomes, expenses } = useGlobalContext();

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="history-con">
                    <History />
                    <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                    <div className="salary-item">
                        <p>
                            ${Math.min(...incomes.map(item => item.amount))}
                        </p>
                        <p>
                            ${Math.max(...incomes.map(item => item.amount))}
                        </p>
                    </div>
                    <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                    <div className="salary-item">
                        <p>
                            ${Math.min(...expenses.map(item => item.amount))}
                        </p>
                        <p>
                            ${Math.max(...expenses.map(item => item.amount))}
                        </p>
                    </div>
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    .history-con {
        grid-column: 4 / -1;
        h2 {
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title {
            font-size: 1.2rem;
            span {
                font-size: 1.8rem;
            }
        }
        .salary-item {
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
    }
`;

export default Transactions; 