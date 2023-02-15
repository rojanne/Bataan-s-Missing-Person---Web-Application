import { Bar } from "react-chartjs-2"
import React from "react"
import Chart from 'chart.js/auto'
import { useState, useEffect } from "react"


const BarChart = () => {
    const [total, setTotal] = useState([])
    const [missing, setMissing] = useState([])
    const [sighted, setSighted] = useState([])
    const [found, setFound] = useState([])

    const getTotal = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/count-reports",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    total: JSON.stringify(total)
                }
            )
            const jsonData = await response.json();

            setTotal(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTotalMissing = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/count-missingreports",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    missing: JSON.stringify(missing)
                }
            )
            const jsonData = await response.json();

            setMissing(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    const getSighted = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/count-sightedreports",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    sighted: JSON.stringify(sighted)
                }
            )
            const jsonData = await response.json();

            setSighted(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }

    const getFound = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/count-foundreports",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    },
                    found: JSON.stringify(found)
                }
            )
            const jsonData = await response.json();

            setFound(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }


    useEffect(() => {
        getTotal();
    }, []);
    useEffect(() => {
        getTotalMissing();
    }, []);
    useEffect(() => {
        getSighted();
    }, []);
    useEffect(() => {
        getFound();
    }, []);


    return (
        <div >

            <Bar

                data={{
                    labels: ['Total # of Reports', 'Missing Reports', 'Sighted Reports', 'Found Reports'],
                    datasets: [
                        {
                            label: "Number of Reports",

                            data: [total.count, missing.count, sighted.count, found.count],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                
                            ],
                            borderWidth: 1,
                            barThickness: 80

                        },
                    ]
                }}


                height={350}

                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 18,
                                    weight: 700,
                                },
                                color: 'black',
                            },
                            grid: {
                                color: 'black',
                            }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 18,
                                    weight: 700,
                                },
                                color: 'black',

                            },

                        },

                    },

                }}
            />

        </div>
    )
}
export default BarChart