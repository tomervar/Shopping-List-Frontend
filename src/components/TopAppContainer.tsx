import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { useAppDispatch, useAppSelector } from '../StateManagement/hooks';
import { CounterState, increment } from '../StateManagement/shoppingCartSlice';
import { CategoriesState, addCategory, addItemToCategory, cleanCategories } from '../StateManagement/categoriesSlice';
import { OrderIdState, addOrderId } from '../StateManagement/orderIdSlice';
import axios from 'axios';

const MainTopAppContainer = styled(Box)`
    && {
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10%;
        border-bottom: solid black;
        border-bottom-width: thick;
    }
`;

const TotalItemContainer = styled(Box)`
    && {
        height: 10%;
        width: 100%;
        display: flex;
        gap: 2%;
        justify-content: flex-end;
    }
`;

const FormContainer = styled(Box)`
    && {
        height: 40%;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 3%;
    }
`;

const ButtonContainer = styled(Box)`
    && {
        height: 30%;
        width: 98%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 1%;
    }
`;

const SelectCategoryContainer = styled(Box)`
    && {
        height: 100%;
        width: 25%;
        display: flex;
        align-items: center;
    }
`;

const ProductNameTextFieldContainer = styled(Box)`
    && {
        height: 100%;
        width: 25%;
        display: flex;
        align-items: center;
    }
`;

export const TopAppContainer = () => {
    const baseURLforCategories = 'https://localhost:7277/api/Categories';
    const baseURLforOrders = 'https://localhost:7277/api/Orders';
    const baseURLforItems = 'https://localhost:7277/api/Items';
    const [category, setCategory] = useState('');
    const [textValue, setTextValue] = useState('');
    const dispatch = useAppDispatch();
    const { value } = useAppSelector<CounterState>(state => state.shoppingCart);
    const { categories } = useAppSelector<CategoriesState>(state => state.categories);
    const { orderId } = useAppSelector<OrderIdState>(state => state.orderId);

    // useEffect to get all categories and update the store
    useEffect(() => {
        async function fetchDataForCategories() {
            await axios.get(baseURLforCategories).then(response => {
                dispatch(cleanCategories());
                if (categories.length === 0 && response.data.length > 0) {
                    response.data.map((i: { categoryId: string; categoryName: string; categoryImgLocation: string }) =>
                        dispatch(
                            addCategory({
                                categoryId: i.categoryId,
                                categoryName: i.categoryName,
                                categoryImgLocation: i.categoryImgLocation,
                                totalItems: 0,
                                items: [],
                            }),
                        ),
                    );
                }
            });
        }
        fetchDataForCategories();
    }, []);

    // useEffect to get new orderId and save in store
    useEffect(() => {
        async function fetchDataForOrderId() {
            await axios.post(baseURLforOrders).then(response => {
                if (orderId === '') {
                    dispatch(addOrderId(response.data.orderId));
                }
            });
        }
        fetchDataForOrderId();
    }, []);

    const handleSelectCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value);
    };

    const handleButtonClick = async () => {
        // checks inputs not empty
        if (!category || !textValue) {
            console.log('not have');
            return;
        }
        const c_id = categories.find(c => c.categoryName === category)?.categoryId;
        // http post to create new item in DB
        await axios.post(baseURLforItems, { orderId: orderId, categoryId: c_id, itemName: textValue });
        // update the store
        dispatch(addItemToCategory({ categoryName: category, itemName: textValue }));
        dispatch(increment());
    };

    return (
        <MainTopAppContainer>
            <TotalItemContainer>
                <Typography> Total Items in Cart:</Typography>
                <Badge badgeContent={value} color="success">
                    <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                </Badge>
            </TotalItemContainer>
            <FormContainer>
                <SelectCategoryContainer>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleSelectCategoryChange}
                        >
                            {categories.map(c => (
                                <MenuItem key={c.categoryId} value={c.categoryName}>
                                    {c.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </SelectCategoryContainer>
                <ProductNameTextFieldContainer>
                    <TextField
                        id="outlined-basic"
                        label="Product"
                        variant="outlined"
                        value={textValue}
                        onChange={handleTextChange}
                    />
                </ProductNameTextFieldContainer>
            </FormContainer>
            <ButtonContainer>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleButtonClick}
                >
                    Add To Cart
                </Button>
            </ButtonContainer>
        </MainTopAppContainer>
    );
};
