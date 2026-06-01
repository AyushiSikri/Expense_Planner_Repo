# 💰 Expense Planner

A modern and intuitive mobile application built with React Native that helps users manage daily expenses, track budgets, and monitor spending habits efficiently.

---

## 📱 Features

### 🏠 Dashboard

Get a complete overview of your finances at a glance.

- View Total Balance
- Monitor Total Expenses
- Track Budget Usage
- Quick Action Cards
  - Add Budget
  - Add Expense
  - Expense History
- Recent Expenses Preview

---

### ➕ Add Expense

Record expenses quickly with a clean and user-friendly interface.

#### Features

- Custom Numeric Keypad
- Expense Amount Entry
- Add Notes / Description
- Date Selection
- Category Selection
- Instant Expense Saving

---

### 📂 Expense Categories

Organize expenses using predefined categories.

#### Available Categories

- Bills
- Food
- Travel
- Entertainment
- Health
- Beauty & Care
- Sports
- Education

Each category includes:

- Custom Icon
- Unique Color Theme
- Easy Identification

---

### 📜 Expense History

Review all recorded expenses in one place.

#### Features

- Expense Category
- Notes
- Amount
- Date
- Color-Coded Categories
- Organized Card Layout

---

## ✨ Core Functionalities

### Budget Management

- Set Monthly Budget
- Monitor Remaining Balance
- Compare Spending Against Budget

### Expense Tracking

- Add Unlimited Expenses
- Categorize Transactions
- Store Expense Notes

### Financial Summary

- Automatic Balance Calculation
- Real-Time Expense Tracking
- Budget Overview

### Offline Support

- Local Data Storage using AsyncStorage
- No Internet Connection Required

---

## 📸 Screenshots

### Login Screen

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/a63398df-54ee-49c6-a238-a43ddcb0f268" />

### Create Account Screen

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/56e88fa0-bf0f-4196-9338-318e508b7b58" />

### Home Dashboard

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/7f7bf899-9c5e-49e9-879c-1a6693213080" />

### Add Expense

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/776ae989-40a3-481b-8326-e038fd91c821" />

### Category Screen

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/7f76a49f-a04c-451c-acbb-e7e92eb88116" />

### Expense History

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/b69c755a-2d9e-4c1c-badb-5e5759bc5111" />

### Add Budget

<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/3eebbe0a-d7d9-4289-941d-77e3ce7bb66e" />


---

## 🛠️ Built With

| Technology | Purpose |
|------------|----------|
| React Native | Mobile App Development |
| React Navigation | Screen Navigation |
| AsyncStorage | Local Data Persistence |
| Moment.js | Date Formatting |
| React Native UUID | Unique Record IDs |
| Firebase Authentication | User Authentication |
| Firebase Firestore | Cloud Database |

---

## 📸 Application Flow

1. Login / Sign Up
2. Set Budget
3. Add Expense
4. Select Category
5. Enter Amount
6. Add Note
7. Save Expense
8. View Expense History
9. Monitor Remaining Balance

---

## 🎨 UI Highlights

### Dashboard

- Financial Summary Section
- Quick Action Cards
- Recent Expenses List
- Clean and Modern Design

### Add Expense Screen

- Large Amount Display
- Custom Numeric Keypad
- Category Selector
- Date Picker
- Smooth User Experience

### Categories Screen

- Color-Coded Categories
- Easy Selection Interface
- Icon-Based Navigation

### Expense History

- Card-Based Layout
- Category Colors
- Clear Transaction Details
- Easy Readability

---

## 📂 Project Structure

```text
Expense_Planner_Repo/
│
├── src/
│   ├── assets/
│   │   ├── plannerLogoNew.png
│   │   ├── plannerTopLogo.png
│   │   ├── plannerTopLogo2.png
│   │   ├── property.png
│   │   ├── property_grey.png
│   │   ├── rupee_indian.png
│   │   ├── spent.png
│   │   ├── sports.png
│   │   └── transport.png
│   │
│   ├── navigation/
│   │
│   └── screens/
│       ├── AddScreen.js
│       ├── BudgetScreen.js
│       ├── CategoriesScreen.js
│       ├── ExpenseHistoryScreen.js
│       ├── HomeScreen.js
│       ├── LoginScreen.js
│       ├── MainScreen.js
│       └── SignUpScreen.js
```

### Screen Responsibilities

| Screen | Description |
|----------|------------|
| HomeScreen | Dashboard displaying balance, budget, expenses, and recent transactions |
| MainScreen | Main navigation container of the application |
| AddScreen | Add a new expense with amount, category, date, and note |
| BudgetScreen | Set and manage monthly budget |
| CategoriesScreen | Select expense category with custom icons and colors |
| ExpenseHistoryScreen | View complete history of recorded expenses |
| LoginScreen | User authentication and login |
| SignUpScreen | New user registration |

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/AyushiSikri/Expense_Planner_Repo.git
```

### Install Dependencies

```bash
npm install
```

### Start Metro Bundler

```bash
npx react-native start
```

### Run Android

```bash
npx react-native run-android
```

---

## 🔮 Future Enhancements

- Dark Mode
- Expense Analytics & Charts
- Monthly Reports
- Search & Filter Expenses
- Firebase Cloud Sync
- Export to PDF
- Export to Excel
- Recurring Expenses
- Multi-Currency Support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## ❤️ About

Expense Planner is a lightweight personal finance application designed to make expense tracking simple, fast, and visually appealing. It helps users stay aware of their spending habits while maintaining control over their budget through an easy-to-use mobile experience.
