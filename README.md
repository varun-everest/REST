## Electricity App

### Problem statement:
There is village with two electricity providers( Electro, Magneto).
Each user will have meter setup at home and user be will be subscribed to a provider for electricity supply.
Each day meters store number of units consumed in a day by hourly basis.
Now your task is to complete tasks defined below in Task # section



### Setup
1. Install dependencies
    ```bash
    npm install
    ```
2. Run app in dev mode
    ```bash
    npm run dev
    ``` 


## Example Usage

Server will running on `http://localhost:3000`

Users

1. get all users
```bash
    curl -X GET 'http://localhost:3000/users'
```

2. get user by id
```bash
    curl -X GET 'http://localhost:3000/users/1'
```
3. create user
```bash
    curl -X POST -d '{"username": "vinay"}' -H 'Content-type: application/json ' 'http://localhost:3000/users'
```



## Task 1:

1. Fill in the functionality for users APIs defined `src/app.ts`



## Task 2:

```js
const providers = [
    {
        id: 1,
        name: "Electro",
        charge: 5
    },
    {
        id: 2,
        name: "Magneto",
        charge: 10
    },
]
```
1. Create APIs for Providers create, get all, update and delete
provider will
```js
    const provider = { "id" : "provider-name", "charge": 10}
```


## Task 3:

1. Create APIs for user subscribing to providers
`user can choose any one provider`
