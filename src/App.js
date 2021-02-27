import './App.css';
// just running npm install will install the package axios 
// however if you are working on your own project and want to install
// axios you have to run npm install axios
// axios is just like fetch but a little nicer to use
// you dont need to run response.json() it does it for you
import axios from 'axios'
import {useState} from "react"

function App() {
  // state variable called data created - initialised as an array
  let [data, setData] = useState([])
  let [setup, setSetup] = useState("")
  let [delivery, setDelivery] = useState("")

  // this function gets data from API and sets it to variable
  const getDataFromApi = async () => {
    //axios is like fetch. the get method is a HTTP method - https://www.w3schools.com/tags/ref_httpmethods.asp
    // get is the method used to request data - it is also the default http method for both fetch and axios
    // this is why fetch worked for us without clearly defining get method
    // we await axios.get because it is a promise - it is grabbing data from the api
    // if we do not await it - const response will not have a value stored in it but instead
    // will simply be promise<pending> because the response may not have arrived
    // in order to use await we need to have async which we put before
    // the parameter of the function
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=twopart")
    // see in the console log what response looks like
    // unlike fetch function it automatically gets the JSON and places it
    // in the data property of the response object
    console.log(response) 
    const dataFromApi = response.data
    // the api sent a joke object, I create an array that has the setup and delivery as first and second
    // elements
    const arrayToBePushedIntoState = [dataFromApi.setup,dataFromApi.delivery]
    // I then push this array into the state variable called data
    setData(arrayToBePushedIntoState)
  }
  const setSetupAndDelivery = () => {
    // I destructure the array and pull out the firstelement and secondelement of data
    // I can call them whatever I want - i just chose first element and secondelement
    let [firstElement, secondElement] = data
    // I then make the state variable setup = firstElement and delivery = secondelement 
    setSetup(firstElement)
    setDelivery(secondElement)
    // The reason I use this function is because when the state changes the app rerenders
    // rerendering simply means the whole component function is called again when any of its state 
    // variables change
  }

  return (
    <div>
     <p> Wanna hear a joke? Click the first button then the second button</p>
     <button onClick={() => getDataFromApi()}> This button fetches data from the API and assigns it to the state variable data </button>
     <button onClick={()=> setSetupAndDelivery()}>This button takes the values from the data state variable and assigns it to the state variables setup and delivery</button>
     <p> Setup State Variable = {setup}</p>
     <p>Delivery State Variable = {delivery}</p>
    </div>
  );
}

export default App;
