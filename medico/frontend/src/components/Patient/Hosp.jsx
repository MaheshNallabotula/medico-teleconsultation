import React from 'react'
import { useEffect,useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from '@ant-design/icons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(0),
      minHeight: 300, // Ensure the background covers the entire viewport height
      maxHeight:300,
      backgroundImage: 'url("/hos.jpg")', // Add your image path here
      backgroundSize: "contain",
      backgroundRepeat:"no-repeat",
      backgroundPosition: "center",
      paddingRight: 50,
      marginBottom:0,
      
    },
    carouselContainer: {
      maxWidth: 400, // Adjusted width to reduce the size of the carousel
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
      minWidth: 1000, // Adjusted width to reduce the size of the card
      maxWidth: 240,
      maxHeight:150,
      minHeight:150,
      margin: theme.spacing(1), // Reduce margin
      padding: theme.spacing(1), // Reduce padding
      textAlign: "center",
      transition: "transform 0.3s ease",
      borderRadius: 16,
      backgroundColor: "#4299E1",
      color:"white",
      marginTop:450,
      marginLeft:60
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
      marginTop:100
    },
    boldText: {
      fontWeight: "bold",
      fontFamily: '"Alfa Slab One", serif !important'
    },
  }));

  const Hosp = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const classes = useStyles();
    const { getAllHospitals, hospitals } = useContext(AuthContext);

    useEffect(() => {
        getAllHospitals();
    }, []);

    const visibleHospitals = hospitals.slice(index, index + 1);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === hospitals.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? hospitals.length - 1 : prevIndex - 1));
    };

    const enterHospital=(hospId)=>{
        localStorage.setItem("hospId",hospId)
        console.log("hospital id is", localStorage.getItem("hospId"));
         navigate('/hospital')
    }

    return (
        <div className="w-[1000px] h-[600px] flex flex-col justify-center ml-[150px] bg-white mt-[10px]  ">
            <div className="text-center text-[20px] py-[20px] text-white font-extrabold bg-blue-500">Hospitals</div>
            <div className={classes.root}>
                <div className={classes.carousel}>
                    <Button onClick={handlePrev} className={classes.buttons}>
                        <LeftOutlined />
                    </Button>

                    {Array.isArray(visibleHospitals) && visibleHospitals.map((hospital, index) => (
                        <Card key={index} className={classes.card}>
                            <CardContent className="relative text-white">
                                <Typography variant="h6" className="{classes.boldText}">
                                    <span style={{ fontFamily: '"Alfa Slab One", serif' }} className="text-white text-[30px] uppercase tracking-wider ">{hospital.hospitalName}</span>
                                </Typography>
                                <Typography variant="body1" className="{classes.boldText}">
                                    <span className="text-white font-bold">{hospital.hospitalAddress}</span>
                                </Typography>
                                <Button onClick={() => enterHospital(hospital.hospitalId)} variant="contained" className="relative top-[10px]" color="primary">
                                    <span className="font-bold"> Explore </span>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    <Button onClick={handleNext} className={classes.buttons}>
                        <RightOutlined />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Hosp;