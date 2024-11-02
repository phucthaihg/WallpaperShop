import AccountService from './data/accountService.js';

document.addEventListener('DOMContentLoaded', function() {
    const accountService = new AccountService();
    if (accountService.isLoggedIn()) {
        if (!accountService.isAdmin(1)) {
            const data = accountService.getUserDashboardData(1);
            renderDashboard(data);
        } else {
            window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
        }
    }
});

function renderDashboard(data) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (data) {
        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title h4">Welcome, ${data.username}</h2>
                            <p class="card-text">
                                <strong>Account Status:</strong> 
                                <span class="badge bg-${data.accountStatus === 'Active' ? 'success' : 'warning'}">
                                    ${data.accountStatus}
                                </span>
                            </p>
                            <p class="card-text"><strong>Member Since:</strong> ${data.memberSince}</p>
                            <p class="card-text"><strong>Last Login:</strong> ${data.lastLogin}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h3 class="card-title h4">Account Overview</h3>
                            <div class="row">
                                <div class="col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <h5 class="card-title">Total Orders</h5>
                                            <p class="card-text display-4">${data.totalOrders}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 mb-3">
                                    <div class="card bg-light">
                                        <div class="card-body">
                                            <h5 class="card-title">Reward Points</h5>
                                            <p class="card-text display-4">${data.rewardPoints}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.recentOrders.map(order => `
                                            <tr>
                                                <td>#${order.id}</td>
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
                            <h3 class="card-title h4">Quick Actions</h3>
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-cart-plus me-2"></i>Place New Order
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-gear me-2"></i>Account Settings
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-envelope me-2"></i>Contact Support
                                </a>
                                <a href="#" class="list-group-item list-group-item-action">
                                    <i class="bi bi-heart me-2"></i>View Wishlist
                                </a>
                            </div>
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