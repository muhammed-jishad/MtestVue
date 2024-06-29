<template>
    <div class="app-window" v-if="currentView === 'dashboard'">
      <!-- Header -->
      <div class="app-window__header">
        <h2 class="app-window__header-heading">Transactions</h2>
        <div>
          <!-- Search -->
          <input type="text" v-model="searchTerm" placeholder="Search transactions...">
          
          <!-- Export Button -->
          <button @click="exportToPDF">Export to PDF</button>
        </div>
      </div>
  
      <!-- Content Container -->
      <div>
        <!-- Toolbar -->
       
  
        <!-- Content -->
        <div>
          <!-- Table with Scroll -->
          <div>
            <table v-if="transactions.length > 0" class="table">
              <thead>
                <tr>
                  <th @click="sortBy('TRADE_DATE')">Trade Date <span v-if="sortByField === 'TRADE_DATE'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Portfolio_Number')">Portfolio Number <span v-if="sortByField === 'Portfolio_Number'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Share_Symbol_Code')">Symbol Code <span v-if="sortByField === 'Share_Symbol_Code'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Share_Name')">Share Name <span v-if="sortByField === 'Share_Name'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Transaction_Type')">Transaction Type <span v-if="sortByField === 'Transaction_Type'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Transaction_ID')">Transaction ID <span v-if="sortByField === 'Transaction_ID'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('No_of_Shares')">No. of Shares <span v-if="sortByField === 'No_of_Shares'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Unit_Price')">Unit Price <span v-if="sortByField === 'Unit_Price'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Net_Amount')">Net Amount <span v-if="sortByField === 'Net_Amount'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Total_Amount')">Total Amount <span v-if="sortByField === 'Total_Amount'">{{ sortIcon }}</span></th>
                  <th @click="sortBy('Profit_Loss')">Profit/Loss <span v-if="sortByField === 'Profit_Loss'">{{ sortIcon }}</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in paginatedTransactions" :key="transaction.Transaction_ID">
                  <td>{{ formatDate(transaction.TRADE_DATE) }}</td>
                  <td>{{ transaction.Portfolio_Number }}</td>
                  <td>{{ transaction.Share_Symbol_Code }}</td>
                  <td>{{ transaction.Share_Name }}</td>
                  <td>{{ transaction.Transaction_Type }}</td>
                  <td>{{ transaction.Transaction_ID }}</td>
                  <td>{{ transaction.No_of_Shares }}</td>
                  <td>{{ transaction.Unit_Price }}</td>
                  <td>{{ transaction.Net_Amount }}</td>
                  <td>{{ transaction.Total_Amount }}</td>
                  <td>{{ transaction.Profit_Loss }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No transactions available.</p>
          </div>
        </div>
  
        
      </div>
        <!-- Pagination -->

      <div>
          <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    props: {
      currentView: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        transactions: [],    // Array to hold transaction data
        loading: false,       // Loading state
        error: null,          // Error state
        sortByField: '',      // Field to sort by
        sortDesc: false,      // Sort direction
        searchTerm: '',       // Search term for filtering
        currentPage: 1,       // Current page number
        pageSize: 10          // Number of transactions per page
      };
    },
    watch: {
      currentView() {
        if (this.currentView === 'dashboard') {
          this.fetchTransactions();
        }
      }
    },
    mounted() {
      // this.fetchTransactions();
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page or handle authentication
      this.navigateToLogin();
    } else {
      // Call API with token
      this.fetchTransactionsWithToken(token);
    }
    },
    methods: {
      async fetchTransactionsWithToken(token) {
      try {
        this.loading = true;
          const response = await axios.get('http://localhost/MTest/gettransaction', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-TEST-CLIENT-ID': 'test',
              'Authorization': `Bearer ${token}`
            }
          });
          this.transactions = response.data.response.result;
          this.loading = false;
      } catch (error) {
        this.handleTokenError(error);
      }
    },
    handleTokenError(error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.message;
        if (errorMessage === 'Expired token') {
          // Handle expired token scenario
          this.navigateToLogin();
        } else {
          this.error = errorMessage;
        }
      } else {
        this.error = error.message || 'Failed to fetch data.';
      }
      this.loading = false;
    },
    navigateToLogin() {
      // Navigate to login page or handle authentication flow
      // Example: Use Vue Router for navigation
      this.$router.push('/');
    },
      async fetchTransactions() {
        try {
          this.loading = true;
          const response = await axios.get('http://localhost/MTest/gettransaction', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-TEST-CLIENT-ID': 'test',
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTk2MDM2NjEsImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTcxOTYxMDg2MSwidXNlcklkIjoxfQ.emD8FHxVl-n9SHYePxGwwRNXrWRFhWo6g4nhtQT3QVk'
            }
          });
          this.transactions = response.data.response.result;
          this.loading = false;
        } catch (error) {
          this.error = error.message || 'Failed to fetch data.';
          this.loading = false;
        }
      },
      sortBy(field) {
        if (this.sortByField === field) {
          this.sortDesc = !this.sortDesc;
        } else {
          this.sortByField = field;
          this.sortDesc = false;
        }
      },
      formatDate(date) {
        // Implement your date formatting logic here
        return date; // Placeholder, format as needed
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      exportToPDF() {
        const doc = new jsPDF();
        doc.autoTable({
          head: [['Trade Date', 'Portfolio Number', 'Symbol Code', 'Share Name', 'Transaction Type', 'Transaction ID', 'No. of Shares', 'Unit Price', 'Net Amount', 'Total Amount', 'Profit/Loss']],
          body: this.transactions.map(transaction => [
            this.formatDate(transaction.TRADE_DATE),
            transaction.Portfolio_Number,
            transaction.Share_Symbol_Code,
            transaction.Share_Name,
            transaction.Transaction_Type,
            transaction.Transaction_ID,
            transaction.No_of_Shares,
            transaction.Unit_Price,
            transaction.Net_Amount,
            transaction.Total_Amount,
            transaction.Profit_Loss
          ])
        });
        doc.save('transactions.pdf');
      }
    },
    computed: {
      paginatedTransactions() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredTransactions.slice(start, end);
      },
      filteredTransactions() {
        // Filtering logic
        if (this.searchTerm.trim() === '') {
          return this.sortedTransactions;
        } else {
          const searchTermLC = this.searchTerm.trim().toLowerCase();
          return this.sortedTransactions.filter(transaction =>
            transaction.Portfolio_Number.toLowerCase().includes(searchTermLC) ||
            transaction.Share_Symbol_Code.toLowerCase().includes(searchTermLC) ||
            transaction.Share_Name.toLowerCase().includes(searchTermLC) ||
            transaction.Transaction_Type.toLowerCase().includes(searchTermLC) ||
            transaction.Transaction_ID.toLowerCase().includes(searchTermLC)
          );
        }
      },
      sortedTransactions() {
        // Clone transactions array to avoid mutating original data
        let transactions = [...this.transactions];
  
        // Sorting logic
        if (this.sortByField) {
          const field = this.sortByField;
          const sortOrder = this.sortDesc ? -1 : 1;
          transactions = transactions.sort((a, b) => {
            let comparison = 0;
            if (a[field] > b[field]) {
              comparison = 1;
            } else if (a[field] < b[field]) {
              comparison = -1;
            }
            return comparison * sortOrder;
          });
        }
  
        return transactions;
      },
      totalPages() {
        return Math.ceil(this.filteredTransactions.length / this.pageSize);
      },
      sortIcon() {
        return this.sortDesc ? '▼' : '▲';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .app-window {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px;
  }
  
  .app-window__header {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .app-window__header-heading {
    margin: 0;
  }
  
  .app-window__content-container {
    margin-top: 10px;
  }
  
  .table-container {
    overflow-x: auto; /* Enable horizontal scrolling */
    max-width: 100%; /* Adjust as needed */
  }
  
  .table {
    min-width: 1200px; /* Set a minimum width for the table */
    width: max-content; /* Expand the table to fit its content */
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .table th, .table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    position: relative;
  }
  
  .table th {
    cursor: pointer;
  }
  
  .pagination {
    margin-top: 10px;
    text-align: center;
  }
  
  .pagination button {
    margin: 0 5px;
  }
  
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .toolbar input[type="text"] {
    padding: 8px;
    width: 300px;
    font-size: 14px;
  }
  
  .toolbar button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .toolbar button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  