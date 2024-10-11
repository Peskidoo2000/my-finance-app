import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

const Expenses = ()=>{
    const [date, setDate] = useState("");
    const [selectoption, setSelectoption] =useState("");
    const [expenses, setExpenses] = useState("");
    const [addExpenses, setAddExpenses] = useState(null);
    const [dateinput, setDateinput] = useState("");
    const [amount, setAmount]= useState("");
    const [expensesdate, setExpensesdate] = useState("");
    const [storeddata, setStoreddata] = useState([]);
    const [error, setError] = useState("");
    const [balance, setBalance] = useState("0")

  useEffect(()=>{
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  }, [])
    

  const expensesEntry = {
    widget:expensesdate,
    amount: amount,
    type: expenses,
   }

const getWeekofYear =(date) =>{
const firstDayofYear = new Date (date.getFullYear(), 0, 1);
const PastDaysofYear = (date - firstDayofYear) / 86400000;
return Math.ceil(((firstDayofYear.getDay() +1) + PastDaysofYear) /7)
}

const displaydata = (viewType, selectedDate) => {
const storedData = JSON.parse(localStorage.getItem("storedExpensesData")) || [];

const filteredData =  storedData.filter(entry => {
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
console.log("entry Year", entryYear)
console.log("selected Date", parseInt(selectedDate))
if(entryYear !== parseInt(selectedDate)){
return setError("No widget");
}
return entryYear === parseInt(selectedDate);
} 

return false
});

console.log("filter Data", filteredData)

const returnedAmount = filteredData.map(entry => {
  return entry.amount
})
console.log("returnedAmount", returnedAmount)

const totalAmount = returnedAmount.reduce((total, amount) =>{
 return total + parseFloat(amount)
}, 0)
console.log ( "Total Amount", totalAmount)
setBalance(totalAmount)

return filteredData;
};

function storeData(){
if(expensesdate.trim()!=="" && amount.trim()!==""){
const storedData = JSON.parse(localStorage.getItem("storedExpensesData")) || [];
storedData.push(expensesEntry);
localStorage.setItem("storedExpensesData", JSON.stringify(storedData)); 
setExpensesdate("");
setAmount("")
setExpenses("")
console.log(storedData);
}else{
  expensesdate.length === 0 ? alert("Enter a date") :  alert("Enter an Amount");

}

}  
    
    const handleexpensesDate =(event)=>{
      const value = event.target.value;
      setExpensesdate(value);
      }
      
      const handleAmount =(event) =>{
      const value= event.target.value;
      setAmount(value);
      if(value === ""){
      setAmount("Nill")
      }
      }
      
      const handleDateinput = (event) => {
      const value = event.target.value;
      
      setDateinput(value);
      setError("");
      setStoreddata([])
      const filteredData = displaydata(selectoption, value);
      console.log("Filtered Data", filteredData)
      
      
      const getChartbyViweType =(viewType) =>{
        let labels = [];
        let labelName = "";
        let data = [];
  
        filteredData.forEach(entry =>{
          const entryAmount = entry.amount;
          const allDate = entry.widget;
          const dayObj = new Date(allDate);
          const dayOfMonth = dayObj.getDate();
          const monthOfYear = dayObj.getMonth() + 1;
          console.log("viewType in loop:", viewType);
          console.log("days of the month", dayOfMonth)
          console.log("months of the year", monthOfYear)
          if(viewType === "Weekly"){
            labels.push(dayOfMonth);
            labelName ="Weekly Amount";           
          } else if (viewType === "Monthly"){
            labels.push(dayOfMonth)
            labelName = "Monthly Amount";
          } else if(viewType === "Yearly"){
           labels.push(monthOfYear);
           labelName = "Yearly Amount";
          }
          data.push(entryAmount)
         
        })
        console.log("labels", labels)
        console.log("labelName", labelName)
        console.log("data", data)
        return{
          labels : labels,
          
          datasets: [{
            label: labelName, 
            data: data,  
            
               }]
        }        
      }
     
      const displayChart = (viewType) =>{
        const chartData = getChartbyViweType(viewType);
        
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
              borderColor: 'red',  // Light Gray for the border
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
      displayChart(selectoption)
      if(filteredData.length === 0){
        setError("No expenses data Entry for the selected widget");
        window.myChartInstance.destroy();
        }else{
        setStoreddata(filteredData);   
        }
     
      };
      
    const showAddExpenses = (event) =>{
        const value= event.target;
        setAddExpenses( value);
    }

    const handleAddExpenses = (event) =>{
        const value = event.target.value;
        setExpenses(value);
        if(value ===""){
          setExpenses("Not Specified")
        }
    }
    
  const handleSelect = (event)=>{
    const value = event.target.value;
    setError("")
    setStoreddata([])
    setSelectoption(value);
    
    if(value === "Weekly"){
      setDate("week")
    } else if(value === "Monthly" || value === "Yearly"){
      setDate("month")
    } else{
      setDate("")
    }
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
           <div><label htmlFor="date-pick" className="form-heading">Choose a date</label> <br/><input type={date} onChange={handleDateinput} value={dateinput} className="rangeSelector"/> </div>} 
          </form>

          {(dateinput !== "") &&      

           <div className="first-row">
             <div className="balance-parent">
               <span > TOTAL expenses </span> <br/>
               <span className="balance">{balance}.00</span>
             </div>
             <table className="table">

                <thead className="th">
                  <tr className="tr">
                <td className="td">Date</td>
                <td className="td"> expenses Type</td>
                <td colSpan="2" className="td">Amount</td>
                </tr>
                </thead>
              
                <tbody className="th">
                  {storeddata.length === 0 ?(
                <tr className="tr-error">
                  <td colSpan="3" className="td-error"> {error}</td>
                </tr>
                  ): (
                    storeddata.map((entry, index)=>(
                    <tr key={index} className="tr">
                    <td className="td">{entry.widget}</td>
                    <td className="td"> {entry.type}</td>
                    <td className="td">{entry.amount}</td>
                    </tr>
                    
               )))
}            
                </tbody>
              
              
             </table>
      
           </div>
          }
           <canvas id="myGraph"></canvas>
          <div className="add-income-parent">
          <Button type="button" onClick={showAddExpenses} target={addExpenses} variant="outlined" className="add-income">Add expenses</Button>
          </div>
         
          {(addExpenses) && <div>
            <form className="income-form">
                <label htmlFor="options" className="form-heading income"> Type</label><br/>
                <select onChange={handleAddExpenses} value={expenses} className="select-income">
                    <option value=""></option>
                    <option value="salary"> Grocerries</option> 
                    <option value="wage"> Utilities</option>
                    <option value="offer">Offer</option>
                    <option value="miscellaneous">Miscellaneous </option>
                    <option value="others">Others</option>
                </select>
                {(expenses) && <div className="amount">
                    <label htmlFor="amount" className="form-heading income amount"> Amount</label> 
                    <br/> <div className="income-container"><input type="number" value={amount} onChange={handleAmount} className="fincome"/>
                    <input type="date" className="income-date" onChange={handleexpensesDate} value={expensesdate}/>
                    </div>

                    
                    <Button variant="contained" className="save-income" onClick={storeData}>Save Expenses</Button>
                     </div>} 
            </form>                  
          </div>
}

</div>
    )
}

export default Expenses;