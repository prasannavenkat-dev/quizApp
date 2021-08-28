import React, { useState, useEffect } from "react";

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



export default function ScoreCard({ score, name }) {

    const [message, setMessage] = useState('');


    useEffect(() => {

        let text;

        // DISPLAY SCORE MESSAGE

        if (score > 5 && score !== 10) {

            text = `Well Done! ${name}  you've got`
        }

        else if (score < 6 && score !== 0) {
            text = `Keep Trying! ${name}  you've got`

        }
        else if (score === 10) {
            text = `Hurray! ${name},You are awesome.you've got`

        }
        else if (score === 0) {
            text = `Oops! Try Again ${name},  you've got`

        }
        setMessage(text)
    }, [message, name, score])



    return (

        <Grid container direction="column" justifyContent="flex-start" alignItems="center" style={{ backgroundColor: "#46178F", height: "100vh" }}>

            {/* SCORECARD TITLE */}

            <Grid item id='scoreCardHeader' >
                <h1 className='scorecard' align='center'>
                    SCORECARD
                </h1>

            </Grid>

            {/* NEW QUIZ */}

            <Grid item id='newQuiz' >

                <Button href='/' variant="contained" id='newQuizBtn'>
                    <h3>
                        New Quiz
                    </h3>
                </Button>

            </Grid>


            {/* MESSAGE CARD */}


            <Grid item id='messageGrid'>


                <Typography justify="center" variant="h4" align='center' id='message' >

                    {message ? message : 'you ve got'}
                    <hr />

                </Typography>

                <Typography justify="center" variant="h3" align='center' id='score'>

                    {score}/10
                    <br />
                    Score
                </Typography>


            </Grid>


        </Grid>


    )
}