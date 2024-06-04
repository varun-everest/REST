import express, { Request, Response } from "express";
import bodyParser from 'body-parser';

const app = express()
const port = 3000;


app.use(express.json());
app.use(bodyParser.json());

let users : any[] = [];

type user = {
    username : string;
    password: string;
    email: string;
    fullname : string;
    id: number;
    providerId ?: number;
    meterId ?: number;
}


app.get('/', (req, res) => {
    res.send("Successfully started server!");
});

// Return all users
app.get('/users', (req, res) => {
    res.send(users);
});

// Create a user with attributes username, password, email and fullname
app.post('/users', (req, res) => {

    console.log(req.body);
    //res.send('hello')
    // use req.body
    const newUser : user = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        fullname: req.body.fullname,
        id : users.length+1,
    }
    users.push(newUser);
    res.send('successfully created user!!');
});

// Return a user with parameter id if not exists return message saying `user not found`
app.get('/users/:id', (req, res) => {
    const findUser = users.find(ele => ele.id === parseInt(req.params.id));
    if(findUser) {
        return res.send(findUser);
    } 
    return res.send("404 error user not found");
});


// update user information for given id 
app.put('/users/:id', (req, res) => {
    // req.params.id
    const findUser = users.find(ele => ele.id === parseInt(req.params.id));
    if(findUser) {
        if(req.body.username !== undefined) {
            findUser.username = req.body.username;
        }
        if(req.body.password !== undefined) {
            findUser.password = req.body.password;
        }
        if(req.body.email !== undefined) {
            findUser.email = req.body.email;
        }
        if(req.body.fullname !== undefined) {
            findUser.fullname = req.body.fullname;
        }
        return res.send(findUser);
    } 
    else {
        return res.send("505 error User not found :((");
    }
});


// delete user for given id
app.delete('/users/:id', (req, res) => {
    // req.params.id
    const deleteUserIndex = users.findIndex(ele => ele.id === parseInt(req.params.id)); 
    if(deleteUserIndex !== -1) {
        const deletedUser = users.splice(deleteUserIndex,1);
        return res.send(`Successfully deleted!! \n${deletedUser}`);
    }
    else{
        return res.send("505 error User not found :(("); 
    }
});

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

app.get('/providers', (req, res) => {
    return res.send(providers);
});

app.post("/providers", (req, res) => {
    const newProvider = {
        id : providers.length+1,
        name : req.body.name,
        charge : 10
    }
    providers.push(newProvider);
    return res.send("Successfully created new provider!");
});

app.get('/providers/:id', (req, res) => {
    const findProvider = providers.find(ele => ele.id === parseInt(req.params.id));
    if(findProvider) {
        return res.send(findProvider);
    } 
    return res.send("404 error provider not found");
});

app.put('/providers/:id', (req, res) => {
    const findProvider = providers.find(ele => ele.id === parseInt(req.params.id));
    if(findProvider !== undefined) {
        if(req.body.name !== undefined) {
            findProvider.name = req.body.name;
        }
        if(req.body.charge !== undefined) {
            findProvider.charge = req.body.charge;
        }
        return res.send("successfully updated details");
    }
    else {
        return  res.send("ERRORR!!! Provider not found!!!");
    }
});

app.delete('providers/:id', (req, res) => {
    const deletProviderIndex = providers.findIndex(ele => ele.id === parseInt(req.params.id)); 
    if(deletProviderIndex !== -1) {
        const deleteProvider = providers.splice(deletProviderIndex,1);
        return res.send(`Successfully deleted!! \n${deleteProvider}`);
    }
    else {
        res.send("BAD INPUT!!! Provider not found")
    }
});


app.get('/users/:userId/subscribe/:providerId', (req, res) => {
    const findUser = users.find(ele => ele.id === parseInt(req.params.userId));
    const findProvider = providers.find(ele => ele.id === parseInt(req.params.providerId));
    if(findUser) {
        if(findProvider) {
            findUser.providerId = findProvider.id;
            return res.send("Successfully subscribed!!!");
        }
        else {
            return res.send("Invalid Provider Id!!!");
        }
    }
    return res.send("Invalid User Id!!!")
});

type reading = {
    units : number;
    time : string;
}
type meter = {
    meterId : number;
    name : string;
    readings  : reading[];
}


const meters : meter[] = []

app.get('/meters', (req,res) => {
    return res.send(meters);
});

app.post('/meters', (req, res) => {
    const newMeter : meter = {
        meterId : meters.length+1,
        name : req.body.name,
        readings : []
    }
    meters.push(newMeter);
    return res.send("Successfully added new meter");
});

app.get('/meters/:id', (req, res) => {
    const meterId = meters.find(met =>  met.meterId === parseInt(req.params.id));
    if(meterId) {
        return res.send(`${meterId}`);
    }
    return res.status(404).send("ERRORR meter not found");
});

app.get('/meters/:id/readings', (req, res) => {
    const findMeter = meters.find(met => met.meterId === parseInt(req.params.id));
    if(findMeter) {
        return res.send(findMeter.readings);
    }
    return res.status(404).send("Error Not found");
})

app.post('/meters/:id/readings', (req, res) => {
    const findMeter = meters.find(met => met.meterId === parseInt(req.params.id));
    if(findMeter) {
        //    curl -X POST -d '{"units": 5, "time":"2024-05-31T10:00:00.000Z"}' 'http://localhost:3000/meters/1/readings'
        let newReading : reading = {
            units  : req.body.units,
            time : req.body.time
        }
        findMeter.readings.push(newReading);
        return res.send("Successfully added readings");
    }
    return res.status(404).send("ERORR Meter not found")
});

app.get('/users/:userId/subscribe/:providerId/:meterId', (req, res) => {
    const findUser = users.find(ele => ele.id === parseInt(req.params.userId));
    const findProvider = providers.find(ele => ele.id === parseInt(req.params.providerId));

    if(findUser && findProvider) {
        const findMeterId = meters.find(met => met.meterId === parseInt(req.params.meterId));
        if(findMeterId) {
            findUser.meterId = findMeterId.meterId;
            return res.send("Successfully associated meter to a user");
        }
        else {
            return res.send("ERROR METER NOT FOUND");
        }
    }
    return res.status(404).send("ERROR NOT FOUND");
});

app.get('/users/:id/readings', (req, res) => {
    const findUser = users.find(ele => ele.id === parseInt(req.params.id));
    if(findUser) {
        if( findUser.meterId !== null) {
            return res.send(findUser.meterId.readings);
        }
        else {
            return res.send("No meter is associated with given user");
        }
    }
    return res.send("ERORR USER NOT FOUND");
});

app.get('/users/:id/bill', (req, res) => {
    let totalBill = 0;
    const findUser = users.find(ele => ele.id === parseInt(req.params.id));
    if(findUser) {
        if(findUser.meterId !== null)  {
            const prov = providers.find(pro => pro.id === findUser.providerId);
            const met = meters.find(e => e.meterId === findUser.meterId);
            let providerCharge = prov?.charge !== undefined ? prov.charge : 0 ;
            let totalUnits = 0;
            if(met?.readings) {
                for(let i in met.readings){
                    totalUnits += met.readings[i].units;
                }
                return res.send(`TOTAL BILL ----->  ${totalUnits * providerCharge}`);
            }
            else {
                return res.send("NO READINGS are there")
            }
        }
        else {
            return res.send("No meter is associated with the user");
        }   
    }
    return res.send("ERROR User not found");
})

app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`)
}) 

// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username":"varun","password":"varun@124","email":"varun@gmail.com","fullname":"varunkumar"}'

// curl -X  POST http://localhost:3000/meters -H "Content-Type: application/json" -d '{"name" : "meter1" }'

// curl -X GET http://localhost:3000/users/1/subscribe/1

// curl -X GET http://localhost:3000/users/1/subscribe/1/1

// curl -X POST -H "Content-Type: application/json" -d '{"units": 4, "time":"2024-05-31T10:00:00.000Z"}' 'http://localhost:3000/meters/1/readings'