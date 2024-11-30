import {Container} from "reactstrap";
import Box from "@mui/material/Box";
import RequestBox from "./RequestBox";
import React, {useEffect, useRef, useState} from "react";
import '../assets/css/Main.css';
import { useMediaQuery, useTheme as useMuiTheme, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const backgroundImage = "mainLandingImage.jpg"
const secondBackImage = "elephantMountainImage.jpg"
const thirdBackImage = "mulsoImage.jpg"
const fourthBackImage = "tripImage.jpg"

interface ContentVisibility {
    second: boolean;
    third: boolean;
    fourth: boolean;
}

const LandingPage = () => {
    const navigate = useNavigate();
    const theme = useMuiTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [imageSizes, setImageSizes] = useState({
        second: 30,
        third: 30,
        fourth: 30
    });
    const [contentVisibility, setContentVisibility] = useState<ContentVisibility>({
        second: false,
        third: false,
        fourth: false
    });

    const secondImageRef = useRef<HTMLDivElement>(null);
    const thirdImageRef = useRef<HTMLDivElement>(null);
    const fourthImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateVisibility = (element: HTMLElement) => {
            if (isMobile) {
                return true;
            }
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const elementHeight = rect.height;
                const visibleRatio = visibleHeight / elementHeight;

                return visibleRatio > 0.6; // Show content when 70% visible
            }
            return false;
        };
        const calculateHeight = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const elementHeight = rect.height;
                const visibleRatio = visibleHeight / elementHeight;

                // Calculate new height
                const newHeight = 40 + (visibleRatio * 10); // 30 is the difference between 50 and 20

                return Math.min(Math.max(newHeight, 40), 50);
            }
            return 30; // Default height
        };

        const handleScroll = () => {
            if (!isMobile) {
                // Previous size calculations
                const newSizes = {
                    second: secondImageRef.current ? calculateHeight(secondImageRef.current) : 40,
                    third: thirdImageRef.current ? calculateHeight(thirdImageRef.current) : 40,
                    fourth: fourthImageRef.current ? calculateHeight(fourthImageRef.current) : 40
                };

                // Calculate content visibility
                const newVisibility = {
                    second: secondImageRef.current ? calculateVisibility(secondImageRef.current) : false,
                    third: thirdImageRef.current ? calculateVisibility(thirdImageRef.current) : false,
                    fourth: fourthImageRef.current ? calculateVisibility(fourthImageRef.current) : false
                };

                setImageSizes(prevSizes => {
                    const keys = ['second', 'third', 'fourth'] as const;
                    const hasChanged = keys.some(
                        key => Math.abs(prevSizes[key] - newSizes[key]) > 0.5
                    );
                    return hasChanged ? newSizes : prevSizes;
                });

                setContentVisibility(newVisibility);
            }
        };

        if (!isMobile) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial calculation
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    const ContentOverlay = ({
                                isVisible,
                                description,
                                position,
                                route,
                                title,
                                styleVariant // Add this new prop
                            }: {
        isVisible: boolean;
        description: string;
        position: 'left' | 'center' | 'right';
        route: string;
        title: string;
        styleVariant: 'first' | 'second' | 'third';
    }) => {
        const positionStyles = {
            left: {
                alignItems: isMobile ? 'center' : 'flex-start',
                textAlign: isMobile ? 'center' : 'left',
                padding: isMobile ? '0 1rem' : '0 0 0 10%',
            },
            center: {
                alignItems: 'center',
                textAlign: 'center',
                padding: isMobile ? '0 1rem' : '0 20%',
            },
            right: {
                alignItems: isMobile ? 'center' : 'flex-end',
                textAlign: isMobile ? 'center' : 'right',
                padding: isMobile ? '0 1rem' : '0 10% 0 0',
            },
        };


        const polygonStyles = {
            first: {
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))',
                clipPath: 'polygon(0% 5%, 100% 0%, 95% 95%, 5% 100%)', // Diamond-like shape
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(8px)',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 95%)',
                },
            },
            second: {
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5))',
                clipPath: 'polygon(5% 0%, 100% 8%, 95% 100%, 0% 92%)', // Reduced left clipping from 15% to 5%
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(12px)',
                    clipPath: 'polygon(3% 5%, 98% 0%, 95% 95%, 2% 100%)', // Adjusted to match outer shape
                },
            },
            third: {
                background: 'linear-gradient(160deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.45))',
                clipPath: 'polygon(8% 0%, 92% 3%, 100% 15%, 98% 85%, 90% 100%, 10% 97%, 0% 85%, 2% 15%)', // Octagon-like shape
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.05)',
                    filter: 'blur(10px)',
                    clipPath: 'polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)',
                },
            }
        };

        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    ...positionStyles[position],
                    opacity: isMobile ? 1 : (isVisible ? 1 : 0), // Always visible on mobile
                    transition: 'opacity 1s ease-in-out',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        maxWidth: isMobile ? '100%' : '500px',
                        padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem 2rem',
                        marginBottom: isMobile ? '1rem' : '2rem',
                        ...polygonStyles[styleVariant],
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: -5,
                            left: -5,
                            right: -5,
                            bottom: -5,
                            background: 'rgba(0, 0, 0, 0.3)',
                            filter: 'blur(12px)',
                            zIndex: -1,
                        }
                    }}
                >
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: 'white',
                            mb: isMobile ? 1 : 2,
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'white',
                            mb: isMobile ? 2 : 3,
                            fontSize: isMobile ? '0.9rem' : '1rem',
                        }}
                    >
                        {description}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate(route)}
                        sx={{
                            backgroundColor: theme.palette.customButtonColor.main,
                            color: theme.palette.customButtonFontColor.main,
                            padding: isMobile ? '8px 16px' : '10px 20px',
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            '&:hover': {
                                backgroundColor: theme.palette.customButtonColor.dark,
                            },
                        }}
                    >
                        See Trips
                    </Button>
                </Box>
            </Box>
        );
    };



    return (
        <>
            <Container>
                <RequestBox image={backgroundImage} />

                <Box
                    ref={secondImageRef}
                    sx={{
                        position: 'relative',
                        backgroundImage: `url(${require(`../assets/img/landingBackground/${secondBackImage}`)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: theme.palette.customBackgroundColor.main,
                        height: `${imageSizes.second}rem`,
                        width: '100%',
                        transition: 'height 0.5s ease-out',
                    }}
                >
                    <ContentOverlay
                        isVisible={contentVisibility.second}
                        title="KILIMANJARO"
                        description="Discover the majestic wildlife of Africa in their natural habitat. Our safari experiences bring you up close with nature's most magnificent creatures while ensuring their preservation and protection."
                        position="right"
                        route="/trips/Kilimanjaro"
                        styleVariant="first"
                    />
                </Box>

                <Box
                    ref={thirdImageRef}
                    sx={{
                        position: 'relative',
                        backgroundImage: `url(${require(`../assets/img/landingBackground/${thirdBackImage}`)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: theme.palette.customBackgroundColor.main,
                        height: `${imageSizes.third}rem`,
                        width: '100%',
                        transition: 'height 0.5s ease-out',
                    }}
                >
                    <ContentOverlay
                        isVisible={contentVisibility.third}
                        title="SAFARI ADVENTURE"
                        description="Experience the breathtaking beauty of Mount Kilimanjaro. Challenge yourself to reach Africa's highest peak while enjoying stunning views and diverse ecosystems along the way."
                        position="left"
                        route="/trips/Safari"
                        styleVariant="second"
                    />
                </Box>

                <Box
                    ref={fourthImageRef}
                    sx={{
                        position: 'relative',
                        backgroundImage: `url(${require(`../assets/img/landingBackground/${fourthBackImage}`)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: theme.palette.customBackgroundColor.main,
                        height: `${imageSizes.fourth}rem`,
                        width: '100%',
                        transition: 'height 0.5s ease-out',
                    }}
                >
                    <ContentOverlay
                        isVisible={contentVisibility.fourth}
                        title="DAY TRIPS"
                        description="Explore the pristine beaches and rich culture of Zanzibar. Immerse yourself in the island's unique blend of African, Arab, and Indian influences while relaxing in paradise."
                        position="right"
                        route="/trips/Day Trips"
                        styleVariant="third"
                    />
                </Box>
            </Container>
        </>
    );
};

export default LandingPage;