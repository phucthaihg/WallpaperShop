import AccountService from './data/accountService.js';

document.addEventListener('DOMContentLoaded', function() {
    const accountService = new AccountService();
    if (accountService.isLoggedIn()) {
        if (accountService.isAdmin(3)) {
            const data = accountService.getAdminDashboardData(1);
            renderDashboard(data);
        } //else {
            //window.location.href = 'dashboard.html'; // Redirect to user dashboard
        //}
    }
});

function renderDashboard(data) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (data) {
        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-3 mb-4">
                    <div class="card bg-primary text-white h-100">
                        <div class="card-body">
                            <h5 class="card-title">Total Orders</h5>
                            <p class="card-text display-4">${data.totalOrders}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body">
                            <h5 class="card-title">Total Revenue</h5>
                            <p class="card-text display-4">$${data.totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="card bg-info text-white h-100">
                        <div class="card-body">
                            <h5 class="card-title">Total Users</h5>
                            <p class="card-text display-4">${data.totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="card bg-warning text-dark h-100">
                        <div class="card-body">
                            <h5 class="card-title">Total Products</h5>
                            <p class="card-text display-4">${data.totalProducts}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="card-title h4">Recent Orders</h3>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>User</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.recentOrders.map(order => `
                                            <tr>
                                                <td>#${order.id}</td>
                                                <td>${order.user}</td>
                                                <td>${order.date}</td>
                                                <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
                                                <td>$${order.total.toFixed(2)}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="card-title h4">Top Selling Products</h3>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Sales</th>
                                            <th>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.topSellingProducts.map(product => `
                                            <tr>
                                                <td>${product.name}</td>
                                                <td>${product.category}</td>
                                                <td>${product.sales}</td>
                                                <td>$${product.revenue.toFixed(2)}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="card-title h4">Quick Actions</h3>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-plus-circle me-2"></i>Add New Product
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-people me-2"></i>Manage Users
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-graph-up me-2"></i>View Sales Reports
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-gear me-2"></i>System Settings
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="card-title h4">System Notifications</h3>
                            <ul class="list-group">
                                ${data.systemNotifications.map(notification => `
                                    <li class="list-group-item">
                                        <i class="bi bi-bell me-2"></i>
                                        ${notification.message}
                                        <small class="text-muted d-block">${notification.timestamp}</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        dashboardContent.innerHTML = '<p class="alert alert-danger">Dashboard data not available.</p>';
    }
}

function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'shipped': return 'primary';
        case 'delivered': return 'success';
        case 'processing': return 'warning';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}