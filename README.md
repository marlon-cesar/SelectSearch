# SelectSearch 🔍

This project is a reusable **searchable select component** built with **Angular**. As the user types in the search field, the component makes a request to an external API and dynamically updates the list of selectable options based on the response.

It integrates **Angular Material** and the **ngx-mat-select-search** library for a smooth and customizable user experience.

## 🛠️ Technologies

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [ngx-mat-select-search](https://www.npmjs.com/package/ngx-mat-select-search)

## 📦 Setup

1. Clone the repository:
   ``` bash
   git clone https://github.com/marlon-cesar/SelectSearch.git
   ```
   ``` bash
   cd SelectSearch
   ``` 

3. Install dependencies:  
   ``` bash
   npm install
   ``` 
4. Install required libraries if not already installed:
   ``` bash
   npm add @angular/material
   ```
   ``` bash
   npm install ngx-mat-select-search
   ```

## ⚙️ Features
- 🔎 Real-time search within a <mat-select> dropdown
- 🔄 Automatic API requests as the user types
- 📥 Dynamically populated options from API response
- 🎨 Integrated with Angular Material design system

## ▶️ Running the Project

To run the development server:

   ``` bash
    ng serve -o
   ```
