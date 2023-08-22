import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';

// const DivContainer = styled.div`
//     height: 10%;
//     width: 100%;
//     display: flex;
//     background-color: blue;
// `;

// const HomeButton = styled(Button)`
//   && {
//     color: white;
//     height: 10%;
//     width: 10%;
//     display: flex;
//     background-color: green;
//   }
// `;
const MyAppBar = styled(AppBar)`
    && {
        position: static;
        background-color: white;
    }
`;

const MyBox = styled(Box)`
    && {
        height: 10%;
        width: 100%;
        display: flex;
        background-color: white;
        box-shadow:
            0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
`;

const MyEventNoteTwoToneIcon = styled(EventNoteTwoToneIcon)`
    && {
        height: 70%;
        width: 5%;
        font-size: large;
        display: flex;
        margin-right: 2%;
        color: black;
    }
`;

export const NavMenu = () => {
    return (
        <MyBox sx={{ flexGrow: 1 }}>
            <MyAppBar position="static">
                <Toolbar>
                    {/* <EventNoteTwoToneIcon fontSize="large" sx={{ marginRight: '2%' ,color: 'black' }} /> */}
                    <MyEventNoteTwoToneIcon></MyEventNoteTwoToneIcon>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ flexGrow: 1, color: 'black', textDecoration: 'none' }}
                    >
                        My Shopping List
                    </Typography>
                </Toolbar>
            </MyAppBar>
        </MyBox>
    );
};
