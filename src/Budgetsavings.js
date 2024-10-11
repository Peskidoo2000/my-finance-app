import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';

const Budgetsavings = ()=>{
  const [arrow, setArrows] = useState('↓')
  const [date, setDate] = useState("");
  const [selectoption, setSelectoption] =useState("");
  const [addbudget, setAddbudget] = useState(null);
  const [dateinput, setDateinput] = useState("");
  const [amount, setAmount]= useState("");
  const [budgetdate, setbudgetdate] = useState("");
  const [storeddata, setStoreddata] = useState([]);
  const [error, setError] = useState("");
  
const handleResize = () =>{
  if(window.innerWidth >= 886){
    setArrows('→')
  }else{
    setArrows ('↓')
  }
}
  useEffect(()=>{
    handleResize()

    window.addEventListener('resize', handleResize);

    return() =>{
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  
  const budgetEntry = {
    widget:budgetdate,
    amount: amount,
   }

const getWeekofYear =(date) =>{
const firstDayofYear = new Date (date.getFullYear(), 0, 1);
const PastDaysofYear = (date - firstDayofYear) / 86400000;
return Math.ceil(((firstDayofYear.getDay() +1) + PastDaysofYear) /7)
}

const displaydata = (viewType, selectedDate) => {
  const storedData = JSON.parse(localStorage.getItem("storedbudgetData")) || [];
  
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
  
  
  return filteredData;
  };
  
function storeData(){
  if(budgetdate.trim()!=="" && amount.trim()!==""){
  const storedData = JSON.parse(localStorage.getItem("storedbudgetData")) || [];
  storedData.push(budgetEntry);
  localStorage.setItem("storedbudgetData", JSON.stringify(storedData)); 
  setbudgetdate("");
  setAmount("")
  console.log(storedData);
  }else{
    budgetdate.length === 0 ? alert("Enter a date") :  alert("Enter an Amount");
  
  }
  
}  

const showAddbudget = (event) =>{
  const value= event.target;
  setAddbudget( value);
}

const handlebudgetDate =(event)=>{
  const value = event.target.value;
  setbudgetdate(value);
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
   setStoreddata(filteredData)
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
        <div className="budget-saving-parent"> 
            <section className="py-3 text-center container section">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="budget-heading">HOW BUDGETING WORKS</h1>
      </div>
    </div>
  </section>

  <div className="album py-3 bg-body-tertiary">
    <div className="container-fluid">

      <div className="parent-cols"> 
        <div className="col">
          <div className="card shadow-sm parent-steps">
             Select a Period of time
            </div>
          </div>

          
          <div className="arrow">{arrow}</div>

          <div className="col ">
          <div className="card shadow-sm parent-steps after">
            Plan on a certain amount of your budget 
           </div>
          </div>

          <div className="arrow">{arrow}</div>

          <div className="col">
          <div className="card shadow-sm parent-steps after">
             Split in section amount for certain expenses
            </div>
          </div>
          <div className="arrow">{arrow}</div>

          <div className="col">
          <div className="card shadow-sm parent-steps after">
            Discipline is key 
            </div>
          </div>
        </div>
        </div>
  </div>
  
  <div className="dashboard-parent">
          <form className="dashboard-form">
            <div> 
           <label htmlFor="options" className="form-heading">Log budget range</label><br/>
           <select onChange={handleSelect} value={selectoption} className="select">
            <option value=""></option>
            <option value="Weekly"> Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
           </select>
           </div>
           {(selectoption !== "") && 
           <div><label htmlFor="date-pick" className="form-heading">Choose a budget period</label> <br/><input type={date} onChange={handleDateinput} value={dateinput} className="rangeSelector"/> </div>} 
          </form>

    {(dateinput !== "") &&      

    <div className="first-row">
      
      <table className="table">

        <thead className="th">
          <tr className="tr">
        <td className="td">Date</td>
        <td colSpan="2" className="td">Budget Amount</td>
        </tr>
        </thead>
      
        <tbody className="th">
          {storeddata.length === 0 ?(
        <tr className="tr-error">
          <td colSpan="2" className="td-error"> {error}</td>
        </tr>
          ): (
            storeddata.map((entry, index)=>(
            <tr key={index} className="tr">
            <td className="td">{entry.widget}</td>
            <td className="td">{entry.amount}</td>
            </tr>
            
        )))
    }            
        </tbody>
      
      
      </table>

    </div>
    }
    <div className="add-budget-parent">
          <Button type="button" onClick={showAddbudget} target={addbudget} variant="outlined" className="add-budget">Add budget</Button>
          </div>
    </div>

    

{(addbudget) && <div className="budget-fill">
            <form className="budget-form">
                <label htmlFor="amount" className="form-heading budget amount"> Amount</label> 
                    <br/> <div className="budget-container">
                      <input type="number" value={amount} onChange={handleAmount} className="fbudget"/>
                      </div>

                {(amount) && <div className="amount budget-seprate">
                    
                    <input type="date" className="budget-date" onChange={handlebudgetDate} value={budgetdate}/>
            

                    
                    <Button variant="contained" className="save-budget" onClick={storeData}>Save budget</Button>
                     </div>} 
            </form>                  
          </div>
}

</div>
    )
}

export default Budgetsavings;