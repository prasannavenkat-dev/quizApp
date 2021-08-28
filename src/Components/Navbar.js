import React from 'react'
import { useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Navbar({ currentQue, setCurrentQue, setSelectedOpt }) {

    //USE HISTORY HOOK
    const history = useHistory()


    //NEXT QUESTION HANDLER

    function nextQuestion() {
        setSelectedOpt()
        if (currentQue < 9) {
            setCurrentQue((prevValue) => {

                return prevValue + 1

            })
        }
        else {
            history.push('/scoreCard')
        }

    }

    //EXIT HANDLER

    function handleExit() {
        setCurrentQue(0)
        setSelectedOpt('')
    }

    return (

        <AppBar position="static" id='navbar'>
            <Toolbar>

                {/* QUIZ APP LOGO */}
                <Typography variant="h5" className="brand" style={{ flexGrow: '1' }} >
                    <div className="brand" >
                        Quiz&nbsp;App!
                    </div>
                </Typography>

                {/* NAV BUTTON GROUP */}

                <Grid container direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                >

                    {/* EXIT BTN */}

                    <Grid item >
                        <Button href='/' onClick={handleExit} variant="outlined" style={{ color: "white", borderColor: "white", padding: '4px 17px' }}>

                            Exit

                        </Button>
                    </Grid>

                    {/* NEXT/DONE BTN */}

                    <Grid item >
                        <Button variant="contained" onClick={nextQuestion} style={{ backgroundColor: "#298911", color: "white" }}>
                            {currentQue < 9 ? "Next " : "Done"}
                        </Button>
                    </Grid>

                </Grid>

            </Toolbar>
        </AppBar>







    )
}
