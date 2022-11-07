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


export default function GoalCard(goal,employee,onClick) {
  return (
    <Card variant="elevation" sx={{ width: '100%'}}>
      <CardActionArea onClick={onClick}>
        <CardHeader sx={{height: '90px'}}
          avatar={
            <Avatar sx={ goal.status=="Not-Started"? { bgcolor: blue[500] } : goal.status=="In-Progress"? { bgcolor: green[500] } : goal.status == "Done" ? { bgcolor: blue[0]} : { bgcolor: red[500] } }/>
          }
          action={
            <IconButton aria-label="view">
              {<ReviewsIcon size="lg" color="primary"/>}
            </IconButton>
          }
          title={goal.title}
          subheader={employee.firstname + " " + employee.lastname + " (" + employee.eid+")"}
        />
        <CardContent sx={{height: '200px'}}>
          <Typography fontSize="14px" sx={{overflow: "hidden", textOverflow: "ellipsis", height: '85%'}} variant="body1" color="text.primary">
            {goal.description}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>{goal.status + " (#" + goal.id + ")"}</strong> 
            <div>{goal.startdate} — {goal.completedate} </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
