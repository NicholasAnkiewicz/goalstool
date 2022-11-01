import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';

export default function GoalCard(goal,employee) {
  return (
    <Card variant="elevation" sx={{ width: '100%'}}>
      <CardActionArea>
       <CardHeader
         avatar={
           <Avatar sx={ goal.status=="Missed"?{ bgcolor: red[500] }: goal.status == "Done" ? { bgcolor: blue[100]} : { bgcolor: green[500]}  } aria-label="recipe">
           </Avatar>
         }
        action={
            <IconButton aria-label="view">
                {<ReviewsIcon size="lg" color="primary"/>}
            </IconButton>
        }
        title={"(" + goal.id + ")" + goal.name}
        subheader={employee.firstname + " " + employee.lastname}
      />
      
      <CardContent>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          {goal.type}
        </Typography>
        <Typography style={{overflow: "hidden", textOverflow: "ellipsis", height: '75px'}} variant="body1" color="text.primary">
          {goal.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <strong>{goal.status}</strong> {goal.createdate + ' - ' + goal.completedate} 

        </Typography>
       
          
      </CardContent>
      </CardActionArea>
     

    </Card>
  );
}
