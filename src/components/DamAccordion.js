import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DamAccordion = ({ dams }) => {
    return (
        <div>
            {dams.map((dam, index) => (
                <Accordion key={index} sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Matching .card background
                    color: 'white', // Assuming you want white text like in .card
                    borderRadius: '5px', // Matching .card border-radius
                    '&:before': { // Removing the default MUI Accordion expand line
                        display: 'none',
                    },
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                        sx={{
                            padding: '10px', // Matching .card padding
                            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                transform: 'rotate(180deg)',
                            },
                            '& .MuiAccordionSummary-content': {
                                marginLeft: '10px', // Adjust as needed
                            },
                        }}
                    >
                        <Typography>{dam.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '10px', // Matching .card padding
                    }}>
                        {Object.entries(dam).map(([key, value]) => (
                            <Typography key={key} paragraph sx={{ margin: 0 }}>
                                <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                            </Typography>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default DamAccordion;
