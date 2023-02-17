
import axios from 'axios';
import  React , { useEffect , useState } from 'react'

const MemberTable = () => {


    const [loading , setLoading] = useState(false);
    const [data , setData] = useState(null)


    let date;
    let year;
    let month;
    let day;
    let fullDate;
    let minute;
    let hour

    useEffect(() => {
  // collect the data using useeffect and store in data
  // turn loading to true after we fetch the data on useefect
        axios
        (

            {
                url: 'http://3.8.100.74:8080/admin/api/v2/waiting_list/getAllWaitlistedUsers',
                method: 'get',
                headers: {
                    "x-product" : "LEDGER"
                }
             }
        )
            .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setLoading(true)
        })



    } , [])

    console.log(data);
    console.log(loading);



   return (



    loading ?   <table>
  <tr>
  <th >No</th>
  <th >Display Name</th>
  <th >Created At</th>
  <th >Email</th>
  <th >Referal</th>
  <th >Rank</th>
    <th >Name</th>



  </tr>

  {

    // get the data and map it each data and map it use the data to get each individually using data[col]


    Object.keys(data).map(col => {

         console.log(data[col])

   const {displayName , created_at

 , email , referral_code
 , rank  , firstName   }  = data[col]
// convert created_at to date using date.toIsOString().substring(0, 10)
   date = new Date(created_at);
date.toISOString().substring(0, 10);

year = date.getFullYear()
month = date.getMonth() + 1;
day = date.getDay();
hour = date.getHours();
minute = date.getMinutes()
fullDate = `${year}/${month}/${day}/${hour}/${minute}`


   return (
  <tr key={col + 1}>
   <td>{col}</td>
   <td>{displayName}</td>
    <td>{fullDate}</td>
    <td>{email}</td>
    <td>{referral_code}</td>
    <td>{rank}</td>
    <td>{firstName}</td>
      </tr>

   )



    }
    )
  }




















    </table>
































    : "...Loading"











  )
   }

export default MemberTable