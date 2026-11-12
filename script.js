
const products = [
  {
    id: 1,
    name: "Purified Water",
    price: 50,
    stock: 150,
    desc: "Multi-stage filtered drinking water for everyday home and office use.",
    icon: "droplet"
  },
  {
    id: 2,
    name: "Mineral Water",
    price: 60,
    stock: 80,
    desc: "Clean drinking water with naturally occurring minerals.",
    icon: "water"
  },
  {
    id: 3,
    name: "Alkaline Water",
    price: 80,
    stock: 60,
    desc: "Alkaline drinking water for customers who prefer a higher-pH option.",
    icon: "droplet-half"
  }
];

const orders = [
  {
    id: "#1001",
    customer: "Riri Talenio",
    date: "2026-09-18",
    products: "2x Purified Water",
    qty: 2,
    total: 100,
    status: "Out for Delivery",
    address: "123 Sample St., Bagong Silang, Caloocan City",
    schedule: "Sep 19, 2026 • 10:00 AM - 12:00 PM",
    rider: "Carlos Dela Cruz"
  },
  {
    id: "#1002",
    customer: "Riri Talenio",
    date: "2026-09-17",
    products: "3x Mineral Water, 1x Alkaline Water",
    qty: 4,
    total: 260,
    status: "Confirmed",
    address: "123 Sample St., Bagong Silang, Caloocan City",
    schedule: "Sep 20, 2026 • 1:00 PM - 3:00 PM",
    rider: ""
  },
  {
    id: "#1003",
    customer: "Riri Talenio",
    date: "2026-09-15",
    products: "5x Purified Water",
    qty: 5,
    total: 250,
    status: "Pending",
    address: "123 Sample St., Bagong Silang, Caloocan City",
    schedule: "Sep 21, 2026 • 9:00 AM - 11:00 AM",
    rider: ""
  },
  {
    id: "#1004",
    customer: "Riri Talenio",
    date: "2026-09-10",
    products: "2x Alkaline Water",
    qty: 2,
    total: 160,
    status: "Delivered",
    address: "123 Sample St., Bagong Silang, Caloocan City",
    schedule: "Sep 11, 2026 • 2:00 PM - 4:00 PM",
    rider: "Mark Santos"
  },
  {
    id: "#2001",
    customer: "Juan Dela Cruz",
    date: "2026-09-18",
    products: "3x Mineral Water",
    qty: 3,
    total: 180,
    status: "Confirmed",
    address: "45 Narra St., Barangay 176, Caloocan City",
    schedule: "Sep 19, 2026 • 1:00 PM - 3:00 PM",
    rider: ""
  },
  {
    id: "#2002",
    customer: "Ana Reyes",
    date: "2026-09-18",
    products: "2x Alkaline Water",
    qty: 2,
    total: 160,
    status: "Preparing",
    address: "88 Sampaguita Ave., Novaliches, Quezon City",
    schedule: "Sep 19, 2026 • 3:00 PM - 5:00 PM",
    rider: ""
  },
  {
    id: "#3001",
    customer: "Riri Talenio",
    date: "2026-09-19",
    products: "2x Purified Water",
    qty: 2,
    total: 100,
    status: "Assigned",
    address: "123 Sample St., Bagong Silang, Caloocan City",
    schedule: "Sep 19, 2026 • 10:00 AM - 12:00 PM",
    rider: "Carlos Dela Cruz"
  },
  {
    id: "#3002",
    customer: "Juan Dela Cruz",
    date: "2026-09-19",
    products: "3x Mineral Water",
    qty: 3,
    total: 180,
    status: "Assigned",
    address: "45 Narra St., Barangay 176, Caloocan City",
    schedule: "Sep 19, 2026 • 1:00 PM - 3:00 PM",
    rider: "Carlos Dela Cruz"
  }
];

const riders = [
  {
    name: "Mimi M",
    phone: "0917-555-1111",
    availability: "Available",
    assigned: 4,
    status: "Available"
  },
  {
    name: "Mark Santos",
    phone: "0918-555-2222",
    availability: "Busy",
    assigned: 3,
    status: "Busy"
  },
  {
    name: "Paolo Reyes",
    phone: "0919-555-3333",
    availability: "Offline",
    assigned: 2,
    status: "Offline"
  }
];

const users = [
  {
    email: "riri.talenio@email.com",
    password: "password123",
    name: "Riri Talenio",
    role: "customer"
  },
  {
    email: "admin@aquaflow.local",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  },
  {
    email: "mimi@aquaflow.local",
    password: "rider123",
    name: "Mimi M",
    role: "rider"
  }
];

/*NAVIGATION MENUS*/

const customerMenu = [
  ["dashboard", "Dashboard", "grid"],
  ["products", "Products", "box-seam"],
  ["cart", "Cart", "cart3"],
  ["orders", "My Orders", "receipt"],
  ["tracking", "Order Tracking", "geo-alt"],
  ["addresses", "Addresses", "house"],
  ["profile", "Profile", "person"]
];

const adminMenu = [
  ["admin", "Dashboard", "grid"],
  ["admin-orders", "Orders", "receipt"],
  ["admin-products", "Products", "box-seam"],
  ["admin-customers", "Customers", "people"],
  ["admin-riders", "Riders", "bicycle"],
  ["admin-delivery", "Deliveries", "truck"],
  ["admin-reports", "Reports", "bar-chart"],
  ["admin-settings", "Settings", "gear"]
];

const riderMenu = [
  ["rider", "Dashboard", "grid"],
  ["deliveries", "Assigned Deliveries", "clipboard-check"],
  ["history", "Delivery History", "clock-history"],
  ["rider-profile", "Profile", "person"]
];


/*APPLICATION STATE*/

let cart = JSON.parse(
  localStorage.getItem("aquaflowCart") || "[]"
);

let currentUser = JSON.parse(
  localStorage.getItem("aquaflowUser") || "null"
);

let portal = currentUser
  ? currentUser.role
  : (localStorage.getItem("aquaflowPortal") || "customer");

let selectedOrderId =
  localStorage.getItem("aquaflowSelectedOrder") || "#1001";

let selectedProductQty = {};


/*HELPER FUNCTIONS*/

const money = (amount) => {
  return "₱" + Number(amount).toLocaleString("en-PH");
};

const esc = (value) => {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]
  );
};

const go = (path) => {
  location.hash = path;
};

const cartCount = () => {
  return cart.reduce((sum, item) => sum + item.qty, 0);
};

const saveCart = () => {
  localStorage.setItem(
    "aquaflowCart",
    JSON.stringify(cart)
  );
};

const initialsFor = (name) => {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

/*TOAST / NOTIFICATION */

function toast(message) {
  const toastArea = document.getElementById("toastArea");

  if (!toastArea) return;

  toastArea.innerHTML = `
    <div class="toast show shadow-sm" role="alert">
      <div class="toast-body">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        ${esc(message)}
      </div>
    </div>
  `;

  setTimeout(() => {
    toastArea.innerHTML = "";
  }, 2600);
}

/*CART FUNCTIONS
*/

function addCart(id, qty = 1) {
  const product = products.find((item) => item.id === id);

  if (!product) return;

  qty = Math.max(1, Number(qty) || 1);

  const item = cart.find((cartItem) => cartItem.id === id);

  if (item) {
    item.qty += qty;
  } else {
    cart.push({
      id,
      qty
    });
  }

  saveCart();

  toast(`${product.name} added to your cart.`);

  render();
}

function changeQty(id, difference) {
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) return;

  item.qty += difference;

  if (item.qty <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
  }

  saveCart();
  render();
}

function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);

  saveCart();
  render();
}

/*PRODUCT FUNCTIONS*/

function productVisual(product, small = false) {
  return `
    <div class="${small ? "product-mini" : "product-placeholder"}">
      <i class="bi bi-${product.icon}"></i>
    </div>
  `;
}

function changeProductQty(id, difference) {
  selectedProductQty[id] = Math.max(
    1,
    (selectedProductQty[id] || 1) + difference
  );

  const element = document.getElementById(`pq-${id}`);

  if (element) {
    element.textContent = selectedProductQty[id];
  }
}

function addProductFromPage(id) {
  addCart(
    id,
    selectedProductQty[id] || 1
  );

  selectedProductQty[id] = 1;
}

/*ORDER FUNCTIONS*/

function statusBadge(status) {
  const statusClasses = {
    Pending: "status-pending",
    Confirmed: "status-confirmed",
    Preparing: "status-preparing",
    Assigned: "status-assigned",
    "Out for Delivery": "status-out",
    Delivered: "status-delivered",
    Cancelled: "status-cancelled"
  };

  const className =
    statusClasses[status] || "badge-soft";

  return `
    <span class="badge ${className}">
      ${esc(status)}
    </span>
  `;
}

function currentOrder() {
  return (
    orders.find((order) => order.id === selectedOrderId) ||
    orders[0]
  );
}

function customerOrders() {
  return orders
    .filter((order) => order.customer === "Maria Santos")
    .slice(0, 4);
}

function selectOrder(id) {
  selectedOrderId = id;

  localStorage.setItem(
    "aquaflowSelectedOrder",
    id
  );

  go("/tracking");
}

/* PUBLIC NAVIGATION */

function publicNav() {
  return `
  <nav class="navbar navbar-expand-lg sticky-top">
  <div class="container">

  <a class="navbar-brand d-flex align-items-center gap-2 fw-bold"
  href="#/">
  <span class="brand-mark">
  <i class="bi bi-droplet-fill"></i>
  </span>
  <span class="text-primary">AquaFlow</span>
  </a>

        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#publicNav">
          <i class="bi bi-list"></i>
        </button>

        <div class="collapse navbar-collapse" id="publicNav">

          <div class="navbar-nav mx-auto gap-lg-3">
            <a class="nav-link" href="#/">Home</a>
            <a class="nav-link" href="#/products-public">Services</a>
            <a class="nav-link" href="#/about">About</a>
            <a class="nav-link" href="#/contact">Contact</a>
          </div>

          <div class="d-flex gap-2">
            <a class="btn btn-outline-primary btn-sm"
               href="#/login">
              Login
            </a>

            <a class="btn btn-primary btn-sm"
               href="#/register">
              Register
            </a>
    </div>
    </div>
    </div>
    </nav>
  `;
}

/*PUBLIC PAGES*/

function landing() {
  return `
    ${publicNav()}

  <section class="hero">
  <div class="container position-relative">
  <div class="row align-items-center g-5">

          <div class="col-lg-6">

            <span class="badge rounded-pill bg-white text-primary px-3 py-2 mb-3">
              <i class="bi bi-shield-check me-1"></i>
              Trusted local water delivery
            </span>

            <h1 class="display-4 fw-bold lh-sm">
              Convenient Water Delivery at Your Doorstep
            </h1>

            <p class="lead opacity-75 mt-3">
              Order quality drinking water for your home or office,
              choose your schedule, and keep every delivery organized
              in one place.
            </p>

            <div class="d-flex flex-wrap gap-2 mt-4">
              <a class="btn btn-light text-primary fw-semibold px-4"
                 href="#/products-public">
                Order Water Now
                <i class="bi bi-arrow-right ms-1"></i>
              </a>

              <a class="btn btn-outline-light px-4"
                 href="#/login">
                Sign In
              </a>
            </div>

            <div class="d-flex flex-wrap gap-4 mt-4 small">
              <span>
                <i class="bi bi-check2-circle me-1"></i>
                Same-day delivery
              </span>

              <span>
                <i class="bi bi-check2-circle me-1"></i>
                Easy scheduling
              </span>
            </div>

          </div>

          <div class="col-lg-6">
            <div class="hero-visual">

              <div class="hero-bubble one">
                <i class="bi bi-truck text-primary me-1"></i>
                Doorstep delivery
              </div>

              <div class="water-bottle">
                <div class="water-label">
                  AquaFlow
                  <br>
                  <small>PURE WATER</small>
                </div>
              </div>

              <div class="hero-bubble two">
                <i class="bi bi-clock text-primary me-1"></i>
                Choose your time
              </div>

    </div>
    </div>
    </div>
    </div>
    </section>

    <section class="py-5">
      <div class="container">

        <div class="section-title text-center mb-4">
          <h2 class="fw-bold">Available Water Products</h2>
          <p class="text-muted">
            Choose the water that fits your household or office needs.
          </p>
        </div>

        <div class="row g-4">

          ${products.map((product) => `
            <div class="col-md-4">

              <div class="card h-100 overflow-hidden">

                ${productVisual(product)}

                <div class="p-4">

                  <div class="d-flex justify-content-between gap-2">
                    <h5 class="mb-1">
                      ${product.name}
                    </h5>

                    <strong class="text-primary">
                      ${money(product.price)}
                    </strong>
                  </div>

                  <div class="small-muted mb-3">
                    per gallon
                  </div>

                  <p class="text-muted">
                    ${product.desc}
                  </p>

                  <a href="#/products-public"
                     class="btn btn-outline-primary btn-sm w-100">
                    View Product
                  </a>

                </div>
              </div>

            </div>
          `).join("")}

        </div>
      </div>
    </section>

    <section class="section-soft py-5">
      <div class="container">

        <div class="section-title text-center mb-5">
          <h2 class="fw-bold">How It Works</h2>
          <p class="text-muted">
            Four simple steps from order to doorstep.
          </p>
        </div>

        <div class="row g-4">

          ${[
            [
              "1",
              "Create Account",
              "Register your customer details and delivery address."
            ],
            [
              "2",
              "Choose Products",
              "Select your preferred water and quantity."
            ],
            [
              "3",
              "Schedule Delivery",
              "Choose a delivery date and available time slot."
            ],
            [
              "4",
              "Receive Your Order",
              "Follow the status and receive your water at home."
            ]
          ].map((item) => `
            <div class="col-md-3">

              <div class="card h-100 p-4 text-center">

                <div class="step-number mb-3">
                  ${item[0]}
                </div>

                <h6>${item[1]}</h6>

                <p class="small-muted mb-0">
                  ${item[2]}
                </p>

              </div>

            </div>
          `).join("")}

        </div>
      </div>
    </section>

    <section class="py-5">
      <div class="container">

        <div class="row align-items-center g-5">

          <div class="col-lg-6">

            <span class="text-primary fw-semibold">
              WHY CHOOSE AQUAFLOW
            </span>

            <h2 class="fw-bold mt-2">
              Simple ordering for everyday water needs.
            </h2>

            <p class="text-muted">
              A practical local delivery service designed around
              clear prices, flexible schedules, organized orders,
              and easy status updates.
            </p>

            ${[
              [
                "Quality-focused",
                "Products are prepared for clean and convenient everyday drinking.",
                "shield-check"
              ],
              [
                "Reliable scheduling",
                "Choose a preferred date and time before placing your order.",
                "calendar-check"
              ],
              [
                "Clear pricing",
                "See item totals and delivery fees before checkout.",
                "receipt"
              ],
              [
                "Organized delivery",
                "Customer, staff, and rider screens keep each order easy to follow.",
                "people"
              ]
            ].map((item) => `
              <div class="d-flex gap-3 mb-3">

                <div class="icon-box">
                  <i class="bi bi-${item[2]}"></i>
                </div>

                <div>
                  <b>${item[0]}</b>
                  <p class="small-muted mb-0">
                    ${item[1]}
                  </p>
                </div>

              </div>
            `).join("")}

          </div>

          <div class="col-lg-6">

            <div class="card p-4 bg-light border-0">

              <div class="d-flex justify-content-between align-items-center mb-3">
                <b>Delivery Service</b>

                <span class="badge badge-soft">
                  07:00 AM - 07:00 PM
                </span>
              </div>

              <div class="map-box">
                <i class="bi bi-geo-alt-fill map-pin"></i>
              </div>

              <p class="small-muted mt-3 mb-0">
                <i class="bi bi-info-circle me-1"></i>
                Delivery coverage and schedule are sample values
                for this college project.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>

    <section class="section-soft py-5">
      <div class="container">

        <div class="row g-4">

          <div class="col-md-4">
            <h5>Contact</h5>
            <p class="small-muted mb-1">0917-123-4567</p>
            <p class="small-muted">
              support@aquaflow.local
            </p>
          </div>

          <div class="col-md-4">
            <h5>Service Area</h5>
            <p class="small-muted">
              Selected areas in Metro Manila
            </p>
          </div>

          <div class="col-md-4">
            <h5>Business Hours</h5>
            <p class="small-muted">
              Monday - Sunday, 7:00 AM - 7:00 PM
            </p>
          </div>

        </div>
      </div>
    </section>

    <footer class="py-4">
      <div class="container d-flex flex-wrap justify-content-between gap-2 small">
        <span>© 2026 AquaFlow Water Delivery</span>
        <span>Convenient. Reliable. Fresh.</span>
      </div>
    </footer>
  `;
}

/*ABOUT PAGE*/

function aboutPage() {
  return `
    ${publicNav()}

    <div class="container py-5">

      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">

          <span class="text-primary fw-semibold">
            ABOUT AQUAFLOW
          </span>

          <h1 class="fw-bold mt-2">
            A simple local water delivery platform.
          </h1>

          <p class="text-muted lead">
            AquaFlow is a web-based water delivery booking and order management
            system. It demonstrates how customers, staff, and riders can use
            connected screens to manage a water delivery workflow.
          </p>

        </div>
      </div>

      <div class="row g-4 mt-4">

        <div class="col-md-4">
          <div class="card p-4 h-100">

            <div class="icon-box mb-3">
              <i class="bi bi-droplet"></i>
            </div>

            <h5>Customer-first</h5>

            <p class="small-muted">
              Customers can browse products, build a cart,
              schedule delivery, and review order status.
            </p>

          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-4 h-100">

            <div class="icon-box mb-3">
              <i class="bi bi-speedometer2"></i>
            </div>

            <h5>Organized operations</h5>

            <p class="small-muted">
              Staff can review orders, manage products,
              assign riders, and view reports.
            </p>

          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-4 h-100">

            <div class="icon-box mb-3">
              <i class="bi bi-bicycle"></i>
            </div>

            <h5>Rider workflow</h5>

            <p class="small-muted">
              Riders can see assigned deliveries and update
              delivery progress.
            </p>

          </div>
        </div>

      </div>
    </div>
  `;
}

/*CONTACT PAGE*/

function contactPage() {
  return `
    ${publicNav()}

    <div class="container py-5">

      <div class="row g-4 justify-content-center">

        <div class="col-lg-5">

          <span class="text-primary fw-semibold">
            CONTACT US
          </span>

          <h1 class="fw-bold mt-2">
            Need help with your water order?
          </h1>

          <p class="text-muted">
            Use the sample contact details below for the prototype.
          </p>

          <div class="card p-4 mt-4">

            <p>
              <i class="bi bi-telephone text-primary me-2"></i>
              0917-123-4567
            </p>

            <p>
              <i class="bi bi-envelope text-primary me-2"></i>
              support@aquaflow.local
            </p>

            <p class="mb-0">
              <i class="bi bi-geo-alt text-primary me-2"></i>
              Metro Manila service area
            </p>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h5>Send a Message</h5>

            <input
              class="form-control mb-3"
              placeholder="Your name"
            >

            <input
              class="form-control mb-3"
              placeholder="Email address"
            >

            <textarea
              class="form-control mb-3"
              rows="5"
              placeholder="How can we help?"
            ></textarea>

            <button
              class="btn btn-primary w-100"
              onclick="toast('Message submitted for demo purposes.')">
              Send Message
            </button>

          </div>

        </div>

      </div>
    </div>
  `;
}

/*  PUBLIC PRODUCTS*/

function publicProducts() {
  return `
    ${publicNav()}

    <div class="container py-5">

      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <span class="text-primary fw-semibold">
            OUR SERVICES
          </span>

          <h2 class="fw-bold mt-1">
            Water Products
          </h2>

          <p class="text-muted mb-0">
            Sample products and prices for the AquaFlow prototype.
          </p>
        </div>

        <a href="#/login" class="btn btn-primary">
          Order as Customer
        </a>

      </div>

      <div class="row g-4">

        ${products.map((product) => `
          <div class="col-md-4">

            <div class="card overflow-hidden h-100">

              ${productVisual(product)}

              <div class="p-4">

                <h5>${product.name}</h5>

                <p class="small-muted">
                  ${product.desc}
                </p>

                <div class="d-flex justify-content-between align-items-center">

                  <strong class="text-primary fs-5">
                    ${money(product.price)}
                  </strong>

                  <span class="small-muted">
                    ${product.stock} available
                  </span>

                </div>

              </div>

            </div>

          </div>
        `).join("")}

      </div>
    </div>
  `;
}

/* LOGIN / REGISTER*/

function authCard(mode) {
  const isRegister = mode === "register";

  return `
    <div class="auth-page">

      <div class="auth-card">

        <div class="text-center mb-4">

          <span class="brand-mark">
            <i class="bi bi-droplet-fill"></i>
          </span>

          <h3 class="fw-bold mt-3 mb-1">
            ${isRegister ? "Create your account" : "Welcome back"}
          </h3>

          <p class="small-muted">
            ${
              isRegister
                ? "Set up your AquaFlow account."
                : "Sign in to continue to AquaFlow."
            }
          </p>

        </div>

        ${
          isRegister
            ? `
              <div class="row g-3">

                <div class="col-md-6">
                  <label class="form-label">Full Name</label>
                  <input
                    id="regName"
                    class="form-control"
                    placeholder="Maria Santos"
                  >
                </div>

                <div class="col-md-6">
                  <label class="form-label">Contact Number</label>
                  <input
                    id="regContact"
                    class="form-control"
                    placeholder="0917-123-4567"
                  >
                </div>

                <div class="col-12">
                  <label class="form-label">Email Address</label>
                  <input
                    id="regEmail"
                    type="email"
                    class="form-control"
                    placeholder="maria.santos@email.com"
                  >
                </div>

                <div class="col-12">
                  <label class="form-label">Delivery Address</label>
                  <input
                    id="regAddress"
                    class="form-control"
                    placeholder="123 Sample St., Bagong Silang, Caloocan City"
                  >
                </div>

                <div class="col-md-6">
                  <label class="form-label">Password</label>
                  <input
                    id="regPass"
                    type="password"
                    class="form-control"
                    placeholder="Minimum 8 characters"
                  >
                </div>

                <div class="col-md-6">
                  <label class="form-label">Confirm Password</label>
                  <input
                    id="regConfirm"
                    type="password"
                    class="form-control"
                  >
                </div>

              </div>

              <button
                class="btn btn-primary w-100 mt-4"
                onclick="registerSubmit()">
                Create Account
              </button>

              <p class="text-center small mt-3 mb-0">
                Already have an account?
                <a href="#/login">Back to Login</a>
              </p>
            `
            : `
              <label class="form-label">
                Email / Username
              </label>

              <input
                id="loginEmail"
                class="form-control mb-3"
                placeholder="you@example.com"
              >

              <label class="form-label">
                Password
              </label>

              <input
                id="loginPassword"
                type="password"
                class="form-control mb-2"
                placeholder="*******"
              >

              <div class="d-flex justify-content-between align-items-center small mb-4">

                <label>
                  <input
                    type="checkbox"
                    class="form-check-input me-1"
                  >
                  Remember me
                </label>

                <a
                  href="#"
                  onclick="event.preventDefault();toast('Password reset is a demo feature.')">
                  Forgot Password?
                </a>

              </div>

              <button
                class="btn btn-primary w-100"
                onclick="loginSubmit()">
                Sign In
              </button>

              <p class="text-center small mt-3 mb-0">
                Don't have an account?
                <a href="#/register">Register here</a>
              </p>
            `
        }

      </div>
    </div>
  `;
}

function login() {
  return authCard("login");
}

function register() {
  return authCard("register");
}

/*LOGIN / REGISTRATION LOGIC*/

function loginSubmit() {
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (!email || !password) {
    toast("Please enter your email and password.");
    return;
  }

  const user = users.find(
    (account) => account.email.toLowerCase() === email
  );

  if (!user || user.password !== password) {
    toast("Incorrect email or password.");
    return;
  }

  currentUser = user;
  portal = user.role;

  localStorage.setItem(
    "aquaflowUser",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "aquaflowPortal",
    user.role
  );

  toast(`Welcome back, ${user.name}!`);

  if (portal === "admin") {
    go("/admin");
  } else if (portal === "rider") {
    go("/rider");
  } else {
    go("/dashboard");
  }
}

function registerSubmit() {
  const name =
    document.getElementById("regName").value.trim();

  const email =
    document.getElementById("regEmail").value.trim();

  const password =
    document.getElementById("regPass").value;

  const confirmPassword =
    document.getElementById("regConfirm").value;

  if (
    !name ||
    !email ||
    password.length < 8 ||
    password !== confirmPassword
  ) {
    toast(
      "Please complete the form and make sure both passwords match."
    );
    return;
  }

  const existingUser = users.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    toast("An account with this email already exists.");
    return;
  }

  users.push({
    email,
    password,
    name,
    role: "customer"
  });

  toast("Account created successfully. Please sign in.");

  go("/login");
}

/* APPLICATION SHELL*/

function shell(menu, title, body) {
  const name = currentUser
    ? currentUser.name
    : portal === "rider"
      ? "Carlos Dela Cruz"
      : portal === "admin"
        ? "Admin User"
        : "Maria Santos";

  const initials =
    initialsFor(name) || "U";

  const portalLabel =
    portal === "admin"
      ? "Staff / Admin"
      : portal.charAt(0).toUpperCase() + portal.slice(1);

  return `
    <div class="app-shell">

      <aside class="sidebar">

        <div class="sidebar-brand d-flex align-items-center gap-2">

          <span class="brand-mark">
            <i class="bi bi-droplet-fill"></i>
          </span>

          <div>
            <b>AquaFlow</b>

            <div style="font-size:10px;color:#c9d8ff">
              ${portalLabel} Portal
            </div>
          </div>

        </div>

        <nav class="nav flex-column">

          ${menu.map((item) => `
            <a
              class="nav-link ${
                location.hash.slice(2) === item[0]
                  ? "active"
                  : ""
              }"
              href="#/${item[0]}">

              <i class="bi bi-${item[2]} me-2"></i>

              ${item[1]}

              ${
                item[0] === "cart" && cartCount()
                  ? `
                    <span class="badge bg-light text-primary float-end">
                      ${cartCount()}
                    </span>
                  `
                  : ""
              }

            </a>
          `).join("")}

        </nav>

        <div class="bottom-user">

          <div class="d-flex align-items-center gap-2">

            <span class="profile-avatar">
              ${initials}
            </span>

            <div>
              <b style="font-size:12px">
                ${esc(name)}
              </b>

              <div style="font-size:10px;color:#c9d8ff">
                ${portalLabel}
              </div>
            </div>

          </div>

          <a
            class="text-white small d-block mt-3"
            href="#/login"
            onclick="logout()">

            <i class="bi bi-box-arrow-left me-2"></i>
            Logout

          </a>

        </div>

      </aside>

      <main class="main">

        <header class="topbar">

          <div class="d-flex align-items-center gap-2">

            <button class="btn btn-light mobile-menu">
              <i class="bi bi-list"></i>
            </button>

            <span class="small-muted">
              AquaFlow
              <span class="mx-1">›</span>
              <b>${title}</b>
            </span>

          </div>

          <div class="d-flex align-items-center gap-2">

            <span class="profile-avatar">
              ${initials}
            </span>

            <span class="small">
              ${esc(name)}
            </span>

          </div>

        </header>

        <div class="content">
          ${body}
        </div>

      </main>

    </div>
  `;
}

/*LOGOUT */

function logout() {
  currentUser = null;

  localStorage.removeItem("aquaflowUser");
  localStorage.removeItem("aquaflowPortal");
}

/*CUSTOMER DASHBOARD*/

function customerDashboard() {
  const customerOrderList = customerOrders();

  return shell(
    customerMenu,
    "Dashboard",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 class="fw-bold mb-1">
            Welcome!
          </h4>

          <div class="small-muted">
            Here's what's happening with your water orders.
          </div>
        </div>

        <a
          class="btn btn-primary btn-sm"
          href="#/products">

          <i class="bi bi-plus-lg me-1"></i>
          Quick Order

        </a>

      </div>

      <div class="row g-3 mb-4">

        ${[
          ["2", "Active Orders", "clock"],
          ["12", "Completed Orders", "check-circle"],
          ["1", "Pending Orders", "clock-history"],
          ["15", "Total Orders", "box"]
        ].map((item) => `
          <div class="col-6 col-lg-3">

            <div class="card stat-card">

              <div class="stat-icon">
                <i class="bi bi-${item[2]}"></i>
              </div>

              <h3 class="mt-3 mb-0">
                ${item[0]}
              </h3>

              <span class="small-muted">
                ${item[1]}
              </span>

            </div>

          </div>
        `).join("")}

      </div>

      <div class="row g-3">

        <div class="col-lg-8">

          <div class="card p-4">

            <div class="d-flex justify-content-between">
              <h6 class="fw-bold">
                Current Order
              </h6>

              <a href="#/tracking">
                View tracking
              </a>
            </div>

            <div class="order-panel mt-3">

              <div class="d-flex justify-content-between align-items-center">

                <b>${orders[0].id}</b>

                ${statusBadge(orders[0].status)}

              </div>

              <div class="small-muted mt-1">
                ${orders[0].schedule}
              </div>

              <div class="mt-2">
                ${orders[0].products}
              </div>

              <strong class="d-block mt-2">
                ${money(orders[0].total)}
              </strong>

              <div class="text-end mt-2">

                <button
                  class="btn btn-primary btn-sm"
                  onclick="selectOrder('${orders[0].id}')">

                  Track Order

                </button>

              </div>

            </div>

            <div class="mt-3 p-3 bg-light rounded-3">

              <span class="profile-avatar me-2">
                CD
              </span>

              <small>
                Your Rider
                <br>
                <b>Carlos Dela Cruz</b>
              </small>

            </div>

          </div>

        </div>

        <div class="col-lg-4">

          <div class="card p-4">

            <div class="d-flex justify-content-between">

              <h6 class="fw-bold">
                Available Products
              </h6>

              <a href="#/products">
                View all
              </a>

            </div>

            ${products.map((product) => `
              <div class="d-flex align-items-center gap-2 mt-3">

                ${productVisual(product, true)}

                <div class="flex-grow-1 small">

                  <b>${product.name}</b>

                  <div class="small-muted">
                    ${money(product.price)}/gal
                  </div>

                </div>

                <button
                  class="btn btn-outline-primary btn-sm"
                  onclick="addCart(${product.id})">

                  Add

                </button>

              </div>
            `).join("")}

          </div>

        </div>

      </div>

      <div class="card table-card mt-3">

        <div class="p-4 d-flex justify-content-between">

          <h6 class="fw-bold mb-0">
            Recent Orders
          </h6>

          <a href="#/orders">
            View all
          </a>

        </div>

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              ${customerOrderList.map((order) => `
                <tr>

                  <td>
                    <b>${order.id}</b>
                  </td>

                  <td>${order.date}</td>

                  <td>${order.products}</td>

                  <td>${money(order.total)}</td>

                  <td>
                    ${statusBadge(order.status)}
                  </td>

                  <td>

                    <button
                      class="btn btn-sm btn-link"
                      onclick="selectOrder('${order.id}')">

                      View

                    </button>

                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}

/* CUSTOMER PRODUCT*/

function productsPage() {
  return shell(
    customerMenu,
    "Products",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 class="fw-bold mb-1">
            Water Products
          </h4>

          <div class="small-muted">
            Choose a product, quantity, and add it to your cart.
          </div>
        </div>

        <a
          class="btn btn-outline-primary btn-sm"
          href="#/cart">

          <i class="bi bi-cart3 me-1"></i>
          Cart (${cartCount()})

        </a>

      </div>

      <div class="row g-4">

        ${products.map((product) => `
          <div class="col-md-4">

            <div class="card h-100 overflow-hidden">

              ${productVisual(product)}

              <div class="p-4">

                <div class="d-flex justify-content-between">

                  <h5>${product.name}</h5>

                  <strong class="text-primary">
                    ${money(product.price)}
                  </strong>

                </div>

                <div class="small-muted">
                  per gallon • ${product.stock} available
                </div>

                <p class="text-muted mt-3">
                  ${product.desc}
                </p>

                <div class="d-flex align-items-center justify-content-between mt-4">

                  <span class="small-muted">
                    Quantity
                  </span>

                  <div class="quantity">

                    <button
                      onclick="changeProductQty(${product.id}, -1)">
                      −
                    </button>

                    <span id="pq-${product.id}">
                      ${selectedProductQty[product.id] || 1}
                    </span>

                    <button
                      onclick="changeProductQty(${product.id}, 1)">
                      +
                    </button>

                  </div>

                </div>

                <button
                  class="btn btn-primary w-100 mt-3"
                  onclick="addProductFromPage(${product.id})">

                  Add to Cart

                </button>

              </div>

            </div>

          </div>
        `).join("")}

      </div>
    `
  );
}


/*CART PAGE*/

function cartPage() {
  const subtotal = cart.reduce(
    (sum, item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      return sum + (product?.price || 0) * item.qty;
    },
    0
  );

  const fee =
    subtotal >= 200 || subtotal === 0
      ? 0
      : 40;

  const total = subtotal + fee;

  return shell(
    customerMenu,
    "Cart",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 class="fw-bold mb-1">
            Shopping Cart
          </h4>

          <div class="small-muted">
            ${cartCount()} item(s) selected for delivery.
          </div>
        </div>

        <a
          href="#/products"
          class="btn btn-outline-primary btn-sm">

          Continue Shopping

        </a>

      </div>

      ${
        cart.length
          ? `
            <div class="row g-4">

              <div class="col-lg-8">

                <div class="card p-4">

                  ${cart.map((item) => {

                    const product = products.find(
                      (p) => p.id === item.id
                    );

                    return `
                      <div class="d-flex align-items-center gap-3 border-bottom py-3">

                        <div style="width:72px">
                          ${productVisual(product, true)}
                        </div>

                        <div class="flex-grow-1">

                          <b>${product.name}</b>

                          <div class="small-muted">
                            ${money(product.price)} per gallon
                          </div>

                        </div>

                        <div class="quantity">

                          <button
                            onclick="changeQty(${product.id}, -1)">
                            −
                          </button>

                          <span>${item.qty}</span>

                          <button
                            onclick="changeQty(${product.id}, 1)">
                            +
                          </button>

                        </div>

                        <strong
                          style="min-width:80px;text-align:right">

                          ${money(product.price * item.qty)}

                        </strong>

                        <button
                          class="btn btn-sm btn-light text-danger"
                          onclick="removeCart(${product.id})">

                          <i class="bi bi-trash"></i>

                        </button>

                      </div>
                    `;
                  }).join("")}

                </div>

              </div>

              <div class="col-lg-4">

                <div class="card p-4">

                  <h6 class="fw-bold">
                    Order Summary
                  </h6>

                  <div class="d-flex justify-content-between mt-3">
                    <span>Subtotal</span>
                    <span>${money(subtotal)}</span>
                  </div>

                  <div class="d-flex justify-content-between mt-2">
                    <span>Delivery Fee</span>
                    <span>${fee ? money(fee) : "Free"}</span>
                  </div>

                  <hr>

                  <div class="d-flex justify-content-between">

                    <b>Total</b>

                    <b class="text-primary fs-5">
                      ${money(total)}
                    </b>

                  </div>

                  <button
                    class="btn btn-primary w-100 mt-3"
                    onclick="go('/checkout')">

                    Proceed to Checkout

                  </button>

                  <div class="small-muted mt-2 text-center">
                    Free delivery for orders of ₱200 or more.
                  </div>

                </div>

              </div>

            </div>
          `
          : `
            <div class="card empty-state text-center">

              <i class="bi bi-cart3 text-primary display-5"></i>

              <h5 class="mt-3">
                Your cart is empty
              </h5>

              <p class="small-muted">
                Browse our water products and add items
                to start an order.
              </p>

              <a
                href="#/products"
                class="btn btn-primary btn-sm">

                Browse Products

              </a>

            </div>
          `
      }
    `
  );
}


/* CHECKOUT*/

function checkoutPage() {
  if (!cart.length) {
    go("/products");
    return "";
  }

  const subtotal = cart.reduce(
    (sum, item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      return sum + (product?.price || 0) * item.qty;
    },
    0
  );

  const fee = subtotal >= 200 ? 0 : 40;

  return shell(
    customerMenu,
    "Checkout",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Checkout
        </h4>

        <div class="small-muted">
          Review your information and schedule your delivery.
        </div>

      </div>

      <div class="row g-4">

        <div class="col-lg-7">

          <div class="card p-4 mb-3">

            <h6 class="fw-bold">
              Customer Information
            </h6>

            <div class="row g-3 mt-1">

              <div class="col-md-6">

                <label class="form-label">
                  Name
                </label>

                <input
                  id="coName"
                  class="form-control"
                  value="Maria Santos">

              </div>

              <div class="col-md-6">

                <label class="form-label">
                  Contact Number
                </label>

                <input
                  id="coContact"
                  class="form-control"
                  value="0917-123-4567">

              </div>

            </div>

          </div>

          <div class="card p-4 mb-3">

            <h6 class="fw-bold">
              Delivery Information
            </h6>

            <label class="form-label mt-2">
              Delivery Address
            </label>

            <input
              id="coAddress"
              class="form-control"
              value="123 Sample St., Barangay Bagong Silang, Caloocan City">

            <div class="row g-3 mt-1">

              <div class="col-md-6">

                <label class="form-label">
                  Preferred Delivery Date
                </label>

                <input
                  id="coDate"
                  type="date"
                  class="form-control"
                  value="2026-09-20">

              </div>

              <div class="col-md-6">

                <label class="form-label">
                  Preferred Delivery Time
                </label>

                <select
                  id="coTime"
                  class="form-select">

                  <option>
                    9:00 AM - 11:00 AM
                  </option>

                  <option selected>
                    10:00 AM - 12:00 PM
                  </option>

                  <option>
                    1:00 PM - 3:00 PM
                  </option>

                  <option>
                    3:00 PM - 5:00 PM
                  </option>

                </select>

              </div>

            </div>

            <div class="map-box mt-3">

              <span class="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm">
                Delivery location preview
              </span>

              <i class="bi bi-geo-alt-fill map-pin"></i>

            </div>

            <div class="small-muted mt-2">
              <i class="bi bi-info-circle me-1"></i>
              Prototype map only. No real-time GPS tracking is used.
            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <div
            class="card p-4 sticky-lg-top"
            style="top:90px">

            <h6 class="fw-bold">
              Order Summary
            </h6>

            ${cart.map((item) => {

              const product = products.find(
                (p) => p.id === item.id
              );

              return `
                <div class="d-flex justify-content-between mt-3">

                  <span>
                    ${item.qty}x ${product.name}
                  </span>

                  <b>
                    ${money(product.price * item.qty)}
                  </b>

                </div>
              `;
            }).join("")}

            <hr>

            <div class="d-flex justify-content-between">
              <span>Delivery Fee</span>
              <span>
                ${fee ? money(fee) : "Free"}
              </span>
            </div>

            <div class="d-flex justify-content-between mt-2">

              <b>Total</b>

              <b class="text-primary fs-5">
                ${money(subtotal + fee)}
              </b>

            </div>

            <button
              class="btn btn-primary w-100 mt-4"
              onclick="placeOrder()">

              Place Order

            </button>

          </div>

        </div>

      </div>
    `
  );
}

/*PLACE ORDER*/

function placeOrder() {
  const name =
    document.getElementById("coName").value.trim();

  const address =
    document.getElementById("coAddress").value.trim();

  const date =
    document.getElementById("coDate").value;

  const time =
    document.getElementById("coTime").value;

  if (!name || !address || !date) {
    toast("Please complete the delivery information.");
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      return sum + (product?.price || 0) * item.qty;
    },
    0
  );

  const fee = subtotal >= 200 ? 0 : 40;

  const newId =
    "#" + (3100 + Math.floor(Math.random() * 700));

  const summary = cart
    .map((item) => {
      const product = products.find(
        (p) => p.id === item.id
      );

      return `${item.qty}x ${product.name}`;
    })
    .join(", ");

  orders.unshift({
    id: newId,
    customer: name,
    date: new Date().toISOString().slice(0, 10),
    products: summary,
    qty: cartCount(),
    total: subtotal + fee,
    status: "Pending",
    address,
    schedule: `${date} • ${time}`,
    rider: ""
  });

  selectedOrderId = newId;

  localStorage.setItem(
    "aquaflowSelectedOrder",
    newId
  );

  cart = [];

  saveCart();

  go("/confirmation");
}

/* CONFIRMATION PAGE*/

function confirmationPage() {
  const order = currentOrder();

  return shell(
    customerMenu,
    "Order Confirmation",
    `
      <div
        class="card p-5 text-center mx-auto"
        style="max-width:720px">

        <div
          class="icon-box mx-auto"
          style="width:64px;height:64px;border-radius:50%;font-size:28px">

          <i class="bi bi-check-lg"></i>

        </div>

        <h3 class="fw-bold mt-4">
          Order Successfully Placed!
        </h3>

        <p class="text-muted">
          Your water delivery request has been recorded.
        </p>

        <div class="row text-start g-3 mt-4">

          <div class="col-md-6">
            <div class="small-muted">
              Order Number
            </div>
            <b>${order.id}</b>
          </div>

          <div class="col-md-6">
            <div class="small-muted">
              Total Amount
            </div>
            <b class="text-primary">
              ${money(order.total)}
            </b>
          </div>

          <div class="col-12">
            <div class="small-muted">
              Ordered Products
            </div>
            <b>${order.products}</b>
          </div>

          <div class="col-12">
            <div class="small-muted">
              Delivery Address
            </div>
            <span>${order.address}</span>
          </div>

          <div class="col-12">
            <div class="small-muted">
              Delivery Schedule
            </div>
            <span>${order.schedule}</span>
          </div>

        </div>

        <div class="d-flex justify-content-center flex-wrap gap-2 mt-4">

          <button
            class="btn btn-primary"
            onclick="selectOrder('${order.id}')">

            Track Order

          </button>

          <a
            class="btn btn-outline-primary"
            href="#/dashboard">

            Back to Dashboard

          </a>

        </div>

      </div>
    `
  );
}

/*CUSTOMER ORDERS*/

function ordersPage() {
  const statuses = [
    "All",
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ];

  return shell(
    customerMenu,
    "My Orders",
    `
      <div class="mb-3">

        <h4 class="fw-bold mb-1">
          My Orders
        </h4>

        <div class="small-muted">
          Review your order history and current delivery status.
        </div>

      </div>

      <div class="filter-tabs mb-3">

        ${statuses.map((status, index) => `
          <button
            class="btn btn-sm ${
              index === 0
                ? "btn-primary"
                : "btn-outline-primary"
            }"
            onclick="filterCustomerOrders('${status}', this)">

            ${status}

          </button>
        `).join("")}

      </div>

      <div id="customerOrderTable">
        ${customerOrderTable("All")}
      </div>
    `
  );
}

function customerOrderTable(filter) {
  const list = customerOrders().filter(
    (order) =>
      filter === "All" ||
      order.status === filter
  );

  return `
    <div class="card table-card">

      <div class="table-responsive">

        <table class="table mb-0">

          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            ${
              list.length
                ? list.map((order) => `
                    <tr>

                      <td>
                        <b>${order.id}</b>
                      </td>

                      <td>${order.date}</td>

                      <td>${order.products}</td>

                      <td>${money(order.total)}</td>

                      <td>
                        ${statusBadge(order.status)}
                      </td>

                      <td>

                        <button
                          class="btn btn-sm btn-link"
                          onclick="selectOrder('${order.id}')">

                          View Details

                        </button>

                      </td>

                    </tr>
                  `).join("")
                : `
                    <tr>

                      <td
                        colspan="6"
                        class="text-center py-5 text-muted">

                        No orders found for this status.

                      </td>

                    </tr>
                  `
            }

          </tbody>

        </table>

      </div>

    </div>
  `;
}

function filterCustomerOrders(filter, button) {
  document
    .querySelectorAll(".filter-tabs .btn")
    .forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-primary");
    });

  button.classList.add("btn-primary");
  button.classList.remove("btn-outline-primary");

  document.getElementById(
    "customerOrderTable"
  ).innerHTML = customerOrderTable(filter);
}


/*TRACKING*/

function trackingPage() {
  const order = currentOrder();

  const steps = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Assigned",
    "Out for Delivery",
    "Delivered"
  ];

  const currentIndex =
    steps.indexOf(order.status);

  return shell(
    customerMenu,
    "Order Tracking",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 class="fw-bold mb-1">
            Order Tracking
          </h4>

          <div class="small-muted">
            Tracking for ${order.id}
          </div>
        </div>

        ${statusBadge(order.status)}

      </div>

      <div class="card p-4 mb-3">

        <div class="progress-track">

          ${steps.map((step, index) => `
            <div
              class="
                progress-step
                ${index <= currentIndex ? "done" : ""}
                ${index === currentIndex ? "current" : ""}
              ">

              <div class="progress-dot">
                ${
                  index < currentIndex
                    ? "✓"
                    : index === currentIndex
                      ? "•"
                      : index + 1
                }
              </div>

              <div class="progress-label">
                ${step}
              </div>

            </div>
          `).join("")}

        </div>

      </div>

      <div class="row g-4">

        <div class="col-lg-7">

          <div class="card p-4">

            <h6 class="fw-bold">
              Delivery Location
            </h6>

            <div class="map-box mt-3">

              <span
                class="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm">

                ${order.address}

              </span>

              <i class="bi bi-geo-alt-fill map-pin"></i>

            </div>

            <div class="small-muted mt-2">
              <i class="bi bi-info-circle me-1"></i>
              Location preview only. AquaFlow does not provide
              live GPS tracking in this prototype.
            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h6 class="fw-bold">
              Order Information
            </h6>

            <div class="small-muted mt-3">
              Products
            </div>

            <b>${order.products}</b>

            <div class="small-muted mt-3">
              Delivery Schedule
            </div>

            <span>${order.schedule}</span>

            <div class="small-muted mt-3">
              Delivery Address
            </div>

            <span>${order.address}</span>

            <div class="small-muted mt-3">
              Rider
            </div>

            <span>
              ${order.rider || "Not yet assigned"}
            </span>

          </div>

        </div>

      </div>
    `
  );
}


/*ADDRESSES*/

function addressesPage() {
  return shell(
    customerMenu,
    "Addresses",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h4 class="fw-bold mb-1">
            Delivery Addresses
          </h4>

          <div class="small-muted">
            Manage saved locations for your orders.
          </div>
        </div>

        <button
          class="btn btn-primary btn-sm"
          onclick="addressModal()">

          <i class="bi bi-plus-lg me-1"></i>
          Add Address

        </button>

      </div>

      <div class="row g-3">

        <div class="col-md-6">

          <div class="card p-4 h-100">

            <div class="d-flex justify-content-between">

              <h6>
                <i class="bi bi-house text-primary me-2"></i>
                Home
              </h6>

              <span class="badge badge-soft">
                Default
              </span>

            </div>

            <p class="text-muted mt-2">
              123 Sample St., Barangay Bagong Silang,
              Caloocan City
            </p>

            <div class="d-flex gap-2">

              <button
                class="btn btn-outline-primary btn-sm"
                onclick="addressModal('Home')">

                Edit

              </button>

              <button
                class="btn btn-outline-danger btn-sm"
                onclick="toast('Default address cannot be deleted in this demo.')">

                Delete

              </button>

            </div>

          </div>

        </div>

        <div class="col-md-6">

          <div class="card p-4 h-100">

            <h6>
              <i class="bi bi-building text-primary me-2"></i>
              Office
            </h6>

            <p class="text-muted mt-2">
              2nd Floor, Emerald Building,
              Ortigas Center, Pasig City
            </p>

            <div class="d-flex gap-2">

              <button
                class="btn btn-outline-primary btn-sm"
                onclick="addressModal('Office')">

                Edit

              </button>

              <button
                class="btn btn-outline-danger btn-sm"
                onclick="toast('Office address deleted for demo.')">

                Delete

              </button>

              <button
                class="btn btn-light btn-sm"
                onclick="toast('Office set as default for demo.')">

                Set Default

              </button>

            </div>

          </div>

        </div>

      </div>
    `
  );
}

function addressModal(label = "") {
  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        ${label ? "Edit" : "Add"} Address
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <label class="form-label">
        Address Label
      </label>

      <input
        class="form-control mb-3"
        value="${label || "Home"}">

      <label class="form-label">
        Complete Address
      </label>

      <textarea
        class="form-control"
        rows="4"
        placeholder="House/Unit, Street, Barangay, City">
      </textarea>

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="closeModal();toast('Address saved successfully.')">

        Save Address

      </button>

    </div>
  `);
}


/*CUSTOMER PROFILE*/

function profilePage() {
  return shell(
    customerMenu,
    "Profile",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          My Profile
        </h4>

        <div class="small-muted">
          Manage your account information.
        </div>

      </div>

      <div
        class="card p-4"
        style="max-width:760px">

        <div class="d-flex align-items-center gap-3 mb-4">

          <span class="profile-avatar avatar-lg">
            MS
          </span>

          <div>

            <h5 class="mb-1">
              Riri Talenoi
            </h5>

            <div class="small-muted">
              Customer Account
            </div>

          </div>

          <button
            class="btn btn-outline-primary btn-sm ms-auto"
            onclick="toast('Profile picture upload is a demo feature.')">

            Change Photo

          </button>

        </div>

        <div class="row g-3">

          <div class="col-md-6">

            <label class="form-label">
              Full Name
            </label>

            <input
              class="form-control"
              value="Riri Talenio">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Email
            </label>

            <input
              class="form-control"
              value="riri.talenio@email.com">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Contact Number
            </label>

            <input
              class="form-control"
              value="0917-123-4567">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Default Address
            </label>

            <input
              class="form-control"
              value="Caloocan City">

          </div>

        </div>

        <div class="d-flex gap-2 mt-4">

          <button
            class="btn btn-primary"
            onclick="toast('Profile changes saved.')">

            Edit Profile

          </button>

          <button
            class="btn btn-outline-primary"
            onclick="passwordModal()">

            Change Password

          </button>

        </div>

      </div>
    `
  );
}

function passwordModal() {
  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        Change Password
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <input
        type="password"
        class="form-control mb-3"
        placeholder="Current password">

      <input
        type="password"
        class="form-control mb-3"
        placeholder="New password">

      <input
        type="password"
        class="form-control"
        placeholder="Confirm new password">

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="closeModal();toast('Password updated for demo purposes.')">

        Update Password

      </button>

    </div>
  `);
}

/* ADMIN DASHBOARD*/

function adminDashboard() {
  return shell(
    adminMenu,
    "Dashboard",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Admin Dashboard
        </h4>

        <div class="small-muted">
          Overview of AquaFlow operations.
        </div>

      </div>

      <div class="row g-3">

        ${[
          ["156", "Total Orders", "receipt"],
          ["12", "Pending Orders", "clock"],
          ["6", "Out for Delivery", "truck"],
          ["138", "Completed Orders", "check-circle"],
          ["₱72,450", "Total Sales", "cash-stack"],
          ["6", "Available Riders", "bicycle"]
        ].map((item) => `
          <div class="col-6 col-lg-2">

            <div class="card stat-card">

              <div class="stat-icon">
                <i class="bi bi-${item[2]}"></i>
              </div>

              <h5 class="mt-3 mb-1">
                ${item[0]}
              </h5>

              <span class="small-muted">
                ${item[1]}
              </span>

            </div>

          </div>
        `).join("")}

      </div>

      <div class="row g-3 mt-1">

        <div class="col-lg-7">

          <div class="card p-4">

            <div class="d-flex justify-content-between">

              <h6 class="fw-bold">
                Order Status
              </h6>

              <span class="small-muted">
                September 2026
              </span>

            </div>

            <div class="chart-box mt-3">

              ${[42,65,55,78,62,92,70].map((height, index) => `
                <div class="chart-col">

                  <div
                    class="bar"
                    style="height:${height}%">
                  </div>

                  <small class="text-muted">
                    ${["M","T","W","T","F","S","S"][index]}
                  </small>

                </div>
              `).join("")}

            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h6 class="fw-bold">
              Most Ordered Products
            </h6>

            ${[
              ["Purified Water", "62 orders"],
              ["Mineral Water", "44 orders"],
              ["Alkaline Water", "28 orders"]
            ].map((item, index) => `
              <div class="d-flex justify-content-between py-3 border-bottom">

                <span>
                  <span class="badge badge-soft me-2">
                    ${index + 1}
                  </span>

                  ${item[0]}
                </span>

                <b>${item[1]}</b>

              </div>
            `).join("")}

          </div>

        </div>

      </div>

      <div class="card table-card mt-3">

        <div class="p-4">
          <h6 class="fw-bold mb-0">
            Recent Orders
          </h6>
        </div>

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              ${orders.slice(0, 5).map((order) => `
                <tr>

                  <td>${order.id}</td>

                  <td>${order.customer}</td>

                  <td>${order.products}</td>

                  <td>${money(order.total)}</td>

                  <td>
                    ${statusBadge(order.status)}
                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}

/*ADMIN ORDERS*/

function adminOrders() {
  return shell(
    adminMenu,
    "Orders",
    `
      <div class="d-flex justify-content-between align-items-center mb-3">

        <div>

          <h4 class="fw-bold mb-1">
            Order Management
          </h4>

          <div class="small-muted">
            Review, confirm, reject, assign, and update orders.
          </div>

        </div>

        <button
          class="btn btn-primary btn-sm"
          onclick="newOrderModal()">

          + New Order

        </button>

      </div>

      <div class="card table-card">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Schedule</th>
                <th>Total</th>
                <th>Status</th>
                <th>Rider</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              ${orders.slice(0, 8).map((order) => `
                <tr>

                  <td>
                    <b>${order.id}</b>
                  </td>

                  <td>${order.customer}</td>

                  <td>${order.products}</td>

                  <td>${order.qty}</td>

                  <td>${order.schedule}</td>

                  <td>${money(order.total)}</td>

                  <td>
                    ${statusBadge(order.status)}
                  </td>

                  <td>
                    ${order.rider || "Unassigned"}
                  </td>

                  <td>

                    <div class="dropdown">

                      <button
                        class="btn btn-sm btn-outline-primary dropdown-toggle"
                        data-bs-toggle="dropdown">

                        Actions

                      </button>

                      <ul class="dropdown-menu">

                        <li>
                          <button
                            class="dropdown-item"
                            onclick="adminOrderDetails('${order.id}')">

                            View Details

                          </button>
                        </li>

                        <li>
                          <button
                            class="dropdown-item"
                            onclick="updateOrderStatus('${order.id}','Confirmed')">

                            Confirm Order

                          </button>
                        </li>

                        <li>
                          <button
                            class="dropdown-item"
                            onclick="assignRider('${order.id}')">

                            Assign Rider

                          </button>
                        </li>

                        <li>
                          <button
                            class="dropdown-item"
                            onclick="updateOrderStatus('${order.id}','Out for Delivery')">

                            Update Status

                          </button>
                        </li>

                        <li>
                          <button
                            class="dropdown-item text-danger"
                            onclick="updateOrderStatus('${order.id}','Cancelled')">

                            Cancel Order

                          </button>
                        </li>

                      </ul>

                    </div>

                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}


/* ADMIN ORDER DETAILS*/

function adminOrderDetails(id) {
  selectedOrderId = id;

  localStorage.setItem(
    "aquaflowSelectedOrder",
    id
  );

  go("/admin-order-details");
}

function adminOrderDetailsPage() {
  const order =
    orders.find(
      (item) => item.id === selectedOrderId
    ) || orders[0];

  return shell(
    adminMenu,
    "Order Details",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h4 class="fw-bold mb-1">
            Order Details
          </h4>

          <div class="small-muted">
            ${order.id}
          </div>

        </div>

        ${statusBadge(order.status)}

      </div>

      <div class="row g-4">

        <div class="col-lg-7">

          <div class="card p-4">

            <h6 class="fw-bold">
              Customer Information
            </h6>

            <div class="row mt-2">

              <div class="col-md-6">

                <span class="small-muted">
                  Customer
                </span>

                <p>
                  <b>${order.customer}</b>
                </p>

              </div>

              <div class="col-md-6">

                <span class="small-muted">
                  Contact
                </span>

                <p>
                  0917-123-4567
                </p>

              </div>

            </div>

            <hr>

            <h6 class="fw-bold">
              Order Information
            </h6>

            <p class="mt-3 mb-1">
              ${order.products}
            </p>

            <p class="small-muted">
              Total:
              <b class="text-primary">
                ${money(order.total)}
              </b>
            </p>

            <hr>

            <h6 class="fw-bold">
              Delivery Information
            </h6>

            <p class="small-muted mb-1">
              Address
            </p>

            <p>
              ${order.address}
            </p>

            <p class="small-muted mb-1">
              Schedule
            </p>

            <p>
              ${order.schedule}
            </p>

            <p class="small-muted mb-1">
              Assigned Rider
            </p>

            <p>
              ${order.rider || "Not assigned"}
            </p>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h6 class="fw-bold">
              Order Actions
            </h6>

            <button
              class="btn btn-primary w-100 mt-3"
              onclick="updateOrderStatus('${order.id}','Confirmed')">

              Confirm Order

            </button>

            <button
              class="btn btn-outline-primary w-100 mt-2"
              onclick="assignRider('${order.id}')">

              Assign Rider

            </button>

            <button
              class="btn btn-outline-primary w-100 mt-2"
              onclick="updateOrderStatus('${order.id}','Out for Delivery')">

              Update Status

            </button>

            <button
              class="btn btn-outline-danger w-100 mt-2"
              onclick="updateOrderStatus('${order.id}','Cancelled')">

              Cancel Order

            </button>

          </div>

          <div class="card p-4 mt-3">

            <h6 class="fw-bold">
              Delivery Location
            </h6>

            <div class="map-box mt-3">
              <i class="bi bi-geo-alt-fill map-pin"></i>
            </div>

          </div>

        </div>

      </div>
    `
  );
}


/*ADMIN ORDER ACTIONS*/

function updateOrderStatus(id, status) {
  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) return;

  order.status = status;

  toast(`${id} updated to ${status}.`);

  render();
}

function assignRider(id) {
  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        Assign Rider
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <label class="form-label">
        Available Rider
      </label>

      <select
        id="riderSelect"
        class="form-select">

        ${riders
          .filter(
            (rider) =>
              rider.availability !== "Offline"
          )
          .map(
            (rider) =>
              `<option>${rider.name}</option>`
          )
          .join("")}

      </select>

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="saveRiderAssignment('${id}')">

        Assign Rider

      </button>

    </div>
  `);
}

function saveRiderAssignment(id) {
  const rider =
    document.getElementById("riderSelect").value;

  const order = orders.find(
    (item) => item.id === id
  );

  if (order) {
    order.rider = rider;
    order.status = "Assigned";
  }

  closeModal();

  toast(`${rider} assigned to ${id}.`);

  render();
}

function newOrderModal() {
  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        Create New Order
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <input
        class="form-control mb-3"
        placeholder="Customer name">

      <select class="form-select mb-3">

        <option>
          Purified Water
        </option>

        <option>
          Mineral Water
        </option>

        <option>
          Alkaline Water
        </option>

      </select>

      <input
        type="number"
        class="form-control"
        value="1"
        min="1"
        placeholder="Quantity">

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="closeModal();toast('New order form saved for demo purposes.')">

        Create Order

      </button>

    </div>
  `);
}

/*ADMIN PRODUCTS*/

function adminProducts() {
  return shell(
    adminMenu,
    "Products",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h4 class="fw-bold mb-1">
            Product Management
          </h4>

          <div class="small-muted">
            Manage prices, stock, and product status.
          </div>

        </div>

        <button
          class="btn btn-primary btn-sm"
          onclick="newProductModal()">

          + Add Product

        </button>

      </div>

      <div class="card table-card">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>

              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Available Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              ${products.map((product) => `
                <tr>

                  <td>

                    <div class="d-flex align-items-center gap-2">

                      <div style="width:48px">
                        ${productVisual(product, true)}
                      </div>

                      <b>${product.name}</b>

                    </div>

                  </td>

                  <td>
                    ${money(product.price)}
                  </td>

                  <td>
                    ${product.stock}
                  </td>

                  <td>

                    <span class="badge bg-success-subtle text-success">
                      ${
                        product.stock > 0
                          ? "Available"
                          : "Out of Stock"
                      }
                    </span>

                  </td>

                  <td>

                    <button
                      class="btn btn-sm btn-outline-primary me-1"
                      onclick="editProductModal(${product.id})">

                      Edit

                    </button>

                    <button
                      class="btn btn-sm btn-outline-danger"
                      onclick="toast('${product.name} removed for demo purposes.')">

                      Delete

                    </button>

                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}

function newProductModal() {
  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        Add Product
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <input
        class="form-control mb-3"
        placeholder="Product name">

      <input
        class="form-control mb-3"
        placeholder="Price">

      <input
        class="form-control"
        placeholder="Available quantity">

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="closeModal();toast('Product added for demo purposes.')">

        Add Product

      </button>

    </div>
  `);
}

function editProductModal(id) {
  const product = products.find(
    (item) => item.id === id
  );

  if (!product) return;

  showModal(`
    <div class="modal-header">

      <h5 class="modal-title">
        Edit ${product.name}
      </h5>

      <button
        class="btn-close"
        data-bs-dismiss="modal">
      </button>

    </div>

    <div class="modal-body">

      <label class="form-label">
        Price
      </label>

      <input
        class="form-control mb-3"
        value="${product.price}">

      <label class="form-label">
        Available Quantity
      </label>

      <input
        class="form-control"
        value="${product.stock}">

    </div>

    <div class="modal-footer">

      <button
        class="btn btn-primary"
        onclick="closeModal();toast('Product changes saved.')">

        Save Changes

      </button>

    </div>
  `);
}


/*ADMIN CUSTOMERS*/

function adminCustomers() {
  const customers = [
    [
      "Maria Santos",
      "maria.santos@email.com",
      "0917-123-4567",
      "15",
      "Active"
    ],
    [
      "Juan Dela Cruz",
      "juan@email.com",
      "0918-234-5678",
      "8",
      "Active"
    ],
    [
      "Ana Reyes",
      "ana@email.com",
      "0919-345-6789",
      "12",
      "Active"
    ],
    [
      "Liza Cruz",
      "liza@email.com",
      "0920-456-7890",
      "5",
      "Inactive"
    ]
  ];

  return shell(
    adminMenu,
    "Customers",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Customer Management
        </h4>

        <div class="small-muted">
          View customer accounts and order activity.
        </div>

      </div>

      <div class="card table-card">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Number of Orders</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              ${customers.map((customer) => `
                <tr>

                  <td>
                    <b>${customer[0]}</b>
                  </td>

                  <td>${customer[2]}</td>

                  <td>${customer[1]}</td>

                  <td>${customer[3]}</td>

                  <td>

                    <span
                      class="badge ${
                        customer[4] === "Active"
                          ? "bg-success-subtle text-success"
                          : "bg-secondary-subtle text-secondary"
                      }">

                      ${customer[4]}

                    </span>

                  </td>

                  <td>

                    <button
                      class="btn btn-sm btn-link"
                      onclick="toast('Customer details opened for demo.')">

                      View Details

                    </button>

                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}


/*ADMIN RIDERS */

function adminRiders() {
  return shell(
    adminMenu,
    "Riders",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Rider Management
        </h4>

        <div class="small-muted">
          Monitor rider availability and assigned deliveries.
        </div>

      </div>

      <div class="card table-card">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Rider Name</th>
                <th>Contact</th>
                <th>Availability</th>
                <th>Assigned Deliveries</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              ${riders.map((rider) => `
                <tr>

                  <td>
                    <b>${rider.name}</b>
                  </td>

                  <td>${rider.phone}</td>

                  <td>${rider.availability}</td>

                  <td>${rider.assigned}</td>

                  <td>

                    <span
                      class="badge ${
                        rider.status === "Available"
                          ? "bg-success-subtle text-success"
                          : rider.status === "Busy"
                            ? "bg-warning-subtle text-warning"
                            : "bg-secondary-subtle text-secondary"
                      }">

                      ${rider.status}

                    </span>

                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}


/*ADMIN DELIVERY*/

function adminDelivery() {
  const activeOrders = orders.filter(
    (order) =>
      ["Assigned", "Out for Delivery"]
        .includes(order.status)
  );

  return shell(
    adminMenu,
    "Deliveries",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Delivery Management
        </h4>

        <div class="small-muted">
          Monitor scheduled deliveries and rider assignments.
        </div>

      </div>

      <div class="row g-4">

        <div class="col-lg-7">

          <div class="card p-4">

            <h6 class="fw-bold">
              Delivery Location Preview
            </h6>

            <div class="map-box mt-3">
              <i class="bi bi-geo-alt-fill map-pin"></i>
            </div>

            <div class="small-muted mt-2">
              Simple location preview only. No live GPS.
            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h6 class="fw-bold">
              Today's Summary
            </h6>

            <div class="row g-3 mt-1">

              <div class="col-6">
                <div class="kpi-label">
                  Scheduled
                </div>
                <h4>18</h4>
              </div>

              <div class="col-6">
                <div class="kpi-label">
                  In Progress
                </div>
                <h4>${activeOrders.length}</h4>
              </div>

              <div class="col-6">
                <div class="kpi-label">
                  Completed
                </div>
                <h4>14</h4>
              </div>

              <div class="col-6">
                <div class="kpi-label">
                  Unassigned
                </div>
                <h4>2</h4>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="card table-card mt-3">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Delivery ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Rider</th>
                <th>Address</th>
                <th>Schedule</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              ${activeOrders.map((order) => `
                <tr>

                  <td>
                    D-${order.id.replace("#", "")}
                  </td>

                  <td>${order.id}</td>

                  <td>${order.customer}</td>

                  <td>
                    ${order.rider || "Unassigned"}
                  </td>

                  <td>${order.address}</td>

                  <td>${order.schedule}</td>

                  <td>
                    ${statusBadge(order.status)}
                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}


/*ADMIN REPORTS*/

function adminReports() {
  return shell(
    adminMenu,
    "Reports",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Reports
        </h4>

        <div class="small-muted">
          Simple reporting dashboard for project demonstration.
        </div>

      </div>

      <div class="row g-3">

        ${[
          ["28", "Daily Orders"],
          ["138", "Weekly Orders"],
          ["520", "Monthly Orders"],
          ["472", "Completed Deliveries"],
          ["18", "Cancelled Orders"],
          ["₱72,450", "Total Sales"]
        ].map((item) => `
          <div class="col-6 col-lg-2">

            <div class="card stat-card">

              <h5>${item[0]}</h5>

              <span class="small-muted">
                ${item[1]}
              </span>

            </div>

          </div>
        `).join("")}

      </div>

      <div class="row g-4 mt-1">

        <div class="col-lg-8">

          <div class="card p-4">

            <h6 class="fw-bold">
              Sales Summary
            </h6>

            <div class="chart-box mt-3">

              ${[50,58,66,72,61,85,92,78,88,95]
                .map((height, index) => `
                  <div class="chart-col">

                    <div
                      class="bar"
                      style="height:${height}%">
                    </div>

                    <small class="text-muted">
                      ${index + 1}
                    </small>

                  </div>
                `).join("")}

            </div>

          </div>

        </div>

        <div class="col-lg-4">

          <div class="card p-4">

            <h6 class="fw-bold">
              Most Ordered Products
            </h6>

            ${[
              "Purified Water",
              "Mineral Water",
              "Alkaline Water"
            ].map((product, index) => `
              <div class="d-flex justify-content-between py-3 border-bottom">

                <span>${product}</span>

                <b>
                  ${[62, 44, 28][index]}
                </b>

              </div>
            `).join("")}

          </div>

        </div>

      </div>
    `
  );
}


/*ADMIN SETTINGS */

function adminSettings() {
  return shell(
    adminMenu,
    "Settings",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Settings
        </h4>

        <div class="small-muted">
          Configure basic business information for the prototype.
        </div>

      </div>

      <div
        class="card p-4"
        style="max-width:800px">

        <h6 class="fw-bold">
          Store Information
        </h6>

        <div class="row g-3 mt-1">

          <div class="col-md-6">

            <label class="form-label">
              Business Name
            </label>

            <input
              class="form-control"
              value="AquaFlow Water Delivery">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Address
            </label>

            <input
              class="form-control"
              value="Metro Manila, Philippines">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Delivery Fee
            </label>

            <input
              class="form-control"
              value="₱40 below ₱200">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Operating Hours
            </label>

            <input
              class="form-control"
              value="07:00 AM - 07:00 PM">

          </div>

        </div>

        <hr>

        <h6 class="fw-bold">
          Notifications
        </h6>

        <div class="form-check form-switch mt-3">

          <input
            class="form-check-input"
            type="checkbox"
            checked>

          <label class="form-check-label">
            Enable order notifications
          </label>

        </div>

        <button
          class="btn btn-primary mt-4"
          onclick="toast('Settings saved successfully.')">

          Save Settings

        </button>

      </div>
    `
  );
}


/* RIDER DASHBOARD*/

function riderDashboard() {
  return shell(
    riderMenu,
    "Dashboard",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Rider Dashboard
        </h4>

        <div class="small-muted">
          Welcome back, Carlos. Here are today's deliveries.
        </div>

      </div>

      <div class="row g-3">

        ${[
          ["4", "Today's Deliveries", "clipboard-check"],
          ["3", "Completed Deliveries", "check-circle"],
          ["1", "Current Delivery", "truck"],
          ["Available", "Rider Availability", "person-check"]
        ].map((item) => `
          <div class="col-6 col-lg-3">

            <div class="card stat-card">

              <div class="stat-icon">
                <i class="bi bi-${item[2]}"></i>
              </div>

              <h5 class="mt-3">
                ${item[0]}
              </h5>

              <span class="small-muted">
                ${item[1]}
              </span>

            </div>

          </div>
        `).join("")}

      </div>

      <div class="card p-4 mt-4">

        <div class="d-flex justify-content-between">

          <h6 class="fw-bold">
            Current Delivery
          </h6>

          ${statusBadge("Out for Delivery")}

        </div>

        <div class="order-panel mt-3">

          <b>
            #3001 • Maria Santos
          </b>

          <div class="small-muted mt-1">
            123 Sample St., Barangay Bagong Silang,
            Caloocan City
          </div>

          <div class="mt-3 d-flex gap-2">

            <button
              class="btn btn-primary btn-sm"
              onclick="riderUpdate('#3001','Out for Delivery')">

              Out for Delivery

            </button>

            <button
              class="btn btn-outline-primary btn-sm"
              onclick="riderUpdate('#3001','Delivered')">

              Mark as Delivered

            </button>

          </div>

        </div>

      </div>
    `
  );
}


/*RIDER DELIVERIES */

function deliveriesPage() {
  const assignedOrders = orders.filter(
    (order) =>
      order.rider === "Carlos Dela Cruz" &&
      order.status !== "Delivered"
  );

  return shell(
    riderMenu,
    "Assigned Deliveries",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Assigned Deliveries
        </h4>

        <div class="small-muted">
          Review customer, address, schedule, and order details.
        </div>

      </div>

      <div class="row g-3">

        ${assignedOrders.map((order) => `
          <div class="col-lg-6">

            <div class="card p-4 h-100">

              <div class="d-flex justify-content-between">

                <b>${order.id}</b>

                ${statusBadge(order.status)}

              </div>

              <h6 class="mt-3 mb-1">
                ${order.customer}
              </h6>

              <div class="small-muted">
                <i class="bi bi-telephone me-1"></i>
                0917-123-4567
              </div>

              <p class="small-muted mt-3 mb-1">
                Address
              </p>

              <p>${order.address}</p>

              <p class="small-muted mb-1">
                Products
              </p>

              <p>${order.products}</p>

              <p class="small-muted mb-1">
                Schedule
              </p>

              <p>${order.schedule}</p>

              <button
                class="btn btn-outline-primary btn-sm"
                onclick="riderOrderDetails('${order.id}')">

                View Details

              </button>

            </div>

          </div>
        `).join("")}

      </div>
    `
  );
}


/*RIDER ORDER DETAILS*/

function riderOrderDetails(id) {
  selectedOrderId = id;

  localStorage.setItem(
    "aquaflowSelectedOrder",
    id
  );

  go("/delivery-details");
}

function deliveryDetailsPage() {
  const order =
    orders.find(
      (item) => item.id === selectedOrderId
    ) ||
    orders.find(
      (item) => item.rider === "Carlos Dela Cruz"
    ) ||
    orders[0];

  return shell(
    riderMenu,
    "Delivery Details",
    `
      <div class="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h4 class="fw-bold mb-1">
            Delivery Details
          </h4>

          <div class="small-muted">
            ${order.id}
          </div>

        </div>

        ${statusBadge(order.status)}

      </div>

      <div class="row g-4">

        <div class="col-lg-7">

          <div class="card p-4">

            <h6 class="fw-bold">
              Customer Information
            </h6>

            <p class="mt-3 mb-1">
              <b>${order.customer}</b>
            </p>

            <p class="small-muted">
              0917-123-4567
            </p>

            <h6 class="fw-bold mt-4">
              Delivery Address
            </h6>

            <p class="mt-3">
              ${order.address}
            </p>

            <div class="map-box mt-3">
              <i class="bi bi-geo-alt-fill map-pin"></i>
            </div>

            <div class="small-muted mt-2">
              Simple map/location preview only.
            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <div class="card p-4">

            <h6 class="fw-bold">
              Order Details
            </h6>

            <p class="mt-3">
              ${order.products}
            </p>

            <p class="small-muted mb-1">
              Schedule
            </p>

            <p>
              ${order.schedule}
            </p>

            <p class="small-muted mb-1">
              Order Status
            </p>

            <p>
              ${statusBadge(order.status)}
            </p>

            <div class="d-grid gap-2 mt-4">

              <button
                class="btn btn-primary"
                onclick="riderUpdate('${order.id}','Out for Delivery')">

                Out for Delivery

              </button>

              <button
                class="btn btn-outline-primary"
                onclick="riderUpdate('${order.id}','Delivered')">

                Mark as Delivered

              </button>

            </div>

          </div>

        </div>

      </div>
    `
  );
}

function riderUpdate(id, status) {
  const order = orders.find(
    (item) => item.id === id
  );

  if (!order) return;

  order.status = status;

  toast(`${id} marked as ${status}.`);

  render();
}


/*RIDER HISTORY*/

function historyPage() {
  const history = orders
    .filter(
      (order) =>
        order.rider === "Carlos Dela Cruz" ||
        order.status === "Delivered"
    )
    .slice(0, 6);

  return shell(
    riderMenu,
    "Delivery History",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Delivery History
        </h4>

        <div class="small-muted">
          Completed and past deliveries.
        </div>

      </div>

      <div class="card table-card">

        <div class="table-responsive">

          <table class="table mb-0">

            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Delivery Address</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              ${history.map((order) => `
                <tr>

                  <td>${order.id}</td>

                  <td>${order.customer}</td>

                  <td>${order.date}</td>

                  <td>${order.address}</td>

                  <td>
                    ${statusBadge(order.status)}
                  </td>

                </tr>
              `).join("")}

            </tbody>

          </table>

        </div>

      </div>
    `
  );
}


/*RIDER PROFILE*/

function riderProfile() {
  return shell(
    riderMenu,
    "Profile",
    `
      <div class="mb-4">

        <h4 class="fw-bold mb-1">
          Rider Profile
        </h4>

        <div class="small-muted">
          Manage rider information.
        </div>

      </div>

      <div
        class="card p-4"
        style="max-width:700px">

        <div class="d-flex align-items-center gap-3 mb-4">

          <span class="profile-avatar avatar-lg">
            CD
          </span>

          <div>

            <h5 class="mb-1">
              Carlos Dela Cruz
            </h5>

            <div class="small-muted">
              Delivery Rider
            </div>

          </div>

        </div>

        <div class="row g-3">

          <div class="col-md-6">

            <label class="form-label">
              Full Name
            </label>

            <input
              class="form-control"
              value="Carlos Dela Cruz">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Contact Number
            </label>

            <input
              class="form-control"
              value="0917-555-1111">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Email
            </label>

            <input
              class="form-control"
              value="carlos@email.com">

          </div>

          <div class="col-md-6">

            <label class="form-label">
              Vehicle
            </label>

            <input
              class="form-control"
              value="Motorcycle">

          </div>

        </div>

        <button
          class="btn btn-primary mt-4"
          onclick="toast('Rider profile saved.')">

          Save Changes

        </button>

      </div>
    `
  );
}


/*MODAL FUNCTIONS */

function showModal(html) {
  const modalContent =
    document.getElementById("modalContent");

  const modal =
    document.getElementById("appModal");

  if (!modalContent || !modal) return;

  modalContent.innerHTML = html;

  bootstrap.Modal
    .getOrCreateInstance(modal)
    .show();
}

function closeModal() {
  const modal =
    document.getElementById("appModal");

  if (!modal) return;

  bootstrap.Modal
    .getOrCreateInstance(modal)
    .hide();
}


/* ROUTER*/

function render() {
  const path =
    location.hash.slice(2) || "";

  const routes = {

    /* Public */
    "": landing,
    "/": landing,
    "login": login,
    "register": register,
    "products-public": publicProducts,
    "about": aboutPage,
    "contact": contactPage,

    /* Customer */
    "dashboard": customerDashboard,
    "products": productsPage,
    "cart": cartPage,
    "checkout": checkoutPage,
    "confirmation": confirmationPage,
    "orders": ordersPage,
    "tracking": trackingPage,
    "addresses": addressesPage,
    "profile": profilePage,

    /* Admin */
    "admin": adminDashboard,
    "admin-orders": adminOrders,
    "admin-order-details": adminOrderDetailsPage,
    "admin-products": adminProducts,
    "admin-customers": adminCustomers,
    "admin-riders": adminRiders,
    "admin-delivery": adminDelivery,
    "admin-reports": adminReports,
    "admin-settings": adminSettings,

    /* Rider */
    "rider": riderDashboard,
    "deliveries": deliveriesPage,
    "delivery-details": deliveryDetailsPage,
    "history": historyPage,
    "rider-profile": riderProfile
  };

  const page =
    routes[path]
      ? routes[path]()
      : landing();

  document.getElementById("app").innerHTML = page;
}


window.addEventListener(
  "hashchange",
  render
);

window.addEventListener(
  "load",
  render
);


(function () {
  "use strict";
  function createPageLoader() {
    if (document.querySelector(".af-page-loader")) return;

    const loader = document.createElement("div");
    loader.className = "af-page-loader";

    loader.innerHTML = `
      <div class="af-loader-content">
        <div class="af-loader-logo">
          <i class="bi bi-droplet-fill"></i>
        </div>
        <div class="af-loader-name">AquaFlow</div>
        <div class="af-loader-spinner"></div>
      </div>
    `;

    document.body.appendChild(loader);

    setTimeout(function () {
      loader.classList.add("af-loader-hidden");

      setTimeout(function () {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 500);
  }


  function injectEnhancementStyles() {
    if (document.getElementById("aquaflow-enhancement-styles")) return;

    const style = document.createElement("style");
    style.id = "aquaflow-enhancement-styles";

    style.textContent = `
      /* Page Loader */
      .af-page-loader {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, #1769e0, #123f91);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        opacity: 1;
        visibility: visible;
        transition: opacity .45s ease, visibility .45s ease;
      }

      .af-page-loader.af-loader-hidden {
        opacity: 0;
        visibility: hidden;
      }

      .af-loader-content {
        text-align: center;
        color: white;
      }

      .af-loader-logo {
        width: 72px;
        height: 72px;
        border-radius: 22px;
        background: rgba(255,255,255,.16);
        border: 1px solid rgba(255,255,255,.25);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        font-size: 32px;
        box-shadow: 0 15px 40px rgba(0,0,0,.15);
        animation: afLoaderFloat 1.5s ease-in-out infinite;
      }

      .af-loader-name {
        font-size: 24px;
        font-weight: 700;
        margin-top: 14px;
      }

      .af-loader-spinner {
        width: 28px;
        height: 28px;
        border: 3px solid rgba(255,255,255,.3);
        border-top-color: white;
        border-radius: 50%;
        margin: 18px auto 0;
        animation: afSpin .8s linear infinite;
      }

      @keyframes afLoaderFloat {
        0%,100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      @keyframes afSpin {
        to {
          transform: rotate(360deg);
        }
      }


      /* Scroll Reveal */
      .af-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition:
          opacity .65s ease,
          transform .65s ease;
      }

      .af-reveal.af-visible {
        opacity: 1;
        transform: translateY(0);
      }


      /* Card Hover */
      .card {
        transition:
          transform .25s ease,
          box-shadow .25s ease,
          border-color .25s ease;
      }

      .card:hover {
        box-shadow: 0 14px 35px rgba(20,55,100,.10);
      }


      /* Product Visual */
      .product-placeholder,
      .product-mini {
        transition: transform .3s ease;
      }

      .card:hover .product-placeholder {
        transform: scale(1.04);
      }

      .card:hover .product-mini {
        transform: scale(1.06);
      }


      /* Hero */
      .hero {
        overflow: hidden;
      }

      .hero h1 {
        animation: afHeroText .7s ease both;
      }

      .hero p {
        animation: afHeroText .8s ease .08s both;
      }

      .hero .btn {
        animation: afHeroText .8s ease .15s both;
      }

      @keyframes afHeroText {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }


      /* Water Bottle */
      .water-bottle {
        animation: afBottleFloat 4s ease-in-out infinite;
      }

      @keyframes afBottleFloat {
        0%,100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-10px) rotate(1deg);
        }
      }


      /* Hero bubbles */
      .hero-bubble {
        animation: afBubbleFloat 3.5s ease-in-out infinite;
      }

      .hero-bubble.two {
        animation-delay: .8s;
      }

      @keyframes afBubbleFloat {
        0%,100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-7px);
        }
      }


      /* Buttons */
      .btn {
        transition:
          transform .2s ease,
          box-shadow .2s ease,
          background-color .2s ease;
      }

      .btn:hover {
        transform: translateY(-2px);
      }

      .btn-primary:hover {
        box-shadow: 0 8px 20px rgba(23,105,224,.22);
      }


      /* Ripple */
      .af-ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: afRipple .55s linear;
        background: rgba(255,255,255,.35);
        pointer-events: none;
      }

      @keyframes afRipple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }


      /* Stats */
      .stat-card {
        overflow: hidden;
        position: relative;
      }

      .stat-card::after {
        content: "";
        position: absolute;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        right: -35px;
        bottom: -35px;
        background: rgba(23,105,224,.05);
        pointer-events: none;
      }

      .stat-icon {
        transition: transform .25s ease;
      }

      .stat-card:hover .stat-icon {
        transform: translateY(-3px) scale(1.05);
      }


      /* Quantity buttons */
      .quantity button {
        transition: .2s ease;
      }

      .quantity button:hover {
        background: #1769e0;
        color: white;
        border-color: #1769e0;
      }


      /* Map pin */
      .map-pin {
        animation: afMapPin 1.7s ease-in-out infinite;
      }

      @keyframes afMapPin {
        0%,100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-7px);
        }
      }


      /* Floating bubbles */
      .af-water-bubble {
        position: fixed;
        bottom: -30px;
        border-radius: 50%;
        background: rgba(40,169,224,.10);
        pointer-events: none;
        z-index: 0;
        animation: afWaterBubble linear forwards;
      }

      @keyframes afWaterBubble {
        from {
          transform: translateY(0) scale(1);
          opacity: .7;
        }
        to {
          transform: translateY(-110vh) scale(1.4);
          opacity: 0;
        }
      }


      /* Toast enhancement */
      #toastArea {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
      }

      #toastArea .toast {
        border: 0;
        border-radius: 14px;
        box-shadow: 0 12px 35px rgba(0,0,0,.15);
        overflow: hidden;
      }


      /* Mobile */
      @media (max-width: 767.98px) {
        .af-loader-logo {
          width: 64px;
          height: 64px;
        }

        #toastArea {
          left: 15px;
          right: 15px;
          bottom: 15px;
        }

        #toastArea .toast {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function setupRevealAnimations() {
    const selectors = [
      ".hero .col-lg-6",
      ".section-title",
      ".hero-bubble",
      ".card",
      ".stat-card",
      ".table-card",
      ".order-panel",
      ".icon-box"
    ];

    const elements = document.querySelectorAll(selectors.join(","));

    elements.forEach(function (element) {
      if (
        element.classList.contains("af-page-loader") ||
        element.closest(".af-page-loader")
      ) {
        return;
      }

      element.classList.add("af-reveal");
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("af-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("af-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    document.querySelectorAll(".af-reveal").forEach(function (element) {
      observer.observe(element);
    });
  }

  function setupRipple() {
    document.querySelectorAll(".btn").forEach(function (button) {

      if (button.dataset.afRippleReady === "true") return;

      button.dataset.afRippleReady = "true";

      button.addEventListener("click", function (event) {

        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement("span");

        ripple.className = "af-ripple";

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left =
          event.clientX - rect.left - size / 2 + "px";

        ripple.style.top =
          event.clientY - rect.top - size / 2 + "px";

        if (getComputedStyle(button).position === "static") {
          button.style.position = "relative";
        }

        button.style.overflow = "hidden";

        button.appendChild(ripple);

        setTimeout(function () {
          if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
      });
    });
  }

  function createWaterBubble() {

    if (!document.body) return;

    const bubble = document.createElement("span");

    bubble.className = "af-water-bubble";

    const size = Math.floor(Math.random() * 18) + 8;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left =
      Math.floor(Math.random() * 100) + "vw";

    bubble.style.animationDuration =
      (Math.floor(Math.random() * 7) + 7) + "s";

    bubble.style.opacity =
      (Math.random() * .35 + .15).toFixed(2);

    document.body.appendChild(bubble);

    setTimeout(function () {
      if (bubble && bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 15000);
  }

  function startWaterBubbles() {
    setInterval(function () {
      if (document.hidden) return;

      createWaterBubble();

    }, 1800);
  }

  function setupNavbarEffect() {

    function updateNavbar() {

      const navbar = document.querySelector(".navbar");

      if (!navbar) return;

      if (window.scrollY > 20) {
        navbar.classList.add("shadow-sm");
      } else {
        navbar.classList.remove("shadow-sm");
      }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();
  }

  function updatePublicNav() {

    const hash = location.hash || "#/";

    document.querySelectorAll(".navbar .nav-link").forEach(function (link) {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (!href) return;

      if (href === hash) {
        link.classList.add("active");
      }
    });
  }

  function animateCounters() {

    document.querySelectorAll(".stat-card h3, .stat-card h5").forEach(function (element) {

      if (element.dataset.afCounterDone === "true") return;

      const original = element.textContent.trim();
      const match = original.match(/^(\d+)$/);

      if (!match) return;

      const target = Number(match[1]);

      if (target <= 0) return;

      element.dataset.afCounterDone = "true";

      const duration = 700;
      const startTime = performance.now();

      function updateCounter(currentTime) {

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        const eased =
          1 - Math.pow(1 - progress, 3);

        const current =
          Math.floor(target * eased);

        element.textContent =
          current.toLocaleString("en-PH");

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent =
            target.toLocaleString("en-PH");
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  function setupCardTilt() {

    document.querySelectorAll(".hero-visual .card, .product-placeholder")
      .forEach(function (element) {

        if (element.dataset.afTiltReady === "true") return;

        element.dataset.afTiltReady = "true";

        element.addEventListener("mousemove", function (event) {

          const rect = element.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) / rect.width;

          const y =
            (event.clientY - rect.top) / rect.height;

          const rotateX =
            (y - .5) * -4;

          const rotateY =
            (x - .5) * 4;

          element.style.transform =
            `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        element.addEventListener("mouseleave", function () {
          element.style.transform = "";
        });
      });
  }

  function setupMobileMenu() {

    document.querySelectorAll(".mobile-menu").forEach(function (button) {

      if (button.dataset.afMenuReady === "true") return;

      button.dataset.afMenuReady = "true";

      button.addEventListener("click", function () {

        const sidebar =
          document.querySelector(".sidebar");

        if (!sidebar) return;

        sidebar.classList.toggle("af-sidebar-open");

      });
    });
  }

  function closeMobileSidebar() {

    const sidebar =
      document.querySelector(".sidebar");

    if (!sidebar) return;

    sidebar.classList.remove("af-sidebar-open");
  }

  function runAquaFlowEffects() {

    injectEnhancementStyles();

    setupRevealAnimations();

    setupRipple();

    setupNavbarEffect();

    updatePublicNav();

    animateCounters();

    setupCardTilt();

    setupMobileMenu();

    closeMobileSidebar();
  }

  function injectMobileSidebarStyle() {

    if (document.getElementById("aquaflow-mobile-style")) return;

    const style = document.createElement("style");

    style.id = "aquaflow-mobile-style";

    style.textContent = `
      @media (max-width: 991.98px) {

        .sidebar {
          transition:
            transform .3s ease,
            box-shadow .3s ease;
        }

        .sidebar.af-sidebar-open {
          transform: translateX(0) !important;
          box-shadow: 12px 0 35px rgba(0,0,0,.15);
        }
      }
    `;

    document.head.appendChild(style);
  }

  function startAquaFlowEnhancements() {

    injectEnhancementStyles();

    injectMobileSidebarStyle();

    createPageLoader();

    setTimeout(function () {
      runAquaFlowEffects();
    }, 100);

    startWaterBubbles();
  }

  window.addEventListener("hashchange", function () {

    setTimeout(function () {
      runAquaFlowEffects();
    }, 80);

  });
  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      startAquaFlowEnhancements
    );

  } else {

    startAquaFlowEnhancements();

  }

})();