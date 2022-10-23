
# Librarian Backend

## Endpoints

### `POST /auth/signup`  
  
User sign up  
*Params: `signUpCredentials: SignUpCredsDto`*  
*Returns: Authentication token as [string]*
*SignUpCredsDTO {username, email, password}*

### `POST /auth/signin`

User sign in  
*Params: `signInCredentials: SignInCredsDto`*  
*Returns: Authentication token as [string]*
*SignInCredsDTO {method, email, password}*

### `GET /signout`

User sign out  
*Params: `userId: int`*  
*Returns: n/a*

### `GET /books`

Get all books in the user's library that match chosen filter (and sort?) settings  
*Params: `searchTerm: string, {optional filterParams: FilterParamsDto}`*  
*Returns: `bookIds: int[]`*
*FilterParamsDTO {faves, unread, wishlist}?*

### `POST /books`

Add a book to the user's library  
*Params: `newBook: Book`*  
*Returns: `createdBookId: int`*

### `PATCH /books/:bookId`

Update details of specified book  
*Params: `bookId: int, newDetails: Book`*  
*Returns: n/a*

### `DELETE /books/:bookId`

Delete a book from the user's library  
*Params: `bookId: int`*  
*Returns: `deletedBook: Book`*

### `POST /lists`

Create a new list in the user's library  
*Params: `newListDetails: NewListDto`*  
*Returns: `listId: int`*

### `GET /lists/:listid`

Get books from a specified list that match chosen filter (and sort?) settings  
*Params: `listId: int, searchTerm: string, filterParams: FilterParamsDto`*  
*Returns: `bookIds: int[]`*

### `DELETE /lists/:listId`

Delete a list from the user's library  
*(does not delete books from library)*  
*Params: `listId: int`*  
*Returns: n/a*

### `POST /lists/:listId/:bookId`

Add a book to the specified list  
*Params: `listId:int, bookId: int`*  
*Returns: `booksInList: int[]`*

### `DELETE /lists/:listId/:bookId`

Remove a book from the specified list  
*Params: `listId:int, bookId: int`*  
*Returns: `booksInList: int[]`*

___
