import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Accordion.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({ data }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(data);
  }, [data]);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>See Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {comments &&
            comments.map((comment, index) => {
              return (
                <Typography key={index}>
                  {index + 1} - {comment}
                </Typography>
              );
            })}
          {comments?.length === 0 && (
            <Typography>There is no comment.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

SimpleAccordion.propTypes = {
  data: PropTypes.array,
};
