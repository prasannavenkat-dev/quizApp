import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgress } from "@material-ui/core";


export default function Quiz({ data, score, setScore, resetValues }) {

    const [currentQue, setCurrentQue] = useState(0)
    const [options, setOptions] = useState([])
    const [selectedOpt, setSelectedOpt] = useState()
    const [correctOpt, setCorrectOpt] = useState()

    useEffect(() => {

        //SET CORRECT-OPTION

        data[currentQue] && setCorrectOpt(data[currentQue].correct_answer);


        //SHUFFLE OPTIONS

        function handleOptions(arr) {
            setOptions(arr.sort(() => Math.random() - 0.5))

        }

        data[currentQue] && handleOptions([data[currentQue].correct_answer, ...data[currentQue].incorrect_answers])

    }, [data, currentQue])



    //USER SELECT HANDLER

    function handleSelect(e) {
        setSelectedOpt(e)
        if (e === correctOpt) {
            setScore((prev) => prev + 1)
        }
    }

    //REVEAL CORRECT/WRONG OPTION

    function handleClass(e) {

        if (selectedOpt === e && selectedOpt === correctOpt) {

            return 'correct'
        }
        else if (selectedOpt === e && selectedOpt !== correctOpt) {

            return 'wrong'
        }
        else if (e === correctOpt) {
            return 'correct'
        }

    }



    return (
        <div className="quiz">


            <Navbar resetValues={resetValues} currentQue={currentQue} setCurrentQue={setCurrentQue} setSelectedOpt={setSelectedOpt} />

            {data ? (
                <Grid
                    container direction="column" justifyContent="space-between" alignItems="center"
                    style={{ height: "88vh", padding: '5px' }}
                >

                    <Grid item style={{ width: '100%' }} >
                        <Grid container direction="row" justifyContent="space-around" alignItems="center">

                            {/* QUESTION NO. CARD */}

                            <Grid item >
                                <Card id='queNumCard'>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" align='center'>

                                            {currentQue + 1}
                                            <br />
                                            Q No.
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Grid>

                            {/* SCORE CARD */}

                            <Grid item>

                                <Card id='scoreNumCard'>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" align='center'>
                                            {score}
                                            <br />
                                            SCORE
                                        </Typography>
                                    </CardContent>
                                </Card>


                            </Grid>

                        </Grid>
                    </Grid>

                    {/* QUESTION CARD */}

                    <Grid >
                        <Grid container className="queGrid" direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={12} >

                                <Card>
                                    <CardContent>
                                        <h4  id='question'>
                                            {data && data[currentQue]?.question}
                                        </h4>
                                    </CardContent>
                                </Card>


                            </Grid>
                        </Grid>

                    </Grid>

                    {/* OPTIONS */}

                    <Grid container className="optionContainer" justifyContent="center" alignItems="stretch" style={{ marginTop: '2px' }}>
                        {
                            options && options.map(e => {
                                return (
                                    <Grid item xs={12} md={6} key={e}>
                                        <button onClick={() => handleSelect(e)}
                                            className={` ${selectedOpt && handleClass(e)} options`}
                                            disabled={selectedOpt} >

                                            <Typography variant="h6" component="h2">
                                                <span className='option'>
                                                    {e}
                                                </span>
                                            </Typography>

                                        </button>
                                    </Grid>
                                )
                            })}

                    </Grid>


                </Grid>)

                : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {/* LOADER  */}

                        <CircularProgress align='center' size={100} thickness={2} id='spinner' />
                    </div>

                )}

        </div>
    )
}