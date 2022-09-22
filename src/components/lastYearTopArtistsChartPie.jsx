import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell,Tooltip, ResponsiveContainer } from 'recharts';


class LastYearTopArtistsGraphPie extends Component {
    

    render() { 
        const { topArtist: data } = this.props;
        //console.log("Pie Data: ", data);
          
        const COLORS = ['#5ee82a', '#c0e82a', '#e8e52a', '#e8b42a', '#e8892a'];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
            };

        return (
            <React.Fragment>
            <h4>Last Year´s Top 5 Artists:</h4>
            <ResponsiveContainer width={"100%"} height={300} min-width={400}>
                <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="playcount"
                >          
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            </React.Fragment>
            );
    }
}
 
export default LastYearTopArtistsGraphPie;
  
