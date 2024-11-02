const adminDashboardData = {
    totalOrders: 1250,
    totalRevenue: 87500.50,
    totalUsers: 5680,
    totalProducts: 342,
    recentOrders: [
        { id: "1001", user: "John Doe", date: "May 15, 2023", status: "Shipped", total: 129.99 },
        { id: "1002", user: "Jane Smith", date: "May 14, 2023", status: "Processing", total: 79.50 },
        { id: "1003", user: "Bob Johnson", date: "May 13, 2023", status: "Delivered", total: 199.99 },
        { id: "1004", user: "Alice Brown", date: "May 12, 2023", status: "Cancelled", total: 59.99 }
    ],
    topSellingProducts: [
        { name: "Product A", category: "Electronics", sales: 250, revenue: 12500 },
        { name: "Product B", category: "Clothing", sales: 180, revenue: 5400 },
        { name: "Product C", category: "Home & Garden", sales: 150, revenue: 4500 },
        { name: "Product D", category: "Beauty", sales: 120, revenue: 3600 }
    ],
    systemNotifications: [
        { message: "New user registration spike detected", timestamp: "2 hours ago" },
        { message: "Server maintenance scheduled for tonight", timestamp: "5 hours ago" },
        { message: "New product category added: 'Smart Home'", timestamp: "1 day ago" },
        { message: "Quarterly sales report ready for review", timestamp: "2 days ago" }
    ]
};

export default adminDashboardData;