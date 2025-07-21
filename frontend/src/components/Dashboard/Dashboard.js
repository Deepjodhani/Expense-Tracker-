import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layout';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Dashboard() {
    const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, downloadTransactions, incomes, expenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Transaction History', 14, 16);
        const all = [
            ...incomes.map(i => ({...i, type: 'Income'})),
            ...expenses.map(e => ({...e, type: 'Expense'}))
        ];
        all.sort((a, b) => new Date(b.date) - new Date(a.date));
        const tableColumn = ["Date", "Type", "Category", "Description", "Amount"];
        const tableRows = all.map(item => [
            item.date ? new Date(item.date).toLocaleDateString() : '',
            item.type,
            item.category,
            item.description,
            item.type === 'Income' ? `+${item.amount}` : `-${item.amount}`
        ]);
        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 22 });
        doc.save('transactions.pdf');
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                    </div>
                    <div className="download-con">
                        <button onClick={downloadTransactions}>Download Transactions (CSV)</button>
                        <button className="pdf-btn" onClick={downloadPDF}>Download Transactions (PDF)</button>
                    </div>
                    <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>
                                {dollar} {totalIncome()}
                            </p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>
                                {dollar} {totalExpenses()}
                            </p>
                        </div>
                    </div>
                    <div className="balance-con">
                        <h2>Total Balance</h2>
                        <p className={totalBalance() >= 0 ? 'positive' : 'negative'}>
                            {totalBalance() >= 0 ? '' : '-'}
                            {dollar} {Math.abs(totalBalance())}
                        </p>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    width: 100%;
    max-width: 900px;
    flex: 1;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* Make the dashboard content scrollable if it exceeds the viewport */
    max-height: calc(100vh - 40px); /* Adjust 40px if you have a header/footer */
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    @media (max-width: 1000px) {
        max-width: 100%;
        padding: 0 0.5rem;
        max-height: none;
    }

    .stats-con {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
    }

    .chart-con,
    .balance-con,
    .amount-con,
    .download-con {
        width: 100%;
        box-sizing: border-box;
    }

    .chart-con {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        min-width: 0;
        overflow-x: auto;
    }

    .download-con {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        button {
            padding: 1rem 2rem;
            border-radius: 20px;
            border: none;
            background: var(--color-accent);
            color: #fff;
            font-family: inherit;
            font-size: 1rem;
            cursor: pointer;
            transition: all .4s ease-in-out;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
            margin-bottom: 0.5rem;
            &:hover {
                background: var(--color-green);
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
            }
        }
        .pdf-btn {
            background: var(--primary-color);
            &:hover {
                background: var(--color-accent);
            }
        }
    }

    .amount-con {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        width: 100%;
        .income, .expense {
            flex: 1 1 0;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h2 {
                font-size: 1.2rem;
            }
            p {
                font-size: 2rem;
                font-weight: 700;
            }
        }
    }

    .balance-con {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        h2 {
            font-size: 1.3rem;
            color: var(--primary-color);
        }
        p {
            font-size: 2.5rem;
            font-weight: 700;
            &.positive {
                color: var(--color-green);
            }
            &.negative {
                color: var(--color-delete);
            }
        }
    }

    @media (max-width: 900px) {
        .amount-con {
            flex-direction: column;
            gap: 1rem;
        }
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 1.1rem;
        }
        .chart-con, .balance-con, .amount-con > div {
            padding: 0.5rem;
        }
        .download-con button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }
`;

export default Dashboard;