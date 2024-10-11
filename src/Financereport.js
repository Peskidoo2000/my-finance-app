import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

const Financereport = ()=>{
  const [date, setDate] = useState("");
  const [selectoption, setSelectoption] =useState("");
  const [dateinput, setDateinput] = useState("");
  const [error, setError] = useState("");
  const [expensesBalance, setExpensesBalance] = useState("0");
  const [incomeBalance, setIncomeBalance] = useState("0");
  const [displayError, setDisplayError] = useState([])
  const [displayHealth, setDisplayHealth] = useState("");
  const [displayRecommendation, setDisplayRecommendation] = useState("");

  
  useEffect(()=>{
    handleReport()
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  }, [incomeBalance, expensesBalance])
   

  const getStoredData = (dataType) => {
      const storedData = JSON.parse(localStorage.getItem(`stored${dataType}Data`)) || [];
     
      return storedData;
  }


      const getWeekofYear =(date) =>{
        const firstDayofYear = new Date (date.getFullYear(), 0, 1);
        const PastDaysofYear = (date - firstDayofYear) / 86400000;
        return Math.ceil(((firstDayofYear.getDay() +1) + PastDaysofYear) /7)
        }
        
        const displayData = (viewType, selectedDate) => {
         
          const storedIncomeData = getStoredData("Income");
          console.log("income Data", storedIncomeData)

          const storedExpensesData = getStoredData("Expenses");
          console.log("Expenses Data", storedExpensesData)
          
          
          const filteredIncomeData = filterDataByViewType(storedIncomeData, viewType, selectedDate);
          setDisplayError(filteredIncomeData);
          console.log(" filtered income Data", filteredIncomeData)

          const filteredExpensesData = filterDataByViewType(storedExpensesData, viewType, selectedDate);
          setDisplayError(filteredExpensesData)
          console.log(" filtered Expenses Data", filteredExpensesData)
          
          const returnedIncomeAmount = filteredIncomeData.map(entry => entry.amount);
          const returnedExpensesAmount = filteredExpensesData.map(entry => entry.amount);


          const totalIncomeAmount = returnedIncomeAmount.reduce((total, amount) =>{
            return total + parseFloat(amount)
           }, 0)
           setIncomeBalance(totalIncomeAmount)

           const totalExpensesAmount = returnedExpensesAmount.reduce((total, amount) =>{
            return total + parseFloat(amount)
           }, 0)
           setExpensesBalance(totalExpensesAmount)
          
          return {
              filteredIncomeData,
              filteredExpensesData,
              returnedIncomeAmount,
              returnedExpensesAmount
          };
      };
      
      const filterDataByViewType = (storedData, viewType, selectedDate) => {
          return storedData.filter(entry => {
              const entryDate = new Date(entry.widget);
      
              if (viewType === "Weekly") {
                  const entryWeek = getWeekofYear(entryDate);
                  const selectedWeek = selectedDate.split('-W')[1];
                  return entryWeek === parseInt(selectedWeek);
      
              } else if (viewType === "Monthly") {
                  const entryMonth = entryDate.getMonth() + 1;
                  const entryYear = entryDate.getFullYear();
                  const [selectedYear, selectedMonth] = selectedDate.split("-");
                  return entryMonth === parseInt(selectedMonth) && entryYear === parseInt(selectedYear);
      
              } else if (viewType === "Yearly") {
                  const entryYear = entryDate.getFullYear();
                  return entryYear === parseInt(selectedDate);
              }
      
              return false;
          });
    };

  
    const handleSelect = (event)=>{
      const value = event.target.value;
      setError("")
      setSelectoption(value);
     if(value === "Weekly"){
        setDate("week")
      } else if(value === "Monthly" || value === "Yearly"){
        setDate("month")
      } else{
        setDate("")
      }
    }
  
const handleDateinput = (event) => {
      const value = event.target.value;
      
      setDateinput(value);
      setError("");

      
      const {filteredExpensesData, filteredIncomeData} = displayData(selectoption, value);

      console.log("Filtered Income Data", filteredIncomeData);
      console.log("Filtered Expenses Data", filteredExpensesData);
     
      const getChartbyViweType =(incomeData, expensesData) =>{
        let incomeAmount = [];
        let labelName = "Income Vs Expenses";
        let expensesAmount = [];
  
        incomeData.forEach(entry => {
          incomeAmount.push(entry.amount);
        });
      

      expensesData.forEach(entry => {
        expensesAmount.push(entry.amount);
      });

      return {
        labels: expensesAmount, 
        datasets: [{
          label: labelName,
          data: incomeAmount, 
        }]
      };
    }

      const chartData = getChartbyViweType(filteredIncomeData, filteredExpensesData);

      displayChart(chartData, selectoption);

  if (filteredIncomeData.length === 0 && filteredExpensesData.length === 0) {
    setError("No Income or Expenses data Entry for the selected widget");
    window.myChartInstance.destroy();
  }
     
      
  }
     
    const displayChart = (chartData, viewType) =>{
        
        
      const myChart = document.getElementById('myGraph');
         
       const options = {
        spanGaps: true,
          scales:{
            y:{
              beginAtZero: true,
              grid:{
             
              lineWidth: 1,
              }
            },
            x:{
              beginAtZero: true,
              grid:{
               
                lineWidth: 1,
                }
            },
            
          },
          elements: {
            line: {
              borderColor: 'rgba(255, 215, 0, 0.8)',  // Light Gray for the border
              borderWidth: 1,  // Make sure the border isn't too thick
            },
            point: {
              backgroundColor: " white",  // Neon Blue for data points
              radius: 2,  // Size of the points
            }
          },
          plugins: {
            tooltip: {
              enable: true,
              backgroundColor: 'rgba(48, 48, 48, 0.8)',  // Dark Gray tooltip background
              titleColor: 'rgba(255, 255, 255, 0.9)',  // White text in tooltip
            },
          }
        }
        if(!myChart){
          console.log("Canvas  is empty")
        }
  
        if (window.myChartInstance ) {
          window.myChartInstance.destroy();
        }
      
        
        // Create the new chart
        try{
        window.myChartInstance = new Chart(myChart, {
          type: 'line',  // Define the chart type
          data: chartData,  // Pass the dynamic data from getChartbyViewType
          options: options
        });
      } catch(error){
        console.error("Failed to create chart", error)
      }    
      }
      const handleReport = ()=>{
        if(Math.round(incomeBalance) > Math.round(expensesBalance)){
          setDisplayHealth("Good (Surplus)");
          setDisplayRecommendation("Continue managing finances effectively, consider saving or investing the surplus")
        } else if (Math.round(expensesBalance) > Math.round(incomeBalance)){
          setDisplayHealth("Needs Attention (Deficit)")
          setDisplayRecommendation("Review and reduce expenses, consider increasing income or seeking financial assistance")
        } else{
          setDisplayHealth("Neutral (Break-Even)")
          setDisplayRecommendation("Maintain current financial discipline, consider building an emergency fund or exploring investment opportunities")
        }
      }
  const printReport = () =>{
    window.print()
  }
  return(
      <div className="dashboard-parent">
      <form className="dashboard-form">
        <div> 
       <label htmlFor="options" className="form-heading">Add widget</label><br/>
       <select onChange={handleSelect} value={selectoption} className="select">
        <option value=""></option>
        <option value="Weekly"> Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
       </select>
       </div>
       {(selectoption !== "") && 
       <div><label htmlFor="date-pick" className="form-heading">Choose a date</label> <br/><input type={date} onChange= {handleDateinput} value={dateinput} className="rangeSelector"/> </div>} 
      </form>

      {(dateinput !== "") &&      

       <div className="first-row">
         <div className="balance-parent">
           <div className="income-expenses-total"><p > TOTAL INCOME </p> <p className="Total Expenses"> TOTAL EXPENSES </p> <br/> </div>
           <div className="income-expenses-total"> <p className="balance">{incomeBalance}.00</p> <p className="balance">{expensesBalance}.00</p> </div>
         </div>
         </div>}
         <canvas id="myGraph"></canvas>
        {displayError.length === 0 ?(
          <p style ={{color:"white"}}> {error}</p>
        ) :
      <div className="report-parent">
    <p className="report-health"> FINANCIAL HEALTH: {displayHealth}</p>
    <p className="report-recommendation"> RECOMMENDATION: {displayRecommendation}</p>
    <div className="add-income-parent save">
    <Button variant="contained" className="save-income print"onClick={printReport} > Download Report</Button>
    </div>
    </div>
        }
</div>
         )
}

export default Financereport;