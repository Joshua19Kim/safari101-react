import {styled} from "@mui/material/styles";


export const generalActivities: ActivityTopic[] = [
    { id: 'Safari', value: 'safari', image: 'safariLion.jpg' },
    { id: 'Kilimanjaro', value: 'kilimanjaro',  image: 'elephant.jpg' },
    { id: 'Zanzibar', value: 'zanzibar', image: 'cryingLion.jpg' },
    { id: 'Climbing', value: 'climbing', image: 'griff.jpg' },
    { id: 'Photographic Safari', value: 'photographicSafari', image: 'photoSafari.jpg' },
    { id: 'Day Trips', value: 'dayTrips', image: 'trip.jpg' },
];

export const eastAfricaCategories = [
    { id: 'Uganda', value: 'uganda', image: 'uganda.jpg' },
    { id: 'Rwanda', value: 'rwanda', image: 'rwanda.jpg' },
    { id: 'Kenya', value: 'kenya', image: 'kenya.jpg' },
    { id: 'Tanzania', value: 'tanzania', image: 'tanzania.jpg' },
];

export const climbingCategories = [
    { id: 'Kilimanjaro', value: 'kilimanjaro',  image: 'climbingKilimanjaro.png' },
    { id: 'Oldnoyo Lengai', value: 'oldnoyoLengai', image: 'climbingOldnoyoLengai.png' },
    { id: 'Meru', value: 'meru', image: 'climbingMeru.png' },
];

export const Logo = styled('img')({
    height: '3rem',
    width: '8rem',
})

export const NavLinks: NavLink[] = [
    {
        text: "East Africa▾",
        path: "#",
        hasDropdown: true,
        dropdownKey: 'eastAfrica'
    },
    {
        text: "Safari",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Kilimanjaro",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Climbing▾",
        path: "#",
        hasDropdown: true,
        dropdownKey: 'climbing'
    },
    {
        text: "Zanzibar",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Day Trips",
        path: "/trips",
        hasDropdown: false
    },
    {
        text: "Photographic Safari",
        path: "/trips",
        hasDropdown: false
    }
];