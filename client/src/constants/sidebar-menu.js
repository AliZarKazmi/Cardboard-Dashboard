import BankIcon from '../assets/icons/bank.svg';
import OrdersIcon from '../assets/icons/orders.svg';
import ProductIcon from '../assets/icons/products.svg';
import RollIcon from '../assets/icons/rolls.svg';
import ReelIcon from '../assets/icons/reels.svg';
import HistoryIcon from '../assets/icons/history.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: BankIcon,
        path: '/',
        title: 'Price Mangement',
    },
    {
        id: 2,
        icon: OrdersIcon,
        path: '/orders',
        title: 'Orders',
    },
    {
        id: 3,
        icon: ProductIcon,
        path: '/products',
        title: 'Products',
    },
    {
        id: 4,
        icon: RollIcon,
        path: '/roll-products',
        title: 'Rolls',
    },
    {
        id: 5,
        icon: ReelIcon,
        path: '/reel-products',
        title: 'Reels',
    }
    ,
    {
        id: 6,
        icon: HistoryIcon,
        path: '/stock-history',
        title: 'Stock History',
    }
]

export default sidebar_menu;