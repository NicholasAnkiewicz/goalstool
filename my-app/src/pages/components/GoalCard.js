import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';

export default function GoalCard(goal,employee) {
  return (
    <Card sx={{ maxWidth: "20%" }}>
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {employee.firstname[0]}
          </Avatar>
        }
        action={
            <IconButton aria-label="view">
                {<ReviewsIcon size="lg" color="primary"/>}
            </IconButton>
        }
        title={goal.name}
        subheader={employee.firstname + " " + employee.lastname}
      />

      <CardContent>
        <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          {goal.type}
        </Typography>
        <Typography variant="" color="text.primary">
        {goal.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {goal.createdate + '  -  ' + goal.completedate}

        </Typography>
       <Box sx={{ fontWeight: 'bold'}}>
          {goal.status}
        </Box>
      </CardContent>
     

    </Card>
  );
}
