import { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { useTheragotchiContext } from '../utilities/TheragotchiContext';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MoodStatistics() {
    const { user, userMoodsArray, theragotchi } = useTheragotchiContext();

    const [moodCountsDataPoints, setMoodCountsDataPoints] = useState([]);
    const [moodChangeOverTimeDataPoints, setMoodChangeOverTimeDataPoints] = useState([]);

    useEffect(() => {
        if (userMoodsArray) {
            const moodCounts = {
                SAD: 0,
                CONTENT: 0,
                HAPPY: 0
            };

            const moodCountsByDate = {};

            userMoodsArray.forEach(mood => {
                moodCounts[mood.moodType]++;
                
                const date = mood.date;
                if (moodCountsByDate[date]) {
                    moodCountsByDate[date][mood.moodType]++;
                } else {
                    moodCountsByDate[date] = {
                        SAD: 0,
                        CONTENT: 0,
                        HAPPY: 0
                    };
                    moodCountsByDate[date][mood.moodType]++;
                }
            });

            const newMoodCountsDataPoints = [
                { label: 'SAD', y: moodCounts.SAD },
                { label: 'CONTENT', y: moodCounts.CONTENT },
                { label: 'HAPPY', y: moodCounts.HAPPY }
            ];

            const newMoodChangeOverTimeDataPoints = userMoodsArray.map(mood => ({
                x: new Date(mood.date),
                y: mood.moodType
            }));
            
            console.log(newMoodChangeOverTimeDataPoints)
            newMoodChangeOverTimeDataPoints.sort((a, b) => a.x - b.x);

            setMoodCountsDataPoints(newMoodCountsDataPoints);
            setMoodChangeOverTimeDataPoints(newMoodChangeOverTimeDataPoints);
        }
    }, [userMoodsArray]);

    if (!user || !userMoodsArray || !theragotchi) {
        return null;
    }

    const moodCountsOptions = {
        theme: "light2",
        title: {
            text: "Mood Statistics"
        },
        data: [{
            type: "column",
            dataPoints: moodCountsDataPoints,
            color: "#4c9bdb"
        }]
    };

    const moodTimelineOptions = {
        theme: "light2",
        title: {
            text: "Mood Change Over Time"
        },
        axisX: {
            title: "Date",
            valueFormatString: "DD MMM YYYY",
        },
        axisY: {
            title: "Mood Type",
            reversed: true,
            interval: 0,
            labelFormatter: function(e) {
                if (e.value === 3) return "SAD";
                else if (e.value === 2) return "CONTENT";
                else if (e.value === 1) return "HAPPY";
                return "";            }
        },
        data: [
            {
                type: "spline",
                name: "Mood",
                showInLegend: false,
                dataPoints: moodChangeOverTimeDataPoints.map(point => ({
                    x: point.x,

                    y: point.y === "SAD" ? 3 : point.y === "CONTENT" ? 2 : 1,
                    label: point.x.toDateString()
                })),
                color: "#4c9bdb",
            }
        ]
    };

    return (
        <div className="statistics-container">
            <h2>Mood Statistics and Timeline</h2>
            <div className='statistics-div'>
                Statistics and Mood Timeline for {user.userName}
                <br></br>
                You joined on {userMoodsArray[0].date}
                <br></br>
                Days active: {userMoodsArray.length}
            </div>
            <div className='chart chart-2'>
                <CanvasJSChart options={moodTimelineOptions} />
            </div>
            <div className='chart-container'>
                <div className='chart chart-1'>
                    <CanvasJSChart options={moodCountsOptions} />
                </div>
            </div>
        </div>
    );
}

export default MoodStatistics;
