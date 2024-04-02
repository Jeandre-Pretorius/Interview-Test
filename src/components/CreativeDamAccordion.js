import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DamAccordion = ({ dams }) => {
    return (
        <div>
            {dams.map((dam, index) => (
                <Accordion key={index} sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", 
                    color: '#ebebeb', 
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    marginBottom: '5px',
                    '&:before': { 
                        display: 'none',
                    },
                }}>
                    <AccordionSummary
                        expandIcon={<ChevronLeftIcon sx={{ color: 'white' }} />}                    
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                        sx={{
                            padding: '10px',
                            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                transform: 'rotate(-90deg)',
                                translate: 'transform 0.5s'
                            },
                            '& .MuiAccordionSummary-content': {
                                marginLeft: '10px', 
                            },
                        }}
                    >
                        <Typography sx={{fontWeight: 'bold'}}>{dam.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: '10px', 
                    }}>
                        {Object.entries(dam).map(([key, value]) => (
                            <Typography key={key} paragraph sx={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <u><strong style={{paddingRight: '2px'}}>{key.replace(/_/g, ' ')}:</strong></u>
                                <p style={{fontSize: '12px', fontWeight: '400', color: '#FAFAFA', textAlign: 'center'}}>{value}</p>                           
                            </Typography>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default DamAccordion;
