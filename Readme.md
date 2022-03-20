Basic CRUD functionality for Products
======================================

The dashboard will be the loading interface for the product
cards displaying for storefront site.
<!-- toc -->
* [Seting Up A Firebase Project For The Web](#Firebase-setup)
* [CRUD pages](#CRUD)
<!-- tocstop -->

# Firebase-setup
Seting Up A Firebase Project For The Web
## Step 1: Initialize Project Root Folder Using NPM
Open the VSCode terminal and on the command line run the following command.
```npm
   npm init
```
To quickly create the package.json file run the command.
```npm
   npm init y
```
 
## 2. Installing Project Dependancies
- to installing firebase SDK run the command ``` npm install firebase ```
- to install parcel bundler run the command ``` npm install parcel ```

<br> 

### Node_Modules Directory Best Practices
- add the node_modules directory to your.gitignore file.
- never upload your node_modules directory to git.
- when sharing a project remove the node_modules directory first.
- to rebuild your node_modules directory from the package.json file run the command ``` npm install ```.


<br> 

## 3. Run Your Project Using Parcel
You must use the parcel bundler to view your project. The browser will not understand come of the code your using. In order to for browser to run your code and the code your using from the node modules directory you need a budler tool like Parcel.  
Parcel will bundle your node_modules code and the src code into JavaScript files to code the browser understands.
- Start the module bundler Parcel run the command.
```bash
    npx parcel src/index.html
```

### Stop The Parcel Dev Server
- when ever you want to stop the server open the VSCode terminal.
- Use the quick key combination ```CTRL+C```
- This command can be used anytime a process is runing and you want to escape back to the terminal prompt.
 
 <br> 



## 4. Using Firebase In A Web Project
- Create a firebaseConfig.js in ```js/libs/firebase/firebaseConfig.js ```. 
- Copy the Firebase configuration from the project settings located in the firebase console.
- Make sure to copy the npm configuration
- Add the ```getDatabase``` method from ```firebase/database``` package.
- Initialize the real time database RTD service.
- export the database connection from the firebaseConfig.js file
 
 

```javascript

// file: src/js/libs/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
  appId: "YOUR-APP-ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize the reat time database
const db = getDatabase(app)
// export the db connection.
export {db}

```
<br> 

## 5. Adding firebaseConfig.js to your .gitignore
- Do not upload the firebase config file.
- The config file is only for development. You will handle the deployment differently.
- File path is: ```js/libs/firebase/firebaseConfig.js ```. 
- Open your .gitignore file and add
```.gitignore
    # firebase config file
    /src/js/libs/firebase/firebaseConfig.js
```

## 6. Commit Your Project To GitHub
<br> 
<br>
<br>
<br> 


# CRUD
## 1. Create (Write)
### Add Content To Storage And RTD


### Add Imports

```javascript

    // write.js
    // import your modules
    import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
    import {ref as databaseRef, push, set, get} from 'firebase/database'
    import { db, storage  } from "./libs/firebase/firebaseConfig";
    
```


### Form Event Listener
```javascript
    
    //write.js

    function onAddProduct(e) {
        e.preventDefault();
        uploadNewProduct();
        document.querySelector('.msg').style.display = "block";
    }
  
```

### Input Element Change Event Listener
```javascript
 
    function onImageSelected(e) {
    let file = e.target.files[0];
    document.querySelector(".display img").src = URL.createObjectURL(file);

    }

    document.querySelector("#rentalImage").addEventListener("change", onImageSelected);

```




### Upload A New Product 
```javascript
async function uploadNewProduct() {

        const title = document.querySelector('#productName').value.trim();
        const price = parseFloat(document.querySelector('#productPrice').value.trim());
        const size = parseFloat(document.querySelector('#productSize').value.trim());
        const file = document.querySelector('#productImage').files[0];
        const imageRef =  storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'products')

        const uploadResult = await uploadBytes(imageRef, file);
        const urlPath =  await getDownloadURL(imageRef) 
        const storagePath = uploadResult.metadata.fullPath;

        const itemRef = await push(dataRef)
        //ref.key
        set(itemRef,{
           key:itemRef.key,
           sku:`orsm${itemRef.key}`,
           urlPath,
           storagePath,
           title,
           price,
           size
        })
    })
    
}
```



## 2. Read
### Importing Data
 
 ```javascript

    import {ref as dataRef, get, set, update} from 'firebase/database';
    import {db} from './libs/firebase/firebaseConfig';

 ```



### Page Init Function
 ```javascript

    async function pageInit(){
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef)
    const data = productSnapShot.val();
   
    const productCards =   Object.values(data).map(product=>{
            const card = productCard(product);

            document.querySelector('.page-content').append(card)
            return card
    })
      
    pageInit()

 ```


### Product Basic Markup
 ```html
     const template = `
  <div class="product-card">

    <div class="card-header">
        <button id="edit" data-key="${key}" >
           EDIT
        </button>
        <button id="delete" data-key="${key}" onclick="confirm('Are you sure you want to delete this product?')">
            DELETE
        </button>
    </div>
    <div class="card-body">
        <img src="${urlPath}" width="160" alt="product card">
        <div class="product-info"> 
            <h2 class="card-title">${title}</h2>
            <div>
                <p class="card-text">Size: ${size}</p>
                <p class="card-text">$${price}</p>
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="button form-control">
            <a class="white-btn" href="#">Add to cart</a>
        </div>

        <div class="button form-control">
            <a class="black-btn" href="#">Buy it now</a>
        </div>
    </div>
  </div>
  `
 ```


## 3. Update
  Update is combination of the read and write pages using update()
  _See code: [src/js/update.js](https://github.com/ypham5/firebase-dashboard/src/js/update.js)_

## 4. Delete

  ```javascript
  async function pageInit(){
    const key = sessionStorage.getItem('key')
    const path = `products/${key}`
    const productRemoveRef = databaseRef(db, path)
    //remove object with the key from RTD
    // ref with the key
    // remove(ref)
    //productRemoveRef.remove()
    //await confirm("Are you sure you want to delete this product?");
    await remove(productRemoveRef)
    await window.location.assign(document.referrer)
}
  
  pageInit()
  ```
  _See code: [src/js/delete.js](https://github.com/ypham5/firebase-dashboard/src/js/delete.js)_
