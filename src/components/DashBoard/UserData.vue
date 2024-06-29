<template>
  <div class="app-window" v-if="currentView === 'user'">
    <div class="app-window__header" style="padding-left: 20px;">
      <h2 class="app-window__header-heading">Manage User Data</h2>
       <button class="primary new" @click="showCreateModal" >
        <svg viewBox="0 0 24 24">
          <path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" />
        </svg>
        <span>New User</span>
      </button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" @mouseover="hover = user.id" @mouseleave="hover = null" :class="{ 'hover': hover === user.id }">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <div class="action-buttons">
                <button class="edit-btn" @click="showEditModal(user)">
                  <svg viewBox="0 0 24 24" class="icon"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM21.41 6.34l-3.75-3.75-1.66 1.66 3.75 3.75 1.66-1.66z"/></svg>
                  Edit
                </button>
                <button class="delete-btn" @click="deleteUser(user.id)">
                  <svg viewBox="0 0 24 24" class="icon"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6M16.5,4L15,2.5H9L7.5,4H5V6H19V4H16.5Z"/></svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoading" class="loader">Loading...</div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">Next</button>
      </div>
    </div>
    
    <!-- Create/Edit Modal -->
    <transition name="modal">
      <section class="modal__container" v-if="showModal" @click="closeModal">
        <div key="eventModal" class="modal modal--event-modal" @click="$event.stopPropagation()">
          <form class="modal--form" autocomplete="off" @submit.prevent="submitHandler">
            <header class="modal__header">
              <svg viewBox="0 0 24 24">
                <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
              </svg>
              <h1>{{ isEditing ? 'Edit User' : 'Create New User' }}</h1>
            </header>
            <div ref="eventModal" class="modal__content">
              <div ref="eventModalInner">
                <div class="input-container">
                  <span>Name</span>
                  <input v-model="formData.name" type="text" class="input" placeholder="User Name">
                </div>
                <div class="input-container">
                  <span>Email</span>
                  <input v-model="formData.email" type="email" class="input" placeholder="User Email">
                </div>
                <div class="input-container">
                  <span>Password</span>
                  <input v-model="formData.password" type="password" class="input" placeholder="password">
                </div>
              </div>
            </div>
            <footer class="modal__footer">
              <div>
                <button :class="{ disabled: !isFormValid }" class="primary" :disabled="!isFormValid">
                  <span>{{ isEditing ? 'Update' : 'Create' }}</span>
                </button>
              </div>
            </footer>
          </form>
        </div>
      </section>
    </transition>
  </div>
</template>


  
<script>
import axios from 'axios';

export default {
  props: {
    currentView: String
  },
  data() {
    return {
      users: [],
      hover: null,
      currentPage: 1,
      perPage: 5,
      isLoading: false,
      showModal: false,
      isEditing: false,
      formData: {
        id: null,
        name: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.users.slice(start, end);
    },
    isFormValid() {
      return this.formData.name && this.formData.email && this.formData.password;
    }
  },
  methods: {
    // Function to fetch users
    fetchUsers() {
      this.isLoading = true;
      axios
        .get('http://localhost/MTest/users', {
          headers: this.getHeaders() // Use method to get headers
        })
        .then((response) => {
          this.users = Object.values(response.data.response.result);
          this.isLoading = false;
        })
        .catch((error) => {
          this.handleError(error); // Handle errors
        });
    },
    // Function to get headers with token
    getHeaders() {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-TEST-CLIENT-ID': 'test'
      };
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      return headers;
    },
    // Function to handle errors, including token expiration
    handleError(error) {
      console.error('There was an error!', error);
      if (error.response && error.response.status === 403 && error.response.data.error.message === 'Expired token') {
        // Redirect to login or handle token expiration as needed
        this.redirectToLogin();
      }
      this.isLoading = false;
    },
    // Function to redirect to login page
    redirectToLogin() {
      // Implement your logic to redirect to the login page
      // Example using Vue Router:
      // this.$router.push('/login');
    },
    // Function to navigate to previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // Function to navigate to next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    // Function to show modal for creating a new user
    showCreateModal() {
      this.resetForm();
      this.isEditing = false;
      this.showModal = true;
    },
    // Function to show modal for editing a user
    showEditModal(user) {
      this.formData = { ...user };
      this.isEditing = true;
      this.showModal = true;
    },
    // Function to close the modal
    closeModal() {
      this.showModal = false;
    },
    // Function to reset the form data
    resetForm() {
      this.formData = {
        id: null,
        name: '',
        email: '',
        password: ''
      };
    },
    // Function to handle form submission
    submitHandler() {
      if (this.isEditing) {
        this.updateUser();
      } else {
        this.createUser();
      }
    },
    // Function to create a new user
    createUser() {
      axios
        .post('http://localhost/MTest/register', {
          username: this.formData.name,
          password: this.formData.password,
          email: this.formData.email
        }, {
          headers: this.getHeaders() // Use method to get headers
        })
        .then(() => {
          this.fetchUsers();
          this.closeModal();
        })
        .catch((error) => {
          this.handleError(error); // Handle errors
        });
    },
    // Function to update an existing user
    updateUser() {
      axios
        .post('http://localhost/MTest/updateuser', {
          username: this.formData.name,
          password: this.formData.password,
          email: this.formData.email,
          uid: String(this.formData.id)
        }, {
          headers: this.getHeaders() // Use method to get headers
        })
        .then(() => {
          this.fetchUsers();
          this.closeModal();
        })
        .catch((error) => {
          this.handleError(error); // Handle errors
        });
    },
    // Function to delete a user
    deleteUser(id) {
      axios
        .post('http://localhost/MTest/deleteuser', {
          uid: String(id)
        }, {
          headers: this.getHeaders() // Use method to get headers
        })
        .then(() => {
          this.fetchUsers();
        })
        .catch((error) => {
          this.handleError(error); // Handle errors
        });
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.fetchUsers();
    } else {
      this.redirectToLogin();
    }
  }
};
</script>



  
  <style>
  .table-container {
    max-height: 400px;
    overflow-y: auto;
    padding: 20px;
  }
  
  table { 
    width: 100%; 
    border-collapse: collapse; 
  }
  
  /* Zebra striping */
  tr:nth-of-type(odd) { 
    background: #eee; 
  }
  
  th { 
    background: #3498db; 
    color: white; 
    font-weight: bold; 
  }
  
  td, th { 
    padding: 10px; 
    border: 1px solid #ccc; 
    text-align: left; 
    font-size: 10px; 
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  /* Buttons */
  button.edit-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  button.delete-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  button.edit-btn .icon, button.delete-btn .icon {
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }
  
  button.edit-btn:hover, button.delete-btn:hover {
    opacity: 0.8;
  }
  
  /* Responsive design */
  @media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  
    table { 
      width: 100%; 
    }
  
    table, thead, tbody, th, td, tr { 
      display: block; 
    }
  
    thead tr { 
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  
    tr { 
      border: 1px solid #ccc; 
    }
  
    td { 
      border: none;
      border-bottom: 1px solid #eee; 
      position: relative;
      padding-left: 50%; 
    }
  
    td:before { 
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%; 
      padding-right: 10px; 
      white-space: nowrap;
      content: attr(data-column);
      color: #000;
      font-weight: bold;
    }
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 10px;
  }
  
  .pagination-btn {
    padding: 10px 20px;
  }
  
  .loader {
    text-align: center;
    padding: 10px;
  }
  </style>
  