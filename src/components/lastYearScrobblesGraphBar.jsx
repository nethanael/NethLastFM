import React, { Component } from 'react';
import { BarChart, Bar, XAxis, 
    YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class LastYearScrobblesGraphBar extends Component {

    render() { 
        const { scrobbles: data, range } = this.props;
        return (
                <React.Fragment>
                <h4>Last Year´s Scrobbles per month:</h4>
                { !data &&
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                }
                { data &&
                <ResponsiveContainer height={300} width={550}>
                    <BarChart 
                        data={data} 
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 30,
                        }}
                        //margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                    <XAxis 
                        dataKey="Month"
                    />
                    <YAxis 
                    //unit="Scrobbles" 
                        domain={[0, range]}         // estable el rango del eje y, en ese caso de 0 a 1000 scrobbles
                        //label="Kbps"
                    />
                    <Tooltip />
                    <CartesianGrid 
                        stroke="#ddd" 
                        //strokeDasharray="5 5"
                        vertical='False'
                    />
                    <Bar
                        name ="Scrobbles" 
                        dataKey="Scrobbles" 
                        barSize={30} 
                        fill="#8884d8"
                    />
                </BarChart>
            </ResponsiveContainer>
            }
            </React.Fragment>
            );
    }
}
 
export default LastYearScrobblesGraphBar;
  
