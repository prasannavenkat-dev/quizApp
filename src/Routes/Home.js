import React from "react"
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import Grid from '@material-ui/core/Grid';

export default function Home({ name, setName, setScore, fetchQuestions, categoriesList, setCategory, setDifficulty, category, difficulty }) {

    
//USE HISTORY HOOK
const history = useHistory()


//NAME HANDLER 

function handleName(e) {
        setName(e.target.value)
    }

//SUBMIT HANDLER

function handleSubmit() {
        setScore(0)
        fetchQuestions(category, difficulty)
        history.push('/quiz')
}


    return (
        <div className="logo">
            <h1 className="heading" >
                Quiz App!
            </h1>

            <Grid  id="homeSelect" container spacing={2} >

              {/* NAME FIELD */}

                <Grid item  xs={12}>
                    <TextField id="outlined-search"
                        label="Name"
                        type="search"
                        variant="outlined"
                        value={name}
                        onChange={(e) => handleName(e)}
                        className='inputField'
                    />
                </Grid>
              
              {/* CATEGORY SELECT */}

                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Category"
                        value={category}
                        variant="outlined"
                        onChange={(e) => setCategory(e.target.value)}
                        className='inputField'

                    >

                        {categoriesList ? categoriesList.map(e => <MenuItem key={e.id} value={e.id}> {e.name}</MenuItem>) : <MenuItem key="fetching..." value="">fetching...</MenuItem>}


                    </TextField>
                </Grid>


                {/* DIFFICULTY SELECT */}

                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Difficulty"
                        value={difficulty}
                        variant="outlined"
                        onChange={(e) => setDifficulty(e.target.value)}
                        className='inputField'

                    >

                        <MenuItem key="Select Difficulty" value="">Select Difficulty</MenuItem>

                        <MenuItem key="easy" value="easy">Easy</MenuItem>
                        <MenuItem key="medium" value="medium">Medium</MenuItem>

                        <MenuItem key="hard" value="hard">Hard</MenuItem>


                    </TextField>
                </Grid>

                <br />

                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit} id='enterQuizBtn' >
                        ENTER Quiz
                    </Button>
                </Grid>


            </Grid>
          

        </div>
    )
}