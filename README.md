
# Librarian Backend

## Required Functionality

### User functionality

- Users can sign up with email/Google/Apple
- User can only see the books from their library
- User can sign out

### Library functionality

- User can add books to library via barcode, search, or manual entry (single/multiple)
- User can delete books from library (single/multiple)
- User can sort books by various fields, ie - author, title, publishYear
- User can update book details
- User can mark book as favorite (single/multiple)
- User can mark book as read (single/multiple)
- User can upload photo of custom book cover  
- User can filter books by various criteria, ie - unread, faves, et al

### List functionality

- User library will have pre-built "lists", ie - Favorites, Shopping List, Wish List
- User can create/delete custom lists
- User can add/remove books to lists (single/multiple)
- User can print lists? ie - shopping list, all books  *<-- Front-end feature?*

# Local Development

## Setting up Node

This project was built with and supports Node version 16.17.1

### **Installing Node version manager (Mac/Linux)**

Use nvm to easily install and switch different node versions.  Go to [https://github.com/nvm-sh/nvm#install--update-script](https://github.com/nvm-sh/nvm#install--update-script) to get the latest install script.

The install command for the current release as of writing this document is:  
> `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

### **Installing Node version manager (Windows)**

Head to [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) to download and install the latest release.

### **Common nvm commands**

- Install node version: `nvm install 16.17.1`
- Switch node version: `nvm use 16.17.1`
- Switch to default version: `nvm use node`

## Postman Configuration
Postman is the easiest way to test the API during development.  Download from [https://www.postman.com/](https://www.postman.com/)