
import { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import './CustomScrollbar.css';
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from '@ant-design/icons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(0),
    minHeight: "80vh", // Ensure the background covers the entire viewport height
    backgroundImage: 'url("/doctor-s-hand-holding-stethoscope-closeup.jpg")', // Add your image path here
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingRight: 80,
    width:"full"
  },
  carouselContainer: {
    maxWidth: 800, // Adjusted width to reduce the size of the carousel
    overflow: "hidden",
    position: "relative", // Added relative positioning
    marginRight: 40
  },
  carousel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -20, // Shift carousel 20px to the left
  },
  card: {
    minWidth: 400, // Adjusted width to reduce the size of the card
    maxWidth: 240,
    maxHeight:400,
    minHeight:200,
    margin: theme.spacing(1), // Reduce margin
    padding: theme.spacing(1), // Reduce padding
    textAlign: "center",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    transition: "transform 0.3s ease",
    borderRadius: 16,
    backgroundColor: "#4299E1",
    color:"white"
  },
  buttonsContainer: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 20, // Adjusted padding to account for the left shift
    paddingRight: 20, // Adjusted padding to account for the left shift
  },
  buttons: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    color: "black",
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: '"Alfa Slab One", serif !important'
  },
}));

const ContentCardsV = () => {
  const [index, setIndex] = useState(0);
  const classes = useStyles();
  const navigate = useNavigate();
  const { getSpecialization } = useContext(AuthContext);
  const { specialization } = useContext(AuthContext);

  const callSpecialization = (specializationId) =>{
    localStorage.setItem('sId',specializationId)
    console.log("The id we are setting is  "+specializationId);
    navigate("/specialization");
}


  useEffect(() => {
    getSpecialization();
  }, []);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === (specialization?.length ?? 0) - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? (specialization?.length ?? 0) - 1 : prevIndex - 1));
  };

  return (
    <>
    <div className="w-full pl-[70px] flex flex-col justify-center  bg-white">
     <div  className="text-center text-[20px] py-[20px] text-white font-extrabold bg-blue-500">Specializations we have</div>
      <div className={classes.root} >
        <div className={classes.carousel}>
              <Button onClick={handlePrev} className={classes.buttons}>
        <LeftOutlined />
      </Button>

          {specialization && specialization.length > 0 && (
            <Card className={classes.card}>
              <CardContent className="relative text-white">
              <Typography variant="h6" className="{classes.boldText}"><span style={{ fontFamily: '"Alfa Slab One", serif' }} className="text-white text-[30px] uppercase tracking-wider ">{specialization[index]?.specialityName} </span></Typography>
              <Typography variant="body1" className="{classes.boldText}"><span className="text-white font-bold">{specialization[index]?.description}</span></Typography>
              <Button onClick={()=>callSpecialization(specialization[index].specialityId)}  variant="contained" className="relative top-[10px]" color="primary"><span className="font-bold"> Explore </span></Button>
            </CardContent>
            </Card>
          )}
         <Button onClick={handleNext} className={classes.buttons}>
  <RightOutlined />
</Button>
        </div>
      </div>
      </div>
    </>
  );
};

export default ContentCardsV;