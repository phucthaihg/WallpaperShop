class AccountService {
    constructor() {
        this.accounts = [
            { id: 1, username: 'john_123', password: '123', email: 'john@example.com', role: 'user' },
            { id: 2, username: 'john_456', password: '456', email: 'jane@example.com', role: 'user' },
            { id: 3, username: 'admin_1234', password: '1234', email: 'admin@example.com', role: 'admin' }
        ];
        this.dashboardData = {};
    }

    getAllAccounts() {
        return this.accounts;
    }

    getAccountById(id) {
        return this.accounts.find(account => account.id === id);
    }

    getAccountByUsername(username) {
        return this.accounts.find(account => account.username === username);
    }

    createAccount(username, password, email, role = 'user') {
        const newId = Math.max(...this.accounts.map(a => a.id)) + 1;
        const newAccount = { id: newId, username, password, email, role };
        this.accounts.push(newAccount);
        return newAccount;
    }

    updateAccount(id, updates) {
        const account = this.getAccountById(id);
        if (account) {
            Object.assign(account, updates);
            return account;
        }
        return null;
    }

    deleteAccount(id) {
        const index = this.accounts.findIndex(account => account.id === id);
        if (index !== -1) {
            return this.accounts.splice(index, 1)[0];
        }
        return null;
    }

    isLoggedIn() {
        return true;
    }

    authenticate(username, password) {
        const account = this.getAccountByUsername(username);
        if (account && account.password === password) {
            return { ...account, password: undefined }; // Return account info without password
        }
        return null;
    }

    isAdmin(id) {
        const account = this.getAccountById(id);
        return account && account.role === 'admin';
    }

    generateUserDashboardData(accountId) {
        const account = this.getAccountById(accountId);
        if (!account) return null;

        const data = {
            username: account.username,
            accountStatus: "Active",
            memberSince: "January 1, 2020",
            lastLogin: "May 15, 2023, 10:30 AM",
            totalOrders: 27,
            rewardPoints: 1250,
            recentOrders: this.generateRecentOrders(),
            totalSpent: this.calculateTotalSpent(),
            savedItems: this.generateSavedItems(),
            recentlyViewedItems: this.generateRecentlyViewedItems()
        };


        this.dashboardData[accountId] = data;
        return data;
    }

    getUserDashboardData(accountId) {
        if (this.dashboardData[accountId]) {
            return this.dashboardData[accountId];
        }
        return this.generateUserDashboardData(accountId);
    }

    generateRecentOrders() {
        const orders = [];
        const statuses = ['Processing', 'Shipped', 'Delivered'];
        for (let i = 0; i < 5; i++) {
            orders.push({
                id: `ORD-${Math.floor(Math.random() * 10000)}`,
                date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                total: (Math.random() * 200 + 50)
            });
        }
        return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    calculateTotalSpent() {
        return (Math.random() * 1000 + 500);
    }

    generateSavedItems() {
        const items = [
            "Wireless Headphones",
            "Smart Watch",
            "Laptop Stand",
            "Ergonomic Mouse",
            "Portable Charger",
            "Bluetooth Speaker"
        ];
        return items.sort(() => 0.5 - Math.random()).slice(0, 4);
    }

    generateRecentlyViewedItems() {
        const items = [
            "4K Monitor",
            "Mechanical Keyboard",
            "Noise-Cancelling Earbuds",
            "Wireless Mouse",
            "USB-C Hub",
            "External SSD"
        ];
        return items.sort(() => 0.5 - Math.random()).slice(0, 5);
    }

    getAdminDashboardData() {
        return {
            totalOrders: Math.floor(Math.random() * 2000) + 1000,
            totalRevenue: (Math.random() * 100000 + 50000),
            totalUsers: this.accounts.filter(a => a.role === 'user').length,
            totalProducts: Math.floor(Math.random() * 500) + 300,
            recentOrders: this.generateAdminRecentOrders(),
            topSellingProducts: this.generateTopSellingProducts(),
            systemNotifications: this.generateSystemNotifications()
        };
    }

    generateAdminRecentOrders() {
        const orders = [];
        const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
        for (let i = 0; i < 4; i++) {
            orders.push({
                id: `${1001 + i}`,
                user: `${this.accounts[i % this.accounts.length].username}`,
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: statuses[i],
                total: (Math.random() * 200 + 50)
            });
        }
        return orders;
    }

    generateTopSellingProducts() {
        const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Beauty'];
        return categories.map((category, index) => ({
            name: `Product ${String.fromCharCode(65 + index)}`,
            category,
            sales: Math.floor(Math.random() * 200) + 100,
            revenue: (Math.random() * 10000 + 3000)
        }));
    }

    generateSystemNotifications() {
        const notifications = [
            "New user registration spike detected",
            "Server maintenance scheduled for tonight",
            "New product category added: 'Smart Home'",
            "Quarterly sales report ready for review"
        ];
        return notifications.map((message, index) => ({
            message,
            timestamp: `${index + 1} ${index === 0 ? 'hour' : 'hours'} ago`
        }));
    }
}

export default AccountService;