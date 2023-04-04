import * as React from "react";
import "./accordionProfile.css";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import Card from "../../Card/Card";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({ title, data }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"span"} variant={"body2"}>
            <div className="profile-cards-container">
              {data?.map((item) => (
                <Card
                  title={item.visitedPlace}
                  img={item.photo}
                  description={item.title}
                  key={item._id}
                  id={item._id}
                  userName={item.userName}
                  date={item.date}
                  icon={Array(item.score).fill(<AiFillStar />)}
                />
              ))}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

CustomizedAccordions.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};
