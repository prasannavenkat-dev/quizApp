import React, { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Home from "./Routes/Home";
import Quiz from "./Routes/Quiz";
import ScoreCard from "./Routes/ScoreCard";
import "./css/app.css";

function App() {
  const [data, setData] = useState('');
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [categoriesList, setCategoriesList] = useState('')

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
   
    //RESETING VALUES
    
    setDifficulty('');
    setCategory('');
    setName('');
    setScore(0);
    setData('');

    //FETCH CATEGORIES
    async function fetchCategories() {

      let { data: { trivia_categories } } = await axios.get('https://opentdb.com/api_category.php')
      setCategoriesList(trivia_categories)

    }
    
    fetchCategories()
  }, [])


//FETCH QUESTIONS

  async function fetchQuestions(category, difficulty) {
    let url;
    if (category && category !== 'any') {
      url = `https://opentdb.com/api.php?amount=10&category=${category}${difficulty && `&difficulty=${difficulty}&type=multiple`}`

    }
    else if (!category || category === 'any') {
      url = `https://opentdb.com/api.php?amount=10${difficulty && `&difficulty=${difficulty}&type=multiple`}`

    }

    let { data: { results } } = await axios.get(url);

    setData(results)

  }



  return (
    <div className="App">

      <BrowserRouter>
        <Switch>

          <Route path="/" exact>
            <Home name={name} setName={setName} setScore={setScore} categoriesList={categoriesList} setCategory={setCategory}
              category={category}
              fetchQuestions={fetchQuestions}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </Route>

         
          <Route
      path='/quiz'
      
      render={() => {
        return name&&category&&difficulty ? (<Quiz
              category={category}
              score={score}
              setScore={setScore}
              data={data}
              name={name}
              setName={setName}
              setCategory={setCategory}
              setDifficulty={setDifficulty}
            />) : <Redirect to="/" />;
      }}
    />


       
<Route
      path='/scoreCard'
      
      render={() => {
        return name&&category&&difficulty ? ( <ScoreCard
              name={name}
              setName={setName}
              score={score}
              setScore={setScore} />) : <Redirect to="/" />;
      }}

      />


        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
