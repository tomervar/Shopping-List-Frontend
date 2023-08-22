import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';

const StyledCard = styled(Card)`
    width: 20%;
    transition: width 0.3s ease-in-out;

    &:hover {
        width: 30%; /* Increase card size on hover */
    }
`;

interface CategoryCardProps {
    itemCount: number;
    title: string;
    imagePath: string;
    items: Array<{ itemName: string; quantity: number }>;
}

export const CategoryCard = ({ itemCount, title, imagePath, items }: CategoryCardProps) => {
    return (
        <StyledCard>
            <CardMedia component="img" height="140" image={imagePath} alt={title} />
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {title} - {itemCount} items
                </Typography>
                <Divider />
                {items.map(i => (
                    <Typography key={i.itemName}>
                        {i.itemName} {i.quantity !== 1 && `(${i.quantity})`}
                    </Typography>
                ))}
            </CardContent>
        </StyledCard>
    );
};
