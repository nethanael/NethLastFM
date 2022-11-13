import React, { Component } from 'react';
import LastYearScrobblesGraphBar from './lastYearScrobblesGraphBar';
import LastYearTopArtistsGraphPie from './lastYearTopArtistsChartPie';
class Dashboard extends Component {

    handleLastYear = (now) => {                 // here we calculate the previous year
        now = now - (31536000 * 1000);          // Now minus one year in miliseconds
        const dateObject = new Date(now);       // date Object creation
        const humanDateFormat = dateObject.toLocaleString("en-US", {year: "numeric"});  // convertion to single value
        return humanDateFormat;
      };

    handleYearDates = (year) => {               // create the array with a month by month unix time

        let dates = [];

        for (let count = 0; count < 12; count++){       
            const monthStart = new Date(year, count, 1);
            dates.push(monthStart.getTime()/1000);          // first day of the month 00:00:00
            const monthEnd = new Date(year, count + 1 , 0, 23, 59, 59 ); // the zero makes the trick to get the last day
            dates.push(monthEnd.getTime()/1000);            // Last day of the month 23:59:00
            };

        return dates;
    };

    componentDidMount() {
        const {getTopTags, getTopArtist, getLastYearScrobbles} = this.props;

        const previousYear = this.handleLastYear(Date.now());
        //console.log(previousYear);
        const monthsLastYear = this.handleYearDates(previousYear);
        //console.log("Last Year´s Months in unix time: ", monthsLastYear);
        getTopTags();  
        getTopArtist(monthsLastYear);    
        getLastYearScrobbles(monthsLastYear);  
    };

    render() { 

        const { lastYearScrobbles: scrobbles, topTags, topArtist, range } = this.props;
        console.log(topTags);

        return (
        <React.Fragment>
            <div className='row mi_row'>
                <div className='col mi_col'></div>
                <div className='col mi_col'>
                    <LastYearScrobblesGraphBar
                        scrobbles={scrobbles} 
                        range={range}
                    />
                </div>
                <div className='col mi_col'>
                    <LastYearTopArtistsGraphPie
                        topArtist={topArtist} 
                    />
                </div>
                <div className='col mi_col'></div>
            </div>
        </React.Fragment>
            );
    }
}
 
export default Dashboard;
